import axios from "axios";
import { environment } from "../environment/environment";

export class AirportService{
    readonly AIRPORT_URL = environment.airportsEndpoint;

    getAllAirports(){
        console.debug("Attempting to retreive all airports from " + this.AIRPORT_URL);
        const getAirports = async () => {
            try{
                const response = await axios.get(this.AIRPORT_URL);
                return response;
            } catch(error){
                console.debug(error);
                throw error;
            }
        }
        return getAirports();
    }
}