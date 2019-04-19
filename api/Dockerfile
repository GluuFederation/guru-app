FROM python:alpine3.7 as static-stage
RUN mkdir /app

# Install psycopg dependencies
RUN apk --update --upgrade add gcc musl-dev jpeg-dev zlib-dev libffi-dev postgresql-dev python3-dev

WORKDIR /app
COPY ./pipenv_to_req.py ./Pipfile.lock /app/
RUN python pipenv_to_req.py
RUN pip install -r requirements.txt
COPY . /app/
