#!/bin/bash

export VERSION=1.0.0
export NAME=cis-benchmark-allure-reporter
export REG=presidenten

DOCKER_BUILDKIT=1 docker image build -t $NAME:${VERSION} .
docker image tag $NAME:${VERSION} $REG/$NAME:${VERSION}

docker image ls | grep `echo "$NAME"` | grep `echo "$VERSION"`
