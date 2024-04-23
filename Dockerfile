FROM node:lts

WORKDIR /app

COPY . /app/

RUN npm install \
    && npm run build \
    && addgroup --gid 1001 app \
    && adduser --home /app --uid 1001 --ingroup app --shell /bin/sh --disabled-password --gecos app app \
    && chown -R app:app /app

USER app:app

EXPOSE 3000

CMD ["npm", "run", "start"]
