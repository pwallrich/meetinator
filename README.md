# meetinator

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

## Database
currently the service communicates directly with firestore. 

Therefore configuration is read from a .env file.

The following keys are needed in the .env file.

- `VUE_APP_FIREBASE_API_KEY`
- `VUE_APP_FIREBASE_AUTH_DOMAIN`
- `VUE_APP_FIREBASE_DATABASE_URL`
- `VUE_APP_FIREBASE_PROJECT_ID`
- `VUE_APP_FIREBASE_STORAGE_BUCKET`
- `VUE_APP_FIREBASE_MESSAGING_SENDER_ID`
- `VUE_APP_FIREBASE_APP_ID`
- `VUE_APP_FIREBASE_MEASUREMENT_ID` (optional)

These values can be found in the firebase console under `Project Settings` -> `Your project` 

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
