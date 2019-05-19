import { XOR } from './../../src'

type ForecastAccuracy = XOR<{ '1h': number }, { '3h': number }>

interface WeatherForecastBase {
  id: number
  station: string
}

interface WeatherForecastWithRain extends WeatherForecastBase {
  rain: ForecastAccuracy
}

interface WeatherForecastWithSnow extends WeatherForecastBase {
  snow: ForecastAccuracy
}

export type WeatherForecast = XOR<WeatherForecastWithRain, WeatherForecastWithSnow>
