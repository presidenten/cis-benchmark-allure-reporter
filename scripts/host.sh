#!/bin/bash

echo "Hosting report on localhost:8080" && \
docker container run --rm -v $(pwd)/output/allure:/usr/share/nginx/html -p 8080:80 nginx > /dev/null 2>&1
