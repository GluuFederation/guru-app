FROM guru-vue as guru-stage
ARG ENVIRON
COPY .env.${ENVIRON} /app/.env
RUN npm run build

FROM users-vue as users-stage
ARG ENVIRON
COPY .env.${ENVIRON} /app/.env
RUN npm run build

FROM guru-api as backend-stage
RUN python manage.py collectstatic --no-input

FROM nginx:stable-alpine
ARG ENVIRON
RUN mkdir /app /app/guru /app/users /app/api-static /nginx-conf
RUN ln -sf /dev/stdout /var/log/nginx/access.log && ln -sf /dev/stderr /var/log/nginx/error.log

COPY --from=guru-stage /app/dist/ /app/guru
COPY --from=users-stage /app/dist/ /app/users
COPY --from=backend-stage /app/staticfiles/ /app/api-static
COPY ./ /nginx-conf

RUN chmod u+x /nginx-conf/set-env.sh && /bin/sh /nginx-conf/set-env.sh
