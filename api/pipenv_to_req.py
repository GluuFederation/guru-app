"""
pipenv_to_req.py
by Gerald Pharin
Convert Pipfile.lock to requirements.txt
"""
import json


def convert_to_requirements():
    """
    Convert Pipfile.lock to requirements.txt
    """
    requirements = ''

    print('Reading Pipfile')
    with open('Pipfile.lock') as lock_file:
        lock = json.load(lock_file)

        print('Converting default packages')
        default = lock['default']
        for package, value in default.items():
            requirements += '{0}{1}\n'.format(package, value['version'])

        print('Converting development packages')
        develop = lock['develop']
        for package, value in develop.items():
            requirements += '{0}{1}\n'.format(package, value['version'])

    print('Writing to requirements.txt')
    if requirements:
        with open('requirements.txt', 'w+') as req_file:
            req_file.write(requirements)


convert_to_requirements()
