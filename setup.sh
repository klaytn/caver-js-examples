#!/usr/bin/env bash

PROJECT_ROOT_DIR=$PWD
ASSETS_DIR=$PROJECT_ROOT_DIR/assets
BOILER_PLATE_TEMPLATE=$ASSETS_DIR/boilerplate.js
NEW_SCENARIO=$1

## Tokenize $NEW_SCENARIO
# account/update_account_with_account_key_weighted_multisig | COMMON_ARCHITECTURE_LAYER: account,
ARR_IN=(${NEW_SCENARIO//\// })
ARR_LEN=${#ARR_IN[@]}
COMMON_ARCHITECTURE_LAYER_NAME=${ARR_IN[0]}
SCENARIO_NAME=${ARR_IN[$ARR_LEN - 1]}

echo "Create project structure for $NEW_SCENARIO\n"

mkdir -p $NEW_SCENARIO
cp $BOILER_PLATE_TEMPLATE $NEW_SCENARIO
