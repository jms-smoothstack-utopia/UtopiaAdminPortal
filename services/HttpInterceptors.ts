import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default class HttpInterceptors {

    static STORAGE_KEY = "ADMIN_AUTH_DATA"; 

    static intercept(){
        axios.interceptors.request.use(async function(request){
            const value = await AsyncStorage.getItem(HttpInterceptors.STORAGE_KEY);
            if (value) {
                const authObject = JSON.parse(value);
                const token = authObject.token;
                request.headers.Authorization = token;
                return request;
            }else{
                return request;
            }
        }, function(error){
            return Promise.reject(error);
        })
    }
}