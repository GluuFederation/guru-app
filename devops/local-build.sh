#!/usr/bin/env bash

set -e

SCRIPTDIR="$( cd "$(dirname "$0")" ; pwd -P )"

$SCRIPTDIR/build.py guru-api --test true
$SCRIPTDIR/build.py guru-react --test true
$SCRIPTDIR/build.py users-vue --test true
