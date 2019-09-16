# Guru App

Gluu Support app

## Prequisites

- Docker
- Docker Compose
- Python3.7
- Pipenv

## Running locally

- This app assumes the installation of `pipenv` and `npm`.
- Create a `./secrets/` folder with four files: `./secrets/api.env`, `./secrets/postgres-user.env`, `./secrets/postgres-password.env` and `./secrets/api-test.env`.
- Enter a complex password into `./secrets/postgres-password.env` and a postgres user into `./secrets/postgres-user.env`.
- Copy the api environment variables from `./api/guru/.env.example` in `./secrets/api.env` and the api test environment variables into `./secrets/api-test.env` making sure the postgres user, db name and password natch the ones in the files from the previous step and all example variables have been properly set
- Initialize the enironments for your code editor:

```s
$ cd [base directory]/api
$ pipenv install
$ cd [base directory]/guru-react
$ npm install
$ cd [base directory]/users-vue
$ npm install
```

- Build the needed docker images locally:

```s
$ ./devops/local-build.sh
```

- Start the local environment servers:

```s
$ docker-compose up
```

- Other special commands can be found in the app folders.
