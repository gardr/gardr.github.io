---
title: Ext and host
layout: post
tags:
- ext
- hosts
---

The safe frame initiative has the concepts of _ext_ and _host_, were _ext_ is the library that goes into the Iframe and _host_ is the script which runs on the host site.


## Adding gardr to your project

### Add dependencies

If you don't have a package.json
  
  $ npm init
  

Add the host and ext modules as a dependency

  $ npm install --save gardr-host gardr-ext

## Adding plugins
Simply install like a regular dependency

  $ npm install --save gardr-someFeature-plugin

## Building bundles
Take a look at the `browserify` task in package.json. It uses [browserify](https://github.com/substack/node-browserify) to generate a static browser-version of the files in /lib.

  $ npm run browserify

You can choose to make your own bunles using CommonJS, or transform it to an [UMD module](https://github.com/umdjs/umd) using the `--standalone` (or `-s`) argument to load it with an AMD loader or `window.gardrHost`.

  $ browserify -s gardrHost lib/hostBundle.js > browserified/hostBundle.js

If you want source maps to make debuggin the code easier, add `--debug` as browserify argument. Browserify only adds source maps as an inline comment. So if you want and external source map, use [exorcist](https://github.com/thlorenz/exorcist) to extract it:

  $ browserify lib/hostBundle.js --debug | exorcist browserified/hostBundle.js.map > browserified/hostBundle.js

## Logging
Debugging can be done by configuring logging to either the browser console or as an overlay inside the iframes rendered by Garðr.
You can turn on logging by adding an url-fragment with log level: #loglevel=4

By default it will display an overlay inside each banner with the log output. If the banner isn't visible, you can output to console by using:

  #loglevel=4&logto=console

*NB!* If the banner injects another iframe we have no good way of catching errors :(

## No support for IE7 or older
We have very few IE7 users, and some of the techniques used in Garðr (like postMessage) require many dirty hacks to work in IE7.

## Polyfills required for IE8+ support
To keep the code minimal for modern browsers (mobile), we use some new features that came in EcmaScript 5. They are easy to implement in older browsers using a few simple polyfills. You can include it with a conditional-comment, so only users with old IE versions download the extra script. See the iframe html for an example.
[ES5-shim](https://npmjs.org/package/es5-shim) You do not need a sham (unsafe polyfills).

## Samples in the wild
All of the display adverts on [m.finn.no](http://m.finn.no/) are using Garðr to safely embed responsive adverts written in HTML, CSS and JS.
