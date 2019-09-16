# Contributing

We are open to suggestions on how to improve the code base. To make your suggestions, be sure to follow the rules we set below.

## Setting up

Check the `Running locally` section of [README.md](./README.md)

## Opening a Pull Request

- Make sure your app runs successfully and passes all tests.

```sh
$ ./devops/local-build.sh
$ docker-compose down && docker-compose up
```

- Push your branch and open a PR.
- Request for a code review.
- We require your branch to be up to date with the master branch so if it has been a while since you made changes, merge the latest `master` branch into your branch and push.
- If your changes are approved, your branch will be merged into master. You can pull the master branch and see your changes in action
