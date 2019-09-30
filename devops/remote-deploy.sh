#!/usr/bin/env bash

set -e

ENVIRONMENT=$1
SCRIPTDIR="$( cd "$(dirname "$0")" ; pwd -P )"

if [ -z $ENVIRONMENT ]; then
  ENVIRONMENT=dev
fi

$SCRIPTDIR/build.py guru-api --test true --push true --deploy true
$SCRIPTDIR/build.py guru-react --test true --push true
$SCRIPTDIR/build.py users-vue --test true --push true
$SCRIPTDIR/build.py guru-nginx --test true --push true --deploy true --env $ENVIRONMENT
