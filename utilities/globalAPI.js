import axios from "axios";

const BASE_URL = "https://places.googleapis.com/v1/places:searchNearby";

const PROD = false;
export const API_KEY = PROD ? "ENTER GOOGLE API KEY" : "";

const config = {
  headers: {
    "Content-Type": "application/json",
    "X-Goog-Api-Key": API_KEY,
    "X-Goog-FieldMask ": [
      "places.displayName",
      "places.formattedAddress",
      "places.location",
      "places.evChargeOptions",
      "places.shortFormattedAddress",
      "places.photos",
    ],
  },
};
const NearByPlaces = (data) => axios.post(BASE_URL, data, config);
export default { NearByPlaces };
