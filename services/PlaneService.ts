import axios from "axios";
import { environment } from "../environment/environment";

export interface PlaneDTO{
    name:string,
    seatConfigurations: SeatConfigurations[],
}

export interface SeatConfigurations{
    numRows: number,
    numSeatsPerRow: number,
    seatClass: AirplaneClasses,
}

export enum AirplaneClasses{
    ECONOMY = 'ECONOMY',
    BUSINESS = 'BUSINESS',
}

export class PlaneService{
    readonly AIRPLANE_URL = environment.airplaneEndpoint;

    getAllAirplanes(){
        console.debug("Attempting to retreive all airplanes from " + this.AIRPLANE_URL);      
        const getAirplanes = async() => {
            try{
                const response = await axios.get(this.AIRPLANE_URL);
                return response;
            } catch (error){
                console.debug([error]);
                throw error;
            }
        }
        return getAirplanes();
    }

    AddAirplane(planeBody: PlaneDTO){
        console.debug("Attempting to add airplane to " + this.AIRPLANE_URL);
        const addAirplane = async(data: PlaneDTO) => {
            try{
                const response = await axios.post(this.AIRPLANE_URL, data);
                return response;
            } catch (error){
                console.debug(error);
                throw error;
            }
        }
        return addAirplane(planeBody);
    }
}
