#!/bin/bash

source scripts/config.sh

echo "Scanning $USER@$SERVER"

docker container run -it --rm \
  -e SERVER=$SERVER -e USER=$USER \
  -v ~/.ssh:/share/ssh:ro \
  -v $(pwd)/output:/share/output \
  presidenten/dev-sec-cis-benchmarks:$SCANNER_VERSION

echo ""
ls output/*.json
echo ""

scripts/generate-allure.sh
