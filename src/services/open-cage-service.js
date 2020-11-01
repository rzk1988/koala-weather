export const geocodeCity = async (cityInput) => {
  const apiKey = process.env.OPEN_CAGE_API_KEY;
  const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${cityInput}&key=${apiKey}`);
  return await parseResponse(response);
}

export const reverseGeocodeCity = async (coord) => {
  const apiKey = process.env.OPEN_CAGE_API_KEY;
  const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${coord.lat}+${coord.lng}&key=${apiKey}`);
  return await parseResponse(response);
}

async function parseResponse(resp) {
  const data = await resp.json();
  const city = data.results[0];
  if (!city || !city.components.city) return null;
  return {
    city: formatCity(city),
    coordinates: city.geometry
  };
}

function formatCity(cityObj) {
  const { components } = cityObj;
  return components.city + (components.state_code ? `, ${components.state_code}` : '')
}