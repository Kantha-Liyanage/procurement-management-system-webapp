import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MasterDataService {

  constructor(private http: HttpClient) { }

  getSites() {
    let url : string = environment.apiBaseURL + "/Sites/GetSites";
    return this.http.get(url);  
  }

  getSite(id : number) {
    let url : string = environment.apiBaseURL + "/Sites/" + id;
    return this.http.get(url);  
  }

  getCategories(){
    let url : string = environment.apiBaseURL + "/MaterialCategories";
    return this.http.get(url); 
  }

  searchMaterialsByName(name : string){
    let url : string = environment.apiBaseURL + "/Materials/SearchMaterialsByName/" + name;
    return this.http.get(url); 
  }

  searchMaterialsByCategoryAndName(category : number, name : string){
    let url : string = environment.apiBaseURL + "/Materials/SearchMaterialsByCategoryAndName/?category=" + category + "&name=" + name;
    return this.http.get(url); 
  }
}
