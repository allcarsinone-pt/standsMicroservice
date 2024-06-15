const { default: axios } = require('axios');
const NodeGeocoder = require('node-geocoder');

class OpenStreetMapLocationServiceGateway {
  constructor() {
    this.geocoder = NodeGeocoder({
      provider: 'openstreetmap'
    });
  }

  async getCoordinates(streetName) {
    try {
        const street = streetName.replace(" ", "+")
        const res = await axios.get(`https://nominatim.openstreetmap.org/search?q=${street}&format=json`)
        if (res.data) {
          const { lat, lon } = res.data[0];
          console.log('Coordinates:', { lat, lon });
          return { latitude:lat, longitude:lon };
        } else {
          return { message: 'Street not found' };
        }
      } catch (error) {
        return { message: "Internal Server Error" };
      }
  }
}

module.exports = OpenStreetMapLocationServiceGateway;