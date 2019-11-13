#!/usr/bin/env python3
"""
Docker build module
"""

import argparse
import subprocess
import os
import logging
import json
import yaml  # pylint: disable=import-error

from bump import bump


BASE_DIR = os.path.dirname(
    os.path.dirname(os.path.realpath(__file__))
)
USERNAME = 'gluufederation'


def validate_image(image):
    """
    Validate image names

    :param image: Image name
    """
    if image not in ['guru-api', 'guru-nginx', 'guru-react', 'users-vue']:
        raise Exception(
            (
                "{} is an invalid image. Only 'guru-api', 'guru-react', "
                "'users-vue' and 'guru-nginx' are valid images"
            ).format(image)
        )


def validate_environment(environment):
    """
    Validate environment

    :param environment: Environment
    """
    if environment not in ['dev', 'stage', 'prod']:
        raise Exception(
            (
                "{} is an invalid environment. Only 'dev', 'stage' and 'prod'"
                "are valid environments"
            ).format(environment)
        )


def get_version(image):
    """
    Get docker image version

    :param image: Image to build. One of 'guru-api', 'guru-react',
    'users-vue' and 'guru-nginx'
    """
    validate_image(image)
    image_dir_map = {
        'guru-api': os.path.join(BASE_DIR, 'api', 'VERSION'),
        'guru-nginx': os.path.join(BASE_DIR, 'nginx', 'VERSION'),
        'guru-react': os.path.join(BASE_DIR, 'guru-react', 'package.json'),
        'users-vue': os.path.join(BASE_DIR, 'users-vue', 'package.json')
    }

    with open(image_dir_map[image]) as read_file:
        contents = read_file.read()

    if image in ['guru-api', 'guru-nginx']:
        return contents.split('\n')[0]

    if image in ['guru-react', 'users-vue']:
        content_json = json.loads(contents)
        return content_json['version']

    raise ValueError('Error getting image version')


def has_image_changed(image, build_args, environment=None):
    """
    Check if an image has changed.

    :param image: Image to check. One of 'guru-api', 'guru-react',
    'users-vue' and 'guru-nginx'
    :param environment: Build environment for Nginx. One of 'dev',
    'stage' and 'prod'
    :param build_args: Arguments to build image
    """
    validate_image(image)
    if environment:
        validate_environment(environment)

    image_name = image
    if image == 'guru-nginx':
        image_name = '{}-{}'.format(image, environment)

    try:
        process = run_command([
            'docker', 'inspect', '--format', '{{.Id}}', image_name
        ])
        first_id = process.stdout
        process = run_command(build_args)
        second_id = process.stdout

        if first_id == second_id:
            return False

        return True
    except subprocess.CalledProcessError:
        return False


def run_command(command_args):
    """
    Run a shell command throwing errors where needed

    :param args: A list of the args to pass to the shell command
    """
    process = subprocess.run(
        command_args,
        encoding='utf8',
        check=True
    )
    logging.info(process.stdout)
    if process.returncode != 0:
        raise Exception(process.stderr)

    return process


def test_image(image, version=None):
    """
    Test a docker image

    :param image: Image to build. One of 'guru-api', 'guru-react',
    'users-vue' and 'guru-nginx'
    :param version: A specified version of the image to test
    """
    validate_image(image)
    image_tag = image
    if version:
        image_tag = '{}:{}'.format(image, version)

    if image == 'guru-api':
        command_args = [
            'docker', 'run', image_tag, 'python', 'manage.py', 'test'
        ]
    elif image in ['guru-react', 'users-vue']:
        command_args = [
            'docker', 'run', '-e', 'CI=true', image_tag, 'npm',
            'test', '--no-watch'
        ]
    else:
        logging.warning('Can only test guru-api guru-react and users-vue')
        return

    run_command(command_args)


def push_image(image, version=None, environment=None):
    """
    Push a docker image to a container repository

    :param image: Image to build. One of 'guru-api', 'guru-react',
    'users-vue' and 'guru-nginx'
    :param version: A specified version of the image to test
    :param environment: Build environment for Nginx. One of 'dev',
    'stage' and 'prod'
    """
    validate_image(image)
    if environment:
        validate_environment(environment)

    image_name = image
    if image == 'guru-nginx':
        image_name = '{}-{}'.format(image, environment)

    image_tag = image_name
    if version:
        image_tag = '{}:{}'.format(image_name, version)

    username_tag = '{}/{}'.format(USERNAME, image_tag)
    run_command(['docker', 'tag', image_tag, username_tag])
    run_command(['docker', 'push', username_tag])


