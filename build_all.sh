#!/bin/bash

mkdir build

for dir in week*/ ; do
    yarn --cwd $dir install
    yarn --cwd $dir build
    mv $dir/build ./build/$dir
done


