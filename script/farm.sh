#!/bin/bash

for i in {0..25}
do
    node $(pwd)/main.js $i
    sleep 1
done

node $(pwd)/send.js $i