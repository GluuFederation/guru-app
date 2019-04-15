set -e

if [ $# -ne 2 ]; then
  echo "Usage: $0 VERSION ENVIRONMENT"
  exit 1
fi

VERSION=$1
ENVIRONMENT=$2
SCRIPTDIR="$( cd "$(dirname "$0")" ; pwd -P )"
BASEDIR=$(dirname "$SCRIPTDIR")
IMAGE_NAME=gluru-nginx-$ENVIRONMENT

printf "$VERSION" > $SCRIPTDIR/VERSION

docker build -t $IMAGE_NAME -t $IMAGE_NAME:$VERSION --build-arg ENVIRON=$ENVIRONMENT $SCRIPTDIR
