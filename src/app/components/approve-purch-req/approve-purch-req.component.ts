import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PurchReq } from 'src/app/models/purch-req';
import { PurchReqService } from 'src/app/services/purch-req.service';
import { Utils } from 'src/app/utils/utils';
import { ViewPurchReqComponent } from '../view-purch-req/view-purch-req.component';

@Component({
  selector: 'app-approve-purch-req',
  templateUrl: './approve-purch-req.component.html',
  styleUrls: ['./approve-purch-req.component.css']
})
export class ApprovePurchReqComponent implements OnInit {

  constructor(private purchReqService : PurchReqService,
              private modalService: NgbModal) { }

  purchReqs : Array<PurchReq> = new Array<PurchReq>();

  ngOnInit() {
    //Get my open PRs
    this.getOpenPurchReqs();
  }

  getOpenPurchReqs(){
    this.purchReqService.getOpen().subscribe(
      (res)=>{
        let objArray = <Array<any>>res;
        objArray.forEach(obj=>{
          let pr = new PurchReq();
          pr.id = obj.id;
          pr.siteId = obj.siteId;
          pr.siteName = obj.siteName;
          pr.createdBy = obj.createdBy;
          pr.createdDate = Utils.toDisplayDate(obj.createdDate);
          pr.totalValue = obj.totalValue;
          this.purchReqs.push(pr);
        });
      },
      (err)=>{
        debugger;
      }
    );
  }

  showPurchReq(purchReq : PurchReq){
    let purchReqView = this.modalService.open(ViewPurchReqComponent, {windowClass : "customModalClass"});
    purchReqView.componentInstance.purchReq = purchReq;
  }

}
