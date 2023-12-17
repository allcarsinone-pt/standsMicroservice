const NodeGeocoder = require('node-geocoder');

class OpenStreetMapLocationServiceGateway {
  constructor() {
    this.geocoder = NodeGeocoder({
      provider: 'openstreetmap'
    });
  }

  async getCoordinates(streetName) {
    try {
        const res = await this.geocoder.geocode(streetName);
        if (res.length > 0) {
          const { latitude, longitude } = res[0];
          console.log('Coordinates:', { latitude, longitude });
          return { latitude, longitude };
        } else {
          return { message: 'Street not found' };
        }
      } catch (error) {
        return { message: "Internal Server Error" };
      }
  }
}

module.exports = OpenStreetMapLocationServiceGateway;