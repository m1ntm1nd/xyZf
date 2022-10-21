#!/bin/bash

node $(pwd)/genAccs.js

for i in {0..25}
do
    node $(pwd)/main.js $i
    sleep 1
done

node $(pwd)/send.js

sleep 100

./farm.sh