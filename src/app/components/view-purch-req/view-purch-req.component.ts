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
  items : Array<PurchReqItem> = new Array<PurchReqItem>();
  grandTotal : number = 0;

  constructor(private activeModal: NgbActiveModal,
              private purchReqService : PurchReqService,
              private modalService: NgbModal) { }

  ngOnInit() {
    //Get PR
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

          this.items.push(pr);

          this.grandTotal += pr.unitPrice * pr.approvedQuantity;
        });
      },
      (err)=>{

      }
    );
  }

  itemQuantityChanged(item : PurchReqItem){
    item.subTotal = item.approvedQuantity * item.unitPrice;
    this.updateGrandTotal();
  } 

  approve(){
    //Validate
    var total = 0;
    for(var x=0;x<this.items.length;x++){
      if(this.items[x].approvedQuantity != undefined && this.items[x].approvedQuantity > 0 ){
        total++;
      }
    }
    if(total == 0){
      this.showModalDialog("Confirm","At leaset one Approved Quantity entry is required.");
      return;
    }

    var modalRef = this.showModalDialog("Confirm","Are you sure you want to approve?");
    modalRef.componentInstance.okButton = true;
    modalRef.result.then(
      (result) => {
        this.purchReqService.approve(this.purchReq, this.items).subscribe(
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
    ).catch(
      (error) => {
        //Do nothing
      }
    );
  }

  copyToApprovedQuantityAll(){
    this.grandTotal = 0;
    this.items.forEach(item=>{
      item.approvedQuantity = item.requiredQuantity;
      this.grandTotal += item.unitPrice * item.approvedQuantity;
    });
  }

  updateGrandTotal(){
    this.grandTotal = 0;
    this.items.forEach(item=>{
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
