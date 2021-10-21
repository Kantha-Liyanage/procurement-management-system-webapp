import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PurchReq, PurchReqItem } from '../models/purch-req';
import { Utils } from '../utils/utils';

@Injectable({
  providedIn: 'root'
})
export class PurchReqService {

  constructor(private http: HttpClient) { }

  post(purchReq : PurchReq) {
    let url : string = environment.apiBaseURL + "/PurchaseRequisitions";
    
    //Copy
    let body = {
      SiteId : purchReq.siteId,
      Remarks : purchReq.remarks,
      items : []
    }

    //Copy items and dates fix
    purchReq.items.forEach(item=>{
      let i = {
        ItemId : item.itemId,
        MaterialId : item.materialId,
        RequiredQuantity : item.requiredQuantity,
        Remarks : item.remarks,
        RequiredDate : Utils.toDotNetDate(item.requiredDate)
      }
      body.items.push(i);
    });

    return this.http.post(url, body);
  }

  getOpen(){
    let url : string = environment.apiBaseURL + "/PurchaseRequisitions/GetOpenPurchaseRequisitions";
    return this.http.get(url);
  }

  get(id : number){
    let url : string = environment.apiBaseURL + "/PurchaseRequisitions/" + id;
    return this.http.get(url);
  }

  approve(pr : PurchReq, items :  Array<PurchReqItem>){
    let url : string = environment.apiBaseURL + "/PurchaseRequisitions/Approve";

    //Copy
    let body = {
      Id : pr.id,
      SiteId : pr.siteId,
      items : []
    }

    //Copy items and dates fix
    items.forEach(item=>{
      let i = {
        ItemId : item.itemId,
        ApprovedQuantity : item.approvedQuantity
      }
      body.items.push(i);
    });
    return this.http.put(url, body);
  }
}
