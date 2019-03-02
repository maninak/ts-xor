import { XOR } from '../../src'

import { WeatherForecast } from './setup'

const test: WeatherForecast = {
  station: 'Acropolis Weather Reporter',
  id: 123456,
  rain: { '2h': 1 }, // fails
}
