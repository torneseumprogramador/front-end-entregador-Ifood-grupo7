export default async function getGeoLocation() {
  const coordinates = await getCoordinates();

  return {
    latitude: coordinates.coords.latitude,
    longitude: coordinates.coords.longitude,
    timestamp: coordinates.timestamp,
  };
}

function getCoordinates() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}
