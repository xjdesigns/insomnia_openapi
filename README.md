# Insomnia OpenAPI
[![Build Status](https://travis-ci.org/xjdesigns/HelpingHand.svg?branch=master)](https://travis-ci.org/xjdesigns/HelpingHand)
[![Coverage Status](https://coveralls.io/repos/github/xjdesigns/HelpingHand/badge.svg?branch=master)](https://coveralls.io/github/xjdesigns/HelpingHand?branch=master)

Javascript utility library written in typescript for converting insomnia V4 exports to openapi v3 spec.

## Install
```bash
npm i helping_hand
```

```bash
import { module } from 'insomnia_openapi'
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

```bash
* Inside helping_hand
npm link
```

```bash
* Inside Application
npm link helping_hand
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
