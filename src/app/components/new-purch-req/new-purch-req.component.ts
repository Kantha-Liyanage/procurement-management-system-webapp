import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalDialogComponent } from 'src/app/modal-dialog/modal-dialog.component';
import { PurchReq } from 'src/app/models/purch-req';
import { Site } from 'src/app/models/site';
import { SiteService } from 'src/app/services/site.service';
import { SiteView } from 'src/app/utils/site-view';

@Component({
  selector: 'app-new-purch-req',
  templateUrl: './new-purch-req.component.html',
  styleUrls: ['./new-purch-req.component.css']
})
export class NewPurchReqComponent implements OnInit {

  //New Object
  newPurchReq : PurchReq = new PurchReq();

  //Sites list
  mySites : Array<Site> = [];

  constructor(private siteService : SiteService,
              private modalService: NgbModal) { }

  ngOnInit() {
    //Get list items
    this.siteService.getSites().subscribe(
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

  addNewItem(){

  }

  save(){

  }

  showSite(){
    if(this.newPurchReq.siteId == 0){
      this.showModalDialog("Error","Please select a site from the list to show.");
      return;
    }

    this.siteService.getSite(this.newPurchReq.siteId).subscribe(
      (res)=>{
        this.showModalDialog(res["name"] + " - (" + res["id"] + ")", SiteView.getSiteHTML(res));
      },
      (err)=>{

      }
    );
  }

  showModalDialog(title:string, htmlContect:string) {
    let modalRef = this.modalService.open(ModalDialogComponent, { centered: true });
    modalRef.componentInstance.infoTitle = title;
    modalRef.componentInstance.infoMessage = htmlContect;
  }
}
