import { WeatherForecast } from './setup'

const test: WeatherForecast = {
  id: 123456,
  station: 'Acropolis Weather Reporter',
  // @ts-expect-error
  rain: {},
}
