import NodeGeocoder from 'node-geocoder';

const options: NodeGeocoder.Options = {
  provider: 'google',
  apiKey: 'AIzaSyBq9ArCwH1b_3aRa2j0fjjLtlke_8bNXVI', 
  formatter: null,
};

const geocoder = NodeGeocoder(options);

export default geocoder;