# Bluemix CF IP Filter

[![npm version](https://badge.fury.io/js/bluemix-cf-ip-filter.svg)](https://badge.fury.io/js/bluemix-cf-ip-filter)
[![Build Status](https://travis-ci.org/Astr-o/bluemix-cf-ip-filter.svg?branch=master)](https://travis-ci.org/Astr-o/bluemix-cf-ip-filter)
[![Coverage Status](https://coveralls.io/repos/github/Astr-o/bluemix-cf-ip-filter/badge.svg?branch=master)](https://coveralls.io/github/Astr-o/bluemix-cf-ip-filter?branch=master)
[![dependencies Status](https://david-dm.org/Astr-o/bluemix-cf-ip-filter/status.svg)](https://david-dm.org/Astr-o/bluemix-cf-ip-filter)

Express middleware for IP Based Filtering of incoming requests to Bluemix cloudfoundry apps. The standard
IP filtering middleware wont work here as bluemix will proxy your request, use this if your hosting in bluemix instead.

Cloudfoundry on Bluemix does not support restricting allowed IPs in its configuration, you can easily
add this functionality to your existing express application using this module.

## Installation

```bash
npm install bluemix-cf-ip-filter
```

## Usage

### Allowed Mode (Default)

The middleware will allow requests originating from listed address and respond with standard 403 response
any to others.

```Javascript
const ipFilter = require('bluemix-cf-ip-filter')

const express = require('express')
const app = express()

if(process.env.NODE_ENV === 'production') {
    // allowed mode only listed ips will connect
    app.use(ipFilter(['22.223.1.24'], 'allow'))
}
```

### Banned mode

middleware will block requests originating from listed address with a 403 response
and allow unlisted IPs.

```Javascript
if(process.env.NODE_ENV === 'production') {
    // listed ips will be blocked
    app.use(ipFilter(['22.223.1.24'], 'block'))
}
```

## Tests

Tested using mocha, chai and sinon

```bash
npm test
```
