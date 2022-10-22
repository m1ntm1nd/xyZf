#!/bin/bash

nvm use v16.16.0

node $(pwd)/src/genAccs.js

for i in {0..25}
do
    node $(pwd)/src/main.js $i
    sleep 1
done

node $(pwd)/src/send.js

sleep 100

./farm.sh