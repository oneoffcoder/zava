#!/bin/bash

DOCKER_FILE=Dockerfile
DOCKER_REPO=zava
DOCKER_TAG=ts


docker build --no-cache \
  -f $DOCKER_FILE \
  -t ${DOCKER_REPO}:${DOCKER_TAG} .