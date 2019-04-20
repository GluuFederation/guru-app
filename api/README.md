# guru-backend
Support portal backend

Initial instructions in root README.md.

### Configure Postgresql
Configure postgresql by logging in to postgres using the db user and db name, and installing citext on the db:
```s
$ docker-compose exec db psql -U [db_user] [db_name]
> CREATE EXTENSION citext;
> \q
```

## Running commands
App is run locally using docker-compose so commands are prefixed by `docker-compose exec api`

Management Commands related to haystack:
```s
$ docker-compose exec api python manage.py rebuild_index
$ docker-compose exec api python manage.py update_index
$ docker-compose exec api python manage.py clear_index
```
 > `Note!` We use [drf-haystack](https://drf-haystack.readthedocs.io/en/latest/index.html) and `whoosh` as a search engine

Configure Environment Variables
```s
$ cp ./guru/.env.example ../secrets/api.env
```

Loading Initial Data
```s
$ docker-compose exec api python manage.py loaddata category
$ docker-compose exec api python manage.py loaddata issuetype
$ docker-compose exec api python manage.py loaddata gluuproduct
```
or
```s
$ docker-compose exec api python manage.py loaddata data # run this command for loading all inital data
```
 > `Note!` We make our model more configurable, and initial data can be loaded using above command

We follow Test-Driven Development(TDD)
```s
$ docker run -ti --env-file ../secrets/api-test.env guru-api python manage.py test
```

## Apps and Description
 - [Info](#info)
 - [Notificaton](#notification)
 - [Profile](#profile)
 - [Ticket](#ticket)

### Info
This app is created for making our app more configurable.
### Notification
This app is created for managing all kind of notifications and emailing. By using Celery + RabbitMQ, we can prioritize as well.
### Profile
This app is created for manaing the profiles.
### Ticket
This app is used for managing ticket operations.

## Contribution
 - Create a new branch
 - Commit your changes and make a PR to master
 > `Important!` Before commit your changes, you need to run flake8 for code styling
