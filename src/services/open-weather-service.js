import moment from 'moment';

export const getWeatherByCoords = async (coords) => {
  const apiKey = process.env.OPEN_WEATHER_API_KEY;
  const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lng}&exclude=minutely,hourly,current,alerts&appid=${apiKey}&units=metric`);
  const data = await response.json();
  return data.daily.map(
    weather => {
      const time = moment.unix(weather.dt);
      return {
        date: time.format('Do MMM YYYY'),
        day: time.format('dddd'),
        temp_min: weather.temp.min.toFixed(1),
        temp_max: weather.temp.max.toFixed(1),
        weather_desc: upcaseWords(weather.weather[0].description),
        weather: weather.main,
        icon: `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`,
      }
    }
  );
};

function upcaseWords(string) {
  return string.split(' ').map(word => {
    if (!word) return '';
    return word[0].toUpperCase() + word.substring(1);
  }).join(' ');
}