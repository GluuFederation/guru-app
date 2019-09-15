#!/usr/bin/env python3
"""
Version bump module
"""

import argparse
import json


def bump_version(version, bump_type):
    """
    Bump file version based on bump type

    :param version: string containing version number
    :param bump_type: one of 'patch', 'minor' and 'major'
    """
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
                str(version_parts[2]),
            ]
        )

    return '.'.join(
        [
            str(version_parts[0] + 1),
            str(version_parts[1]),
            str(version_parts[2]),
        ]
    )


def bump(filename, bump_type='patch', file_type='v'):
    """
    Read file contents for bumping

    :params filename: Name of file
    :params bump_type: one of 'patch', 'minor' and 'major'
    :params file_type: one of 'v' and 'js'
    """
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
        contents = json.dumps(content_json)

    with open(filename, 'w+') as write_file:
        write_file.write(contents)


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('filename', help='File name to bump')
    parser.add_argument(
        '--bumper',
        help="Bump type. One of 'patch', 'minor' and 'major'",
        default='patch'
    )
    parser.add_argument(
        '--type',
        help="File type. One of 'v', and 'js'",
        default='v'
    )
    args = parser.parse_args()
    bump(args.filename, args.bumper, args.type)
