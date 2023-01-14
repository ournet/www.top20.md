#!/bin/bash

#update repository
git pull
yarn
pm2 restart ./pm2.json
