import axios from "axios";
import environment from "../environment/environment";

export default class AuthorService {
  static async getBuses() {
    try {
      return await axios.get(`${environment.config.apiUrl}/beacons/buses`);
    } catch (error) {
      console.error(error);
    }
  }
}
