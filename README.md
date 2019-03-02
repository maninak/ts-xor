[![Build Status](https://travis-ci.org/maninak/ts-xor.svg?branch=master)](https://travis-ci.org/maninak/ts-xor)

# ts-xor

Compose custom types containing mutually exclusive keys, using this generic Typescript helper type.

>Ts-xor is a micro-library with zero dependencies, designed to tackle a very specific problem and nothing more. Since it only enhances your typings, the overhead to your production bundle is zero (0) bytes.

## Description

Typescript's union operator (`|`) allows combining two types `A` and `B`, into a superset type C which _can_ contain all the members of both `A` and `B`.

But sometimes the requirements dictate that we combine two types with mutually exclusive members. So take the members `A.a` and `B.b`. Given `type C = A | B` then we want to impose the restriction that we can set _either_ `C.a` _or_ `C.b` _but never both_ AND _at least one of the two_!

Typescript [does not support this feature out of the box yet](https://github.com/Microsoft/TypeScript/issues/6579).

This package introduces the new type `XOR`. You can use XOR to compose your own custom types with mutually exclusive members.

XOR effectively implements the logical XOR operator from boolean algebra as defined by the following truth table:

| A | B | Result |
| :-: | :-: | :-: |
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

## Installation

In your typescript powered, npm project, run:

```sh
npm install -D ts-xor # yarn add -D ts-xor
```

## Examples

### A simple example

In any typescript file you can just have:

```typescript
import { XOR } from 'ts-xor'

interface A {
  a: string
}

interface B {
  b: string
}

let A_XOR_B: XOR<A, B>

A_XOR_B = { a: '' }         // OK
A_XOR_B = { b: '' }         // OK
A_XOR_B = { a: '', b: '' }  // fails
A_XOR_B = {}                // fails
```

### A real-life example

Say that we have the following specification:

1. A weather forecast contains either a forecast member `rain` or a forecast member `snow`, but _never_ both.
2. The `rain` and `snow` members contain weather accuracy data
3. The weather accuracy can contain either a member `1h` or a member `3h` with a number value, but _never_ both keys at the same time.
4. A weather forecast always contains the `station` and `id` members

```typescript
import { XOR } from 'ts-xor'

type ForecastAccuracy = XOR<{ '1h': number }, { '3h': number }>

interface WeatherForecastBase {
  station: string
  id: number
}

interface WeatherForecastWithRain extends WeatherForecastBase {
  rain: ForecastAccuracy
}

interface WeatherForecastWithSnow extends WeatherForecastBase {
  snow: ForecastAccuracy
}

type WeatherForecast = XOR<WeatherForecastWithRain, WeatherForecastWithSnow>

const ourTestCase: WeatherForecast = {
  station: 'Acropolis Weather Reporter',
  rain: { '1h': 1 },              // OK
  // rain: { '2h': 1 },           // fails
  // rain: { '3h': 1 },           // OK
  // rain: {},                    // fails
  // rain: { '1h': 1 , '3h': 3 }, // fails
  // lel: { '3h': 1 },            // fails
  // snow: { '3h': 1 },           // OK
  // when BOTH `rain` AND `snow` are declared, compilation fails
  id: 123456
}
```

## Tests and Coverage

The library `ts-xor` is fully covered with acceptance and mutation tests against the typescript compiler itself. The tests can be found inside the [`test`](https://github.com/maninak/ts-xor/tree/master/test) folder.

To run all tests locally, execute the following command inside your git-cloned `ts-xor` folder:

```sh
npm test
```

## NPM

This library is [published on NPM](https://www.npmjs.com/package/ts-xor).

## Licence

Distributed under the MIT license. See [`LICENSE.md`](./LICENCE.md) for more information.

## Contributing

This project's commits comply with the [Conventional Commits](https://www.conventionalcommits.org/) guidelines.

1. Fork it (<https://github.com/maninak/ts-xor/fork>)
2. Create your feature/fix branch (`git checkout -b feat/foobar`)
3. Commit your changes (`git commit -am 'feat(foobar): add support for foobar tricks'`)
4. Push to the branch (`git push origin feat/fooBar`)
5. Create a new Pull Request
