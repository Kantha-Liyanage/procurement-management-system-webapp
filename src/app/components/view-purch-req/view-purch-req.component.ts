import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalDialogComponent } from 'src/app/modal-dialog/modal-dialog.component';
import { PurchReq, PurchReqItem } from 'src/app/models/purch-req';
import { PurchReqService } from 'src/app/services/purch-req.service';
import { Utils } from 'src/app/utils/utils';

@Component({
  selector: 'app-view-purch-req',
  templateUrl: './view-purch-req.component.html',
  styleUrls: ['./view-purch-req.component.css']
})
export class ViewPurchReqComponent implements OnInit {

  purchReq : PurchReq;
  grandTotal : number = 0;

  constructor(private activeModal: NgbActiveModal,
              private purchReqService : PurchReqService,
              private modalService: NgbModal) { }

  ngOnInit() {
    //Get PR
    this.getPurchReq();
  }

  getPurchReq(){
    debugger;
    this.purchReqService.get(this.purchReq.id).subscribe(
      (res)=>{
        this.purchReq.createdBy = res["createdBy"];
        this.purchReq.createdDate = Utils.toDisplayDate(res["createdDate"]);
        this.purchReq.remarks = res["remarks"];
        let objArray = <Array<any>>res["items"];
        this.grandTotal = 0;
        objArray.forEach(obj=>{
          let pr = new PurchReqItem();
          pr.itemId = obj.itemId;
          pr.materialId = obj.materialId;
          pr.materialName = obj.materialName;
          pr.materialCategory = obj.materialCategory;
          pr.uom = obj.uom;
          pr.requiredQuantity = obj.requiredQuantity;
          pr.approvedQuantity = obj.approvedQuantity;
          pr.requiredDate = Utils.toDisplayDate(obj.requiredDate);
          pr.priceUnit = obj.priceUnit;
          pr.unitPrice = obj.unitPrice;
          pr.subTotal = obj.subTotal;
          pr.remarks = obj.remarks;
          pr.status = obj.status;
          pr.supplierName = obj.supplierName;
          pr.leadTimeDays = obj.leadTimeDays;

          this.purchReq.items.push(pr);

          this.grandTotal += pr.unitPrice * pr.approvedQuantity;
        });
      },
      (err)=>{

      }
    );
  }

  updateItem(item : PurchReqItem){
    item.updateSubtotal();
    this.purchReq.updateGrandTotal();
  } 

  validate(){
    var total = 0;
    for(var x=0;x<this.purchReq.items.length;x++){
      if(this.purchReq.items[x].approvedQuantity != undefined && this.purchReq.items[x].approvedQuantity > 0 ){
        total++;
      }
    }
    if(total == 0){
      this.showModalDialog("Confirm","At leaset one Approved Quantity entry is required.");
      return false;
    }

    var modalRef = this.showModalDialog("Confirm","Are you sure you want to approve?");
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
    this.purchReqService.approve(this.purchReq, this.purchReq.items).subscribe(
      (res)=>{
        this.showModalDialog("Information",res["message"]);
        this.purchReq.overallStatus = "Close";
        this.closeModal();
      },
      (err)=>{
        this.showModalDialog("Error",err["error"]["message"]);
      }
    );
  }

  copyToApprovedQuantityAll(){
    this.grandTotal = 0;
    this.purchReq.items.forEach(item=>{
      item.approvedQuantity = item.requiredQuantity;
      this.grandTotal += item.unitPrice * item.approvedQuantity;
    });
  }

  closeModal() {
    this.activeModal.close('Modal Closed');
  }

  showModalDialog(title:string, htmlContect:string) : NgbModalRef {
    let modalRef = this.modalService.open(ModalDialogComponent, { centered: true });
    modalRef.componentInstance.infoTitle = title;
    modalRef.componentInstance.infoMessage = htmlContect;
    return modalRef;
  }

}
