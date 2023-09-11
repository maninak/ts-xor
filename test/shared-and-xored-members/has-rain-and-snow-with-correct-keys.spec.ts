import { WeatherForecast } from './setup'

// @ts-expect-error
const test: WeatherForecast = {
  id: 123456,
  station: 'Acropolis Weather Reporter',
  rain: { '1h': 1 },
  snow: { '3h': 3 },
}
