# Insomnia OpenAPI
[![Coverage Status](https://coveralls.io/repos/github/xjdesigns/insomnia_openapi/badge.svg?branch=master)](https://coveralls.io/github/xjdesigns/HelpingHand?branch=master)

Javascript utility library written in typescript for converting insomnia V4 exports to openapi v3 spec.

## Install
```bash
npm i insomnia_openapi
```

```bash
import { Parser } from 'insomnia_openapi'
```

## Usage

Currently this is built to accomodate a personal project with the goal to update
and handle as many scenarios as I can for a global community.

```javascript
  let openapiConfig = {
    "title": "My api",
    "description": "Internal API",
    "version": "1.0.0"
  };

  // This would be the export from insomnia as V4
  const INSOV4 = {
    ...
  }

  const parser = new Parser(INSOV4, { openapiConfig })
  const output = parser.convert()
  console.warn('output::', output)
```

## Build
Typescript compiler for type declarations. Rollup and babel used for bundling.

Build an output file and type declarations
```bash
npm run build
```

Run types and bunding in watch mode
```bash
npm run build:watch
```

Run only types
```bash
npm run build:types
```

Run type checking
```bash
npm run type-check
```

## Local Development
To run locally you will want to `npm link` the package.

NOTE: If you link then unlink a package you must run your install command again.

> If you find linking issues make sure both are on the same node version

```bash
* Inside insomnia_openapi
npm link
```

```bash
* Inside Application
npm link insomnia_openapi
```

## Testing
Testing uses Jest and 100% coverage is required.

Run tests
```bash
npm run test
```

Run tests in watch mode
```bash
npm run test:watch
```

Run tests coverage report
```bash
npm run test:coverage
```

## Docs
Documentation is build using React inside the /docs directory.

Docs use the actual published package so this requires a publish for any changes to see.

### Doc publish
Inside the /docs run the following command, which will build the app and deploy using gh-pages

```bash
npm run deploy:docs
```

## TODO:
- Servers is removed from return
- Params added, need to add schemas
- Headers added, need to add schemas
- Add more auth options, bearer and basic currently handled
- Add JSON to YAML option
- Add options to config for return values
- Add ability to pass functions to config for each return to allow user modification
- Add more tests
