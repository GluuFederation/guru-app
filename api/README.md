# gluru-backend
Support portal backend

## Prequisites
 - Postgresql
 - Python3.6
 - Pipenv
 - RabbitMQ

### Install & Configure Postgresql
Please refer to this [link](https://www.postgresql.org/download/) to install Postgresql

Configure postgresql:
```
sudo su postgres
psql
CREATE DATABASE database_name;
CREATE USER my_username WITH PASSWORD 'my_password';
GRANT ALL PRIVILEGES ON DATABASE "database_name" to my_username;
```
Create `citext` extension
```
sudo -u postgres psql
\c database_name
CREATE EXTENSION citext;
\dx
```

### Installing Python3.6 and Pipenv
Please refer to this [link](https://docs.pipenv.org/) for more details about pipenv

Installing Python3.6 and pipenv
```
sudo yum install -y python36u python36u-libs python36u-devel python36u-pip
pip3.6 install pipenv
```

### Install RabbitMQ
Pleare refer to this [link](http://www.rabbitmq.com/download.html) for quick overview of RabbitMQ
I used Redis as a broker first, but replace it by RabbitMQ.
Redis was created with a different intentions and not for being a message broker.

Installing Erlang:
```
```

Install RabbitMQ Server:
```
```

Run RabbitMQ Server:
```
```
 > `Important!` In order for this project to work properly, you need to start rabbitmq server first. For sms and email notification, signal is used to send messages to task queue. This means that the request context involve sending messages to task queue. If rabbitmq server not running at that time, it might lead to time out error.

## Clone and installing project
```
git clone git@github.com:GluuFederation/gluru-backend.git
cd gluru-backend
pipenv install
```

Start celery worker and schedule:
```
celery worker -A gluru_backend -n worker.high -Q high -l DEBUG
celery worker -A gluru_backend -n worker.normal -Q normal -l DEBUG
celery worker -A gluru_backend -n worker.low -Q low -l DEBUG
celery -A gluru_backend beat -l INFO
```

 > `Important!` Beat does not execute tasks, it just sends the messages.
 > You need both a beat instance and a worker instance!

Management Commands related to haystack:
```
python manage.py rebuild_index
python manage.py update_index
python manage.py clear_index
```
 > `Note!` We use [drf-haystack](https://drf-haystack.readthedocs.io/en/latest/index.html) and `whoosh` as a search engine

Configure Environment Variables
```
cd gluru_backend
cp .env.example .env
```
 > `Note!` HEX_KEY is used for generating hash and this should be the same with account management app.

Loading Initial Data
```
python manage.py loaddata category
python manage.py loaddata issuetype
python manage.py loaddata gluuproduct
or python manage.py loaddata data // run this command for loading all inital data
```
 > `Note!` We make our model more configurable, and initial data can be loaded using above command

Running Locally
```
pipenv shell
python manage.py migrate
python manage.py runserver
```
> `Important!` You need to create citext extension to migrate successfully.

We follow Test-Driven Development(TDD)
```
python manage.py test tickets.tests --keepdb
python manage.py test info.tests --keepdb
python manage.py test profiles.tests --keepdb
python manage.py test notification.tests --keepdb
```
> `Note!` `--keepdb` option is used for preventing the test databases from being destroyed

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
