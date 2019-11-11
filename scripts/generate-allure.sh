#!/bin/bash

source scripts/config.sh

docker container run -it --rm -v $(pwd)/output:/app/output presidenten/cis-benchmark-allure-reporter:$REPORTER_VERSION
