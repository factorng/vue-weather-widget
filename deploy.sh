#!/usr/bin/env sh
# abort on errors
set -e
# build
npm run build
# navigate into the build output directory
cd dist
# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME
git init
git add -A
git commit -m 'deploy'
# if you are deploying to https://factorng.github.io
# git push -f git@github.com:factorng/factorng.github.io.git main
# if you are deploying to https://factorng.github.io/vue-weather-widget
git push -f git@github.com:factorng/vue-weather-widget.git main:gh-pages
cd -