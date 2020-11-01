# Weather App

Demo weather app shows today and future 7 days' weather for any city. 

## Prerequisites
- Node.js >= 12.0
- npm >= 6.0
- yarn >= 1.0

## Envrionment Variables
Make a copy of `.env.example` and rename to `.env`. 
The example contains free API keys for demo purpose.

Don't use demo API keys for production. 

## Run Production Build
1. `yarn install`
2. `npm run build`
3. Run a server at directory `./dist`

## Development
1. `yarn install`
2. `npm run dev`
3. Open in browser http://localhost:8080

## Third Party APIs
This app uses OpenWeatherMap One Call API: https://openweathermap.org/api/one-call-api

Because this API only supports search by coordinates, 
OpenCage Geocoding API is also used: https://opencagedata.com/api

All other APIs that return daily weather in OpenWeatherMap require paid account, 
where some of them also allow search weather by city name. 
If we could afford a paid account then OpenCage is not necessary, 
and the code structure would be different. Although the current implementation
also uses OpenCage to reverse geocode coordinates for finding better formatted city name,
while in forward geocoding the result also has a better formmated city name 
which is shown in UI instead of user input. 

### Weather icons
Weather icons are from OpenWeatherMap because they have a direct map of weather code to icon. 
But they don't have dark mode icons 😓. If they had them it would be an easy update to the code. 
For now I'll leave them since it's more like a designer issue. 

# Answer for first two challenges
Please have a look at puzzle.txt and quick_challenge.js at root directory