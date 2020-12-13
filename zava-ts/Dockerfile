FROM node:latest

LABEL author="Jee Vang, Ph.D."
LABEL email="vangjee@gmail.com"

COPY . /code
RUN npm install -g @angular/cli @compodoc/compodoc \
    && cd /code \
    && npm install \
    && cd /code/projects/zava \
    && npm install \
    && cd /code \
    && ng build --prod \
    && cd /code/projects/zava \
    && compodoc -p tsconfig.lib.json \
        -n zava \
        --hideGenerator \
        --customFavicon docs/favicon.ico \
        --customLogo docs/logo.png \
        --includes docs \
        --includesName More \
        -a docs/images \
        src
