import geocoder from './geocoder/geocoderConfig';

class GeoLib {
  public getAddressFromCoordinates(coordinates: [number, number] | { lat: number; lng: number }): Promise<string | undefined> {
    const lat = Array.isArray(coordinates) ? coordinates[0] : coordinates.lat;
    const lon = Array.isArray(coordinates) ? coordinates[1] : coordinates.lng;

    return geocoder.reverse({ lat, lon })
      .then(res => {
        if (res.length > 0) {
          return res[0].formattedAddress;
        } else {
          throw new Error('Endereço não encontrado para as coordenadas fornecidas.');
        }
      });
  };

  public getCoordinatesFromAddress(address: string): Promise<{ lat: number; lng: number }> {
    return geocoder.geocode(address)
      .then(res => {
        if (res.length > 0 && res[0].latitude !== undefined && res[0].longitude !== undefined) {
          return { lat: res[0].latitude, lng: res[0].longitude };
        } else {
          throw new Error('Coordenadas não encontradas para o endereço fornecido.');
        }
      });
  }
}

export default new GeoLib();
