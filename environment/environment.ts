const hostUrl = "http://localhost:8080";

export const environment = {
  production: false,
  authEndpoint: `${hostUrl}/login`,
  airplaneEndpoint: `${hostUrl}/airplanes`,
  accountsEndpoint: `${hostUrl}/accounts`,
  airportsEndpoint: `${hostUrl}/airports`,
  flightsEndpoint: `${hostUrl}/flights`,
  servicingAreaEndpoint: `${hostUrl}/servicing-area`,
  ticketsEndpoint : `${hostUrl}/tickets`,
  hostUrl: hostUrl,
};
