import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SiteService {

  constructor(private http: HttpClient) { }

  getSites() {
    let url : string = environment.apiBaseURL + "/Sites/GetSites";
    return this.http.get(url);  
  }

  getSite(id : number) {
    let url : string = environment.apiBaseURL + "/Sites/" + id;
    return this.http.get(url);  
  }
}
