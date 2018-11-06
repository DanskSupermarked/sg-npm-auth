# Salling Group API Authentication
[![Build Status](https://dev.azure.com/emilholmnauerby/emilholmnauerby/_apis/build/status/DanskSupermarked.sg-auth)](https://dev.azure.com/emilholmnauerby/emilholmnauerby/_build/latest?definitionId=1)

This library allows you to easily set up an Axios instance that can query the Salling Group API.

## Getting Started
This will check if 2017-12-24 is a holiday by querying the Holidays API.
```js
const { createInstance } = require('@salling-group/auth');
const instance = createInstance({
  'applicationName': 'My Application v1.0.1',
  'auth': {
    'type': 'bearer',
    'token': 'my_token',
  },
});

instance.get('/v1/holidays/is-holiday', {
  'params': {
    'date': '2017-12-24',
  },
}).then((response) => console.log(response.data));
```

## Instance
The authentication library exposes two authentication methods for setting up an Axios instance.
This means that you can use this instance as you would use [Axios](https://github.com/axios/axios),
and it will handle authentication for you.

The available authentication methods are Bearer and JWT. You can get your credentials on the [developer portal](https://developer.sallinggroup.com/).

### `getInstance(options: object): Instance`
This function gets a new Axios instance with access to the Salling Group API
(given the provided credentials are correct and has access to the requested ressource).
The provided options object must contain an `auth` object with the following specification:

|Property|Value|Required|Description|
|--------|-----|--------|-----------|
|`type`|`'jwt'` or `'bearer'`|Yes|The authentication type. This is either a JWT or a Bearer Token.|
|`token`|`String`|If `type` is `'bearer'`.|The token associared with the bearer token credentials.|
|`email`|`String`|If `type` is `'jwt'`.|The email associated with the JWT credentials.|
|`secret`|`String`|If `type` is `'jwt'`.|The secret associated with the JWT credentials.|

## Examples
### Bearer
If you use a Bearer token, you can access the API like this:
```js
const instance = createInstance({
  'applicationName': 'My Application v1.0.1',
  'auth': {
    'type': 'bearer',
    'token': 'my_token',
  },
});
instance.get('/v1/stores/').then(response => {
  console.log(response.data);
});
```

### JWT
If you use a JWT, you can access the API like so:
```js
const instance = createInstance({
  'applicationName': 'My Application v1.0.1',
  'auth': {
    'type': 'bearer',
    'email': 'my_email',
    'secret': 'my_secret',
  },
});
instance.get('/v1/stores/').then(response => {
  console.log(response.data);
});
```
