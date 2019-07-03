import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Supplier } from '../models';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SupplierService } from '../services/supplier.service';
import { ModalDialogComponent } from '../modal-dialog/modal-dialog.component';

@Component({
  selector: 'app-new-supplier',
  templateUrl: './new-supplier.component.html',
  styleUrls: ['./new-supplier.component.css']
})
export class NewSupplierComponent implements OnInit {

  supplier : Supplier;

  constructor(private location:Location,
              private modalService:NgbModal,
              private supplierService:SupplierService) { 
    this.supplier = new Supplier();
  }

  ngOnInit() {
  }

  tryCreateSupplier(){
    //Check for already created Suppliers
    let sub = this.supplierService.getSupplier(this.supplier.code).subscribe(data => {
      sub.unsubscribe();
      if(data == null) {
        this.createSupplier();
      } 
      else {
        this.showModalDialog("Error", "Supplier already exists!");
      }
    });
  }

  createSupplier(){
    this.supplierService.create(this.supplier).then(
      (res)=>{
        this.supplier = new Supplier();
        this.showModalDialog("Information", "Supplier created successfully!");
      }
    ).catch(
      (e)=>{
        this.showModalDialog("Error", e['message']);
      }
    );
  }

  goBack(){
    let modalRef = this.modalService.open(ModalDialogComponent, { centered: true });
    modalRef.componentInstance.infoTitle = "Confirm";
    modalRef.componentInstance.infoMessage = "Are you sure want to cancel changes?";
    modalRef.componentInstance.okButton = true;

    modalRef.result.then(
      (result) => {
        this.location.back();
      }
    ).catch(
      (error) => {
        //Do nothing
      }
    );
  }

  showModalDialog(title:string, errorMessage:string) {
    let modalRef = this.modalService.open(ModalDialogComponent, { centered: true });
    modalRef.componentInstance.infoTitle = title;
    modalRef.componentInstance.infoMessage = errorMessage;
  }
}
