import { environment } from "../environment/environment";
import axios from "axios";

interface AuthResponse {
  userId: string;
  token: string;
  expiresAt: number;
}

interface AuthData {
  userId: string;
  token: string;
  expiresAt: Date;
  userEmail: string;
  tokenExpirationTimer: any;
}

export class AuthService {
  public userId?: string;
  public token?: string;
  public expiresAt?: Date;
  public userEmail?: string;

  readonly LOGIN_URL = environment.authEndpoint;

  login(email: string, password: string) {
    console.debug("Attempting Authentication with ", email);
    console.debug("With this password ", password);
    console.debug("POSTING to: ", this.LOGIN_URL);

    axios
      .post(this.LOGIN_URL, {
        email: email,
        password: password,
      })
      .then(function (response) {
        console.debug(response);
        this.handleAuthenticationSuccess(res.data, userEmail);
      })
      .catch(function (error) {
        console.debug(error);
      });

    // fetch(this.LOGIN_URL, {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     email: email,
    //     password: password,
    //   }),
    // })
    //   .then((response) => console.log(response))
    //   .catch((error) => {
    //     console.error(error);
    //   });
  }

  private handleAuthenticationSuccess(res: AuthResponse, userEmail: String) {
    console.debug("Authentication response", res);
  }
}
