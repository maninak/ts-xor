import { XOR } from '../../src'

import { WeatherForecast } from './setup'

const test: WeatherForecast = {
  station: 'Acropolis Weather Reporter',
  id: 123456,
  rain: { '1h': 1 },
  snow: { '3h': 3 }, // fails
}
