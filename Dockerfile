FROM node:latest as compodoc
RUN git clone https://github.com/oneoffcoder/zava.git /zava \
    && cd /zava/zava-ts/projects/zava \
    && npm install -g @compodoc/compodoc \
    && compodoc -p tsconfig.lib.json \
        -n zava \
        --hideGenerator \
        --customFavicon docs/favicon.ico \
        --customLogo docs/logo.png \
        --includes docs \
        --includesName More \
        -a docs/images \
        src

FROM node:latest
ARG GH_TOKEN=invalidtoken
ARG GH_USER=oneoffcoder
ARG GH_REPO=zava
COPY --from=compodoc /zava/zava-ts/projects/zava/documentation /compodoc
RUN git clone --quiet \
    --branch=gh-pages \
    https://${GH_TOKEN}@github.com/${GH_USER}/${GH_REPO}.git /gh-pages > /dev/null
RUN cp -Rf /compodoc/* /gh-pages
RUN git config --global user.email "vangjee@gmail.com" \
    && git config --global user.name "Jee Vang, Ph.D." \
    && cd /gh-pages \
    && git add -f . \
    && git commit -m "update documentation" \
    && git push -fq origin gh-pages > /dev/null