import { WeatherForecast } from './setup'

const test: WeatherForecast = {
  id: 123456,
  station: 'Acropolis Weather Reporter',
  rain: { '1h': 1 },
  snow: { '3h': 3 }, // rejected
}
