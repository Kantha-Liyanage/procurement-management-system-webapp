import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalDialogComponent } from 'src/app/modal-dialog/modal-dialog.component';
import { PurchReq, PurchReqItem } from 'src/app/models/purch-req';
import { Site } from 'src/app/models/master';
import { MasterDataService } from 'src/app/services/master.data.service';
import { SiteView } from 'src/app/utils/site-view';
import { MaterialPickerComponent } from '../material-picker/material-picker.component';
import { PurchReqService } from 'src/app/services/purch-req.service';

@Component({
  selector: 'app-new-purch-req',
  templateUrl: './new-purch-req.component.html',
  styleUrls: ['./new-purch-req.component.css']
})
export class NewPurchReqComponent implements OnInit {

  //New Object
  newPurchReq : PurchReq;

  //Sites list
  mySites : Array<Site> = [];

  constructor(private masterDataService : MasterDataService,
              private purchReqService : PurchReqService,
              private modalService: NgbModal) {
    this.newPurchReq = new PurchReq();
  }

  ngOnInit() {
    //Get sites list
    this.getSites();
  }

  getSites(){
    this.masterDataService.getSites().subscribe(
      (res)=>{
        let objArray = <Array<any>>res;
        objArray.forEach((val, index, array)=>{
          let site = new Site();
          site.site = val.site;
          site.name = val.name;
          this.mySites.push(site);
        });
      },
      (err)=>{
        debugger;
      }
    );
  }

  showMaterialPicker(itemNo : number){
    let materialPicker = this.modalService.open(MaterialPickerComponent, {centered: true, size: 'lg'});
    materialPicker.result.then(
      (selectedMaterial) => {
        if(selectedMaterial){
          let item = this.newPurchReq.getItem(itemNo);
          item.setItemMaterial(selectedMaterial);
        }
      }
    ).catch(
      (error) => {
        //Do nothing
      }
    );
  }

  deleteItem(no:number){
    let modalRef = this.showModalDialog("Confirm", "Are you sure want to delete item: " + no + "?");
    modalRef.componentInstance.okButton = true;

    modalRef.result.then(
      (result) => {
        debugger;
        this.newPurchReq.deleteItem(no);
      }
    ).catch(
      (error) => {
        //Do nothing
      }
    );
  }

  validate() : boolean{
    //Validations
    if(this.newPurchReq.id > 0){
      this.showModalDialog("Error", "Sorry! Purchase Requisition change is under construction.");
      return false;
    }

    if(this.newPurchReq.siteId == 0){
      this.showModalDialog("Error", "Please select the site.");
      return false;
    }

    for(var x=0;x<this.newPurchReq.items.length;x++){
      let item = this.newPurchReq.items[x];

      if(item.materialId == undefined || item.materialId == 0){
        this.showModalDialog("Error", "Material is not selected at item no: " + item.itemId);
        return false;
      }
      
      if(item.requiredQuantity == undefined || item.requiredQuantity <= 0){
        this.showModalDialog("Error", "Invalid Required Quantity at item no: " + item.itemId);
        return false;
      }

      if(item.requiredDate == undefined || item.requiredDate == ""){
        this.showModalDialog("Error", "Required Date is empty at item no: " + item.itemId);
        return false;
      }
    }
    
    let modalRef = this.showModalDialog("Confirm", "Are you sure want to save?");
    modalRef.componentInstance.okButton = true;
    modalRef.result.then(
      (result) => {
        this.invokePostAPI();
      }
    ).catch(
      (error) => {
        //Do nothing
      }
    );

    return true;
  }

  invokePostAPI(){
    this.purchReqService.post(this.newPurchReq).subscribe(
      (res)=>{
        let serverCopy = <PurchReq>res;
        //Copy server values
        this.newPurchReq.id = serverCopy.id;
        this.newPurchReq.overallStatus = serverCopy.overallStatus;

        //Item values
        serverCopy.items.forEach(item=>{
          this.newPurchReq.items.find(x=>x.itemId == item.itemId).status = item.status;
        });

        this.showModalDialog("Information", "Purchase Requisition No: " + this.newPurchReq.id + " created successfully!");
      },
      (err)=>{
        debugger;
      }
    );
  }

  showSite(){
    if(this.newPurchReq.siteId == 0){
      this.showModalDialog("Error","Please select a site from the list to show.");
      return;
    }

    this.masterDataService.getSite(this.newPurchReq.siteId).subscribe(
      (res)=>{
        this.showModalDialog(res["name"] + " - (" + res["id"] + ")", SiteView.getSiteHTML(res));
      },
      (err)=>{

      }
    );
  }

  showModalDialog(title:string, htmlContect:string) : NgbModalRef {
    let modalRef = this.modalService.open(ModalDialogComponent, { centered: true });
    modalRef.componentInstance.infoTitle = title;
    modalRef.componentInstance.infoMessage = htmlContect;
    return modalRef;
  }
}
