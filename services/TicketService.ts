import axios from "axios";
import {environment} from "../environment/environment";

export class TicketService{
    readonly TICKET_URL = environment.ticketsEndpoint;
    
    checkInTicket(id: number){
        console.debug("Attempting to check in ticket with id " + id);
        const checkInTicketWithPermissions = async (id: number) => {
            try{
                const response = await axios.put(this.TICKET_URL + '/' + id);
                return response;
            } catch (error){
                console.debug(error);
                throw error;
            }
        }
        return checkInTicketWithPermissions(id);
    }
}