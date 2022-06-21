## Installation

Using npm:

```
npm install --save redis-connection-object-generator
```

## Using

```javascript
const redisConnectionObjectGenerator = require('redis-connection-object-generator')

redisConnectionObjectGenerator('redis://:@127.0.0.1:6379/0')
// { host: '127.0.0.1', port: 6379, family: 0, password: '', db: 0 }

redisConnectionObjectGenerator(`sentinel://:password@127.0.0.1:6380,127.0.0.1:6379,127.0.0.1:6378/service_name:mymaster`)
/*
{ name: 'mymaster',
  sentinels:
   [ { host: '127.0.0.1', port: 6380 },
     { host: '127.0.0.1', port: 6379 },
     { host: '127.0.0.1', port: 6378 } ],
  password: 'password' }
*/
```