def deploy_containers(image, environment, version=None):
    """
    Deploy a docker image to a remote server

    :param image: Image to build. One of 'guru-api' and 'guru-nginx'
    :param version: A specified version of the image to deploy
    :param environment: Deploy environment. One of 'dev',
    'stage' and 'prod'
    """
    if image not in ['guru-api', 'guru-nginx']:
        raise Exception('Only guru-api and guru-nginx can be deployed')
    validate_environment(environment)

    env_url_map = {
        'dev': 'guru-dev.gluu.org',
        'stage': 'guru-stage.gluu.org',
        'prod': 'guru.gluu.org'
    }
    service = image.split('-')[1]
    os.chdir(os.path.join(BASE_DIR, 'devops'))

    api_image = '{}/guru-api'.format(USERNAME)
    nginx_image = '{}/guru-nginx-{}'.format(
        USERNAME, environment
    )
    nginx_version = get_version('guru-nginx')
    api_version = get_version('guru-api')

    if version is not None:
        compose_file = ''
        compose_file_dir = os.path.join(
            BASE_DIR, 'devops', 'docker-compose.yml'
        )
        with open(compose_file_dir) as file:
            compose_file = file.read()

        compose_yml = yaml.safe_load(compose_file)
        if service == 'api':
            api_image += ':' + version
            nginx_image += ':' + nginx_version
        else:
            api_image += ':' + api_version
            nginx_image += ':' + version

        compose_yml['services']['qcluster']['image'] = api_image
        compose_yml['services']['api']['image'] = api_image
        compose_yml['services']['nginx']['image'] = nginx_image
        compose_file = yaml.safe_dump(compose_yml)

        compose_file_write_dir = os.path.join(
            BASE_DIR, 'devops', 'docker-compose.yml.deploy'
        )
        with open(compose_file_write_dir, 'w+') as write_file:
            write_file.write(compose_file)
    else:
        run_command(['cp', 'docker-compose.yml', 'docker-compose.yml.deploy'])

    run_command([
        'scp', '-P', '22222', '-i', os.environ.get('GURU_ENV'),
        '-oStrictHostKeyChecking=no', 'docker-compose.yml.deploy',
        'gluu@{}:/home/gluu/app/docker-compose.yml'.format(
            env_url_map[environment]
        )
    ])
    run_command([
        'ssh', '-p', '22222', '-oStrictHostKeyChecking=no',
        '-i', os.environ.get('GURU_ENV'),
        'gluu@{}'.format(
            env_url_map[environment]
        ),
        '/home/gluu/app/deploy.sh'
    ])
    run_command(['rm', 'docker-compose.yml.deploy'])


def build_image(
        image, environment='dev', run_tests=False, push=False, deploy=False):
    """
    Build docker image

    :param image: Image to build. One of 'guru-api', 'guru-react',
    'users-vue' and 'guru-nginx'
    :param environment: Build environment for Nginx. One of 'dev',
    'stage' and 'prod'
    """
    validate_image(image)
    validate_environment(environment)
    image_dir_map = {
        'guru-api': os.path.join(BASE_DIR, 'api'),
        'guru-nginx': os.path.join(BASE_DIR, 'nginx'),
        'guru-react': os.path.join(BASE_DIR, 'guru-react'),
        'users-vue': os.path.join(BASE_DIR, 'users-vue')
    }
    os.chdir(image_dir_map[image])
    version = get_version(image)

    if image in ['guru-api', 'guru-react', 'users-vue']:
        version_tag = '{}:{}'.format(image, version)
        command_args = [
            'docker', 'build', '-t', image, '-t', version_tag, '.'
        ]
    elif image == 'guru-nginx':
        has_changed = has_image_changed(
            image,
            [
                'docker', 'build', '-t', image, '--build-arg',
                'ENVIRON={}'.format(environment), '.'
            ],
            environment
        )
        if has_changed:
            bump('guru-nginx', 'minor')
            version = get_version(image)

        version_tag = '{}-{}:{}'.format(
            image, environment, version
        )
        command_args = [
            'docker', 'build', '-t', image, '-t', version_tag, '--build-arg',
            'ENVIRON={}'.format(environment), '.'
        ]

    run_command(command_args)

    if run_tests:
        test_image(image, version)

    if push:
        push_image(image, version, environment)

    if deploy:
        deploy_containers(image, environment, version)


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('image', help='Name of image to build')
    parser.add_argument(
        '--env',
        help="Nginx environment to be built",
        default='dev'
    )
    parser.add_argument(
        '--test',
        help="Run tests after build",
        default='false'
    )
    parser.add_argument(
        '--push',
        help="Push image to repository after build",
        default='false'
    )
    parser.add_argument(
        '--deploy',
        help="Deploy image container after push",
        default='false'
    )
    args = parser.parse_args()
    build_image(
        args.image,
        args.env,
        args.test == 'true',
        args.push == 'true',
        args.deploy == 'true'
    )
