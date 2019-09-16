# Guru App

Gluu Support app

## Prequisites

- Docker
- Docker Compose
- Python3.7
- Pipenv

## Hosting on Digital Ocean

- Create a Digital Ocean CentOS 7 instance.
- ssh into instance and switch to root user.

```s
$ sudo su -
```

- Create `pre-install.sh` file and copy and paste contents of `devops/pre-install.sh` from this repository into the created file.

```s
$ vi pre-install.sh
```

- Make `pre-install.sh` executable and run it.

```s
$ chmod a+x pre-install.sh
$ ./pre-install.sh
```

- Run `visudo` still as root and uncomment the line that says `# %wheel ALL=(ALL) ALL`.

```s
$ visudo
```

- Switch to `gluu` user and create `install.sh` file, pasting into it the contents of `devops/install.sh` from this repository.

```s
$ su - rbht
$ nano install.sh
```

- Make `install.sh` executable and run it.

```s
$ chmod a+x install.sh
$ ./install.sh
```

- Add your public key to `~/.ssh/authorized_keys`.

```s
$ nano ~/.ssh/authorized_keys
```

- Create `deploy.sh` file, pasting into it the contents of `devops/deploy.sh` from this repository.

```s
$ nano ~/deploy.sh
```

- Create `init-letsencrypt.sh` file, pasting into it the contents of `devops/init-letsencrypt.sh` from this repository. Updating the file with the proper domain and email.

```s
$ nano ~/init-letsencrypt.sh
```

- Create `docker-compose.yml` file, pasting into it the contents of `devops/docker-compose.yml` from this repository. Updating the file with the right service version numbers.

```s
$ nano ~/init-letsencrypt.sh
```

- Paste into `~/app/secrets/postgres-password.env` a complex password.

```s
$ nano ~/app/secrets/postgres-password.env
```

- Paste into `~/app/secrets/postgres-user.env` a postgres username.

```s
$ nano ~/app/secrets/postgres-user.env
```

- Paste into `~/app/secrets/api.env` the contents of your `./secrets/api.env` file from this repository. Updating the file with the proper environment variables and postgres credentials.

```s
$ nano ~/app/secrets/api.env
```

- Start the docker service.

```s
$ sudo service docker start
```

- Make `~/app/init-letsencrypt.sh` executable and run it. Run it multiple times for each domain you want the server pointed to changing the domain before each run.

```s
$ chmod a+x ~/app/init-letsencrypt.sh
$ cd ~/app
$ ./init-letsencrypt.sh
```

- Change directory to `~/app` and deploy the application.

```s
$ cd ~/app
$ docker-compose up
```

- Create Citext extension

```s
$ cd ~/app
$ docker-compose exec db psql -U [db_user] [db_name]
> CREATE EXTENSION citext;
> \q
```

- Connect your browser to the url and enjoy!
