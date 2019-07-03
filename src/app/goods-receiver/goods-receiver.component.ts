import { Component, OnInit } from '@angular/core';
import { GoodsReceipt, Supplier } from '../models';
import { Subscription } from 'rxjs';
import { SupplierService } from '../services/supplier.service';
import { ModalDialogComponent } from '../modal-dialog/modal-dialog.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-goods-receiver',
  templateUrl: './goods-receiver.component.html',
  styleUrls: ['./goods-receiver.component.css']
})
export class GoodsReceiverComponent implements OnInit {

  goodsReceipt : GoodsReceipt;
  suppliers : Array<Supplier>;

  //Subscriptions
  getSuppliersAllSubscription : Subscription;

  constructor(private supplierService:SupplierService,
              private modalService:NgbModal) { 
    this.goodsReceipt = new GoodsReceipt();
    this.getSuppliers();
  }

  ngOnInit() {
  }

  ngOnDestroy(){
    if(this.getSuppliersAllSubscription != undefined){
      this.getSuppliersAllSubscription.unsubscribe();
    }
  }

  addNewItem(){
    this.goodsReceipt.addNewItem();
  }

  deleteItem(no:number){
    let modalRef = this.modalService.open(ModalDialogComponent, { centered: true });
    modalRef.componentInstance.infoTitle = "Confirm";
    modalRef.componentInstance.infoMessage = "Are you sure want to delete item: " + no + "?";
    modalRef.componentInstance.okButton = true;

    modalRef.result.then(
      (result) => {
        this.goodsReceipt.deleteItem(no);
      }
    ).catch(
      (error) => {
        //Do nothing
      }
    );
  }

  getSuppliers(){
    this.suppliers = [];
    this.getSuppliersAllSubscription = this.supplierService.getSuppliersAll().subscribe(data => {
      this.suppliers = <any>Object.keys(data).map(key => <Supplier>data[key]);
    });
  }

  showModalDialog(title:string, errorMessage:string) {
    let modalRef = this.modalService.open(ModalDialogComponent, { centered: true });
    modalRef.componentInstance.infoTitle = title;
    modalRef.componentInstance.infoMessage = errorMessage;
  }

}
