#!/bin/bash

cd ios && pod install && cd ..

npx react-native run-ios
