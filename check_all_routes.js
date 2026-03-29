const fs = require('fs');
const path = require('path');
const express = require('express');

const routesDir = './server/routes';
const files = fs.readdirSync(routesDir);

files.forEach(file => {
    if (file.endsWith('.js')) {
        console.log(`Checking ${file}...`);
        try {
            const router = require(path.join(__dirname, 'server', 'routes', file));
            if (typeof router !== 'function') {
                console.log(`❌ ${file} does NOT export a router function (it is ${typeof router})`);
            } else {
                // Check if any layer has undefined handle
                router.stack.forEach((layer, i) => {
                    if (!layer.route && !layer.handle) {
                        console.log(`❌ ${file} Layer ${i} is invalid`);
                    } else if (layer.route) {
                        layer.route.stack.forEach((s, j) => {
                            if (typeof s.handle !== 'function') {
                                console.log(`❌ ${file} Route ${layer.route.path} Stack ${j} is NOT a function`);
                            }
                        });
                    }
                });
                console.log(`✅ ${file} looks OK`);
            }
        } catch (err) {
            console.log(`❌ ${file} CRASHED during require: ${err.message}`);
        }
    }
});
