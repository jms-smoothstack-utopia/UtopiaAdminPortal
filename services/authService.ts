import { environment } from "../environment/environment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import jwt_decode from "jwt-decode";

interface AuthResponse {
  userId: string;
  token: string;
  expiresAt: number;
}

export class AuthService {

  public userId?: string;
  public token?: string;
  public expiresAt?: Date;
  public userEmail?: string;

  readonly LOGIN_URL = environment.authEndpoint;
  readonly STORAGE_KEY = "ADMIN_AUTH_DATA";

  login(email: string, password: string){

    console.debug("Attempting Authentication with ", email);
    console.debug("POSTING to: ", this.LOGIN_URL);

    const postLogin = async () => {
      try {
        const response = await axios.post(this.LOGIN_URL, {
          email: email,
          password: password,
        })
        let role_list = this.getRolesFromJWT(response.data);
        if (!role_list.includes("ROLE_ADMIN")){
          return null;
        }
        this.handleAuthenticationSuccess(response.data, email);
        return response;
      } catch (error){
        console.debug(error);
        throw error;
      }
    }
    return postLogin();
  }

  getRolesFromJWT(res: AuthResponse){
    let jwt = res.token;
    jwt = jwt.replace("Bearer ", "");
    let decoded:any = jwt_decode(jwt);
    const authorities = decoded["Authorities"];
    return authorities;
  }

  handleAuthenticationSuccess(res: AuthResponse, userEmail: string){

    //TODO later to match the user portal implementation
    this.token = res.token;
    this.expiresAt = new Date(res.expiresAt);
    this.userId = !!this.token ? res.userId : undefined;
    this.userEmail = !!this.token ? userEmail : undefined;

    const storeToken = async(value : AuthResponse) => {
      try{
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(this.STORAGE_KEY, jsonValue);
      }catch (e){
        console.debug(e);
      }
    }
    storeToken(res).then(() => {
      return;
    });
  }
}

