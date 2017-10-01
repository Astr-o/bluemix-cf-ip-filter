# Bluemix CF IP Filter

[![Build Status](https://travis-ci.org/Astr-o/bluemix-cf-ip-filter.svg?branch=master)](https://travis-ci.org/Astr-o/bluemix-cf-ip-filter)
[![Coverage Status](https://coveralls.io/repos/github/Astr-o/bluemix-cf-ip-filter/badge.svg?branch=master)](https://coveralls.io/github/Astr-o/bluemix-cf-ip-filter?branch=master)



Express middleware for IP Based Filtering of incoming requests to Bluemix cloudfoundry apps which are proxied.

Cloudfoundry on Bluemix does not support restricting allowed IPs in its configuration, you can easily
this functionality to your existing express application using this module.

## Installation

```bash
npm install bluemix-cf-ip-filter
```

## Usage

### Allowed Mode (Default)

middleware will allow requests originating from listed address and respond with standard 403 response

```Javascript
const ipFilter = require('bluemix-cf-ip-filter')

const express = require('express')
const app = express()

if(process.env.NODE_ENV === 'production') {
    // allowed mode only listed ips will connect
    app.use(ipFilter(['22.223.1.24'], mode='allow'))
}
```

### Banned mode

middleware will allow requests originating from listed address and respond with standard 403 response

```Javascript
if(process.env.NODE_ENV === 'production') {
    // listed ips will be blocked
    app.use(ipFilter(['22.223.1.24'], mode='block'))
}
```

## Tests

Tested using mocha, chai and sinon

```bash
npm test
```
