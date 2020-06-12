#!/usr/bin/env bash

project_name="predictionFrontEnd";

echo “Switching to $1 environment”

if [ $1 == "ui" ];
then
  yes | cp -f server_env/ui/index.js server_env
elif [ $1 == "prod" ]
then
  yes | cp -f server_env/prod/index.js server_env
else
  yes | cp -f server_env/fe/index.js server_env
fi