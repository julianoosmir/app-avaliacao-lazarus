import { Injectable } from "@angular/core";
import { URL_LOGIN } from '../constants/api';
import { HttpClient } from "@angular/common/http";
import { jwtDecode } from "jwt-decode";
import { CookieService } from 'ngx-cookie-service';
import { JwtDto } from "../interfaces/JwtDto";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  SESSION_ATTRIBUTE = 'authenticatedUser';

  public username: any;
  public senha: any;
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient,private cookieService: CookieService ) { }

  setToken(token: string) {
    this.cookieService.set( 'token', token );
  }
  getRole(){
    const token = this.cookieService.get('token');
    const decoded = jwtDecode(token);
    const jwt = decoded as JwtDto;
    return jwt.role.map(r=> r.name);
  }
  getToken(){
    const token = this.cookieService.get('token');
    return token;

  }

  logged(){
    this.loggedIn.next(true);
  }

  login(username: string, senha: string){
    return this.http
      .post(URL_LOGIN, {
        username: username,
        password: senha
      }, { responseType: "text" });
  }

  isUserLoggedIn() {
    let isLoggedIn = this.getToken();
    isLoggedIn === "" ? this.loggedIn.next(false) : this.loggedIn.next(true)
    return this.loggedIn.asObservable();
  }

  logout() {
    this.cookieService.delete('token');
  }

}
