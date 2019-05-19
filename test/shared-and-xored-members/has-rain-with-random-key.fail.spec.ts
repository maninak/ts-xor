import { XOR } from '../../src'

import { WeatherForecast } from './setup'

const test: WeatherForecast = {
  id: 123456,
  station: 'Acropolis Weather Reporter',
  rain: { '2h': 1 }, // fails
}
