#!/usr/bin/env python3
"""
Version bump module
"""

import argparse
import json
import os


BASE_DIR = os.path.dirname(
    os.path.dirname(os.path.realpath(__file__))
)


def validate_bump_type(bump_type):
    """
    Validate bump type

    :param bump_type: Bump type
    """
    if bump_type not in ['patch', 'minor', 'major']:
        raise Exception(
            (
                "{} is an invalid bump type. Only 'patch', 'minor', 'major'"
                " are valid bump types"
            ).format(bump_type)
        )


def validate_app(app):
    """
    Validate app names

    :param app: App name
    """
    if app not in ['guru-api', 'guru-nginx', 'guru-react', 'users-vue']:
        raise Exception(
            (
                "{} is an invalid app name. Only 'guru-api', 'guru-react', "
                "'users-vue' and 'guru-nginx' are valid app names"
            ).format(app)
        )


def bump_version(version, bump_type):
    """
    Bump file version based on bump type

    :param version: string containing version number
    :param bump_type: one of 'patch', 'minor' and 'major'
    """
    validate_bump_type(bump_type)
    version_parts = [int(x) for x in version.split('.')]
    if len(version_parts) is not 3:
        raise ValueError(
            (
                'Invalid version string. Version string must contain '
                '3 parts joined with a "."'
            )
        )

    if bump_type == 'patch':
        return '.'.join(
            [
                str(version_parts[0]),
                str(version_parts[1]),
                str(version_parts[2] + 1),
            ]
        )

    if bump_type == 'minor':
        return '.'.join(
            [
                str(version_parts[0]),
                str(version_parts[1] + 1),
                '0',
            ]
        )

    return '.'.join(
        [
            str(version_parts[0] + 1),
            '0',
            '0',
        ]
    )


def bump(app, bump_type='patch'):
    """
    Read file contents for bumping

    :param app: Name of app
    :param bump_type: one of 'patch', 'minor' and 'major'
    :param file_type: one of 'v' and 'js'
    """
    validate_bump_type(bump_type)
    validate_app(app)
    app_file_map = {
        'guru-api': os.path.join(BASE_DIR, 'api', 'VERSION'),
        'guru-nginx': os.path.join(BASE_DIR, 'nginx', 'VERSION'),
        'guru-react': os.path.join(BASE_DIR, 'guru-react', 'package.json'),
        'users-vue': os.path.join(BASE_DIR, 'users-vue', 'package.json'),
    }
    app_type_map = {
        'guru-api': 'v',
        'guru-nginx': 'v',
        'guru-react': 'js',
        'users-vue': 'js',
    }
    file_type = app_type_map[app]
    filename = app_file_map[app]
    contents = ''
    with open(filename, 'r') as read_file:
        contents = read_file.read()

    if file_type == 'v':
        version = contents.split('\n')[0]
        contents = bump_version(version, bump_type)
    elif file_type == 'js':
        content_json = json.loads(contents)
        version = content_json['version']
        bumped_version = bump_version(version, bump_type)
        content_json['version'] = bumped_version
        contents = json.dumps(content_json, indent=2)

    with open(filename, 'w+') as write_file:
        write_file.write(contents)


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('app', help='App name to bump')
    parser.add_argument(
        '--bumper',
        help="Bump type. One of 'patch', 'minor' and 'major'",
        default='patch'
    )
    args = parser.parse_args()
    bump(args.app, args.bumper)
