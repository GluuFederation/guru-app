set -e

VERSION=$1
SCRIPTDIR="$( cd "$(dirname "$0")" ; pwd -P )"
BASEDIR=$(dirname "$SCRIPTDIR")
IMAGE_NAME=users-vue

if [ -z $VERSION ]; then
  echo "Not versioning"
else
  printf "{\n  \"version\": \"$VERSION\"\n}" > $SCRIPTDIR/src/VERSION.json
fi

docker build -t $IMAGE_NAME $SCRIPTDIR
if [ -z $VERSION ]; then
  echo "Unversioned build"
else
  docker tag $IMAGE_NAME $IMAGE_NAME:$VERSION
fi
# docker run -ti -e CI=true $IMAGE_NAME npm run test --no-watch
