const NodeGeocoder = require('node-geocoder');

// Set up the geocoder
const geocoder = NodeGeocoder({
  provider: 'openstreetmap' // Specify the provider (in this case, OpenStreetMap)
});

// Search for a street name and retrieve coordinates
const searchStreet = async (streetName) => {
  try {
    const res = await geocoder.geocode(streetName);
    if (res.length > 0) {
      const { latitude, longitude } = res[0];
      console.log('Coordinates:', { latitude, longitude });
    } else {
      console.log('Street not found');
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
};

// Usage example
const streetToSearch = 'Travessa de S. Zides nº4, Vila Chã, Esposende, Portugal'; // Replace this with the street you want to search for
searchStreet(streetToSearch);