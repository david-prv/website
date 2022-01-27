#!/bin/bash

# CSS COMPRESSION
cssmin --wrap 1000 < ./css/main.css > ./css/main.min.css
cssmin --wrap 1000 < ./css/privacy.css > ./css/privacy.min.css

# JS COMPRESSION
uglifyjs ./js/hi.js > ./js/hi.min.js
uglifyjs ./js/main.js > ./js/main.min.js

echo "Done..."
