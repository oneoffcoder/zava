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
        src \
    && cd /code/dist/zava \
    && if [ -f /code/.npmrc ]; then cp /code/.npmrc ~/.npmrc; else echo "no .npmrc to copy"; fi \
    && if [ -f /code/.npmrc ]; then npm publish; else echo "no .npmrc to publish"; fi \
    && if [ -f /code/.npmrc ]; then rm -f /code/.npmrc; else echo "no .npmrc to delete (code)"; fi \
    && if [ -f ~/.npmrc ]; then rm -f ~/.npmrc; else echo "no .npmrc to delete (home)"; fi
