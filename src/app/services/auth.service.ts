import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  singInAPIUrl : string = environment.apiBaseURL + "/Auth/Authenticate";
  public static accessToken : string;
  public static username : string;

  constructor(private http: HttpClient) { }

  signIn(username: string, password: string) {
    let url = this.singInAPIUrl + '?username=' + username + '&password=' + password; 
    return this.http.get(url);  
  }

  setLoggedOnUser(username : string, token : string){
    localStorage.setItem("username",username);
    localStorage.setItem("isLoggedIn","X");
    localStorage.setItem("token",token);
    AuthService.accessToken = token;
    AuthService.username = username;
  }

  isLoggedIn() : boolean{
    try{
      let can = localStorage.getItem("isLoggedIn").startsWith('X');
      AuthService.accessToken = localStorage.getItem("token");
      AuthService.username = localStorage.getItem("username");
      return can;
    }
    catch(er){
      return false;
    }
  }

  signOut(){
    localStorage.setItem("username","");
    localStorage.setItem("isLoggedIn","");
    localStorage.setItem("token","");
  }
}
