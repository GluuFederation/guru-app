set -e

if [ $# -lt 1 ]; then
  echo "Usage: $0 VERSION [older]"
  exit 1
fi

VERSION=$1
OLDER=$2
SCRIPTDIR="$( cd "$(dirname "$0")" ; pwd -P )"
BASEDIR=$(dirname "$SCRIPTDIR")
IMAGE_NAME=guru-vue
USERNAME=gluufederation

echo "Tagging $IMAGE_NAME/$VERSION...."
if [ -z $OLDER ]; then
  docker tag $IMAGE_NAME:$VERSION $USERNAME/$IMAGE_NAME:latest
fi
docker tag $IMAGE_NAME:$VERSION $USERNAME/$IMAGE_NAME:$VERSION

echo "Pushing $IMAGE_NAME/$VERSION"
if [ -z $OLDER ]; then
  docker push $USERNAME/$IMAGE_NAME:latest
fi
docker push $USERNAME/$IMAGE_NAME:$VERSION

echo "Pushed to Docker Hub"
