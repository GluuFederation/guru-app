set -e

VERSION=$1
SCRIPTDIR="$( cd "$(dirname "$0")" ; pwd -P )"
BASEDIR=$(dirname "$SCRIPTDIR")
IMAGE_NAME=guru-api

if [ -z $VERSION ]; then
  echo "Not versioning"
else
  printf "$VERSION" > $SCRIPTDIR/VERSION
fi

docker build -t $IMAGE_NAME $SCRIPTDIR
if [ -z $VERSION ]; then
  echo "Unversioned build"
else
  docker tag $IMAGE_NAME $IMAGE_NAME:$VERSION
fi
# docker run -ti --env-file $BASEDIR/secrets/api-test.env $IMAGE_NAME:$VERSION python manage.py test
