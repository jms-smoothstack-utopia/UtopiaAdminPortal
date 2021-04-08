import axios from "axios";
import { environment } from "../environment/environment";

export interface CreateFlightDto{
    originId: string,
    destinationId: string,
    airplaneId: number,
    approximateDateTimeStart: Date,
    approximateDateTimeEnd: Date,
    baseSeatPrice: number,
    loyaltyPoints: number
}

export class FlightService{
    readonly FLIGHT_URL = environment.flightsEndpoint;

    getAllFlights(){
        console.debug("Attempting to retreive all flights from " + this.FLIGHT_URL);
        const getFlights = async () => {
            try {
                const response = await axios.get(this.FLIGHT_URL);
                return response;
            } catch (error){
                console.debug(error);
                throw error;
            }
        }
        return getFlights();
    }

    addNewFlight(RequestBody: CreateFlightDto){
        console.debug("Attempting to add a flight for " + this.FLIGHT_URL);
        const addFlight = async(data: CreateFlightDto) => {
            try{
                const response = await axios.post(this.FLIGHT_URL, data);
                return response;
            } catch(error){
                console.debug(error);
                throw error;
            }
        }
        return addFlight(RequestBody);
    }
}