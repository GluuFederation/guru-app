set -e

BASEDIR="$( cd "$(dirname "$0")" ; pwd -P )"
API_IMAGE=guru-api
GURU_VUE_IMAGE=guru-vue
USERS_VUE_IMAGE=users-vue

# Build images
$BASEDIR/api/build.sh
$BASEDIR/guru-vue/build.sh
$BASEDIR/users-vue/build.sh

# Copy python environment
docker create --name api $API_IMAGE
docker cp api:/usr/local/ $BASEDIR/api/env/
docker rm api

# Copy node modules
docker create --name guru-vue $GURU_VUE_IMAGE
docker create --name users-vue $USERS_VUE_IMAGE
docker cp guru-vue:/app/node_modules $BASEDIR/guru-vue/node_modules
docker cp users-vue:/app/node_modules $BASEDIR/users-vue/node_modules
docker rm guru-vue users-vue
