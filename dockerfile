FROM node:22-alpine3.19

RUN mkdir -p /home/node/app && chown -R node:node /home/node/app

# Copiar archivos desde la subcarpeta 'prod'
COPY prod/dist /home/node/app/dist
COPY prod/package.json /home/node/app/package.json
COPY prod/.env.production /home/node/app/.env.production

WORKDIR /home/node/app

RUN npm install --production

CMD ["npm", "run", "start:prod"]

# se debe asignar una variable de entorno para que el contenedor sepa que es un contenedor de producción y no de desarrollo la variable se llama AMBIENTE=production