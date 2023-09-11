import { WeatherForecast } from './setup'

const test: WeatherForecast = {
  station: 'Acropolis Weather Reporter',
  id: 123456,
  // @ts-expect-error
  rain: { '1h': 1, '3h': 3 },
}
