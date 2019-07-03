import { Component, OnInit } from '@angular/core';
import { SalesInvoice } from '../models';
import { ModalDialogComponent } from '../modal-dialog/modal-dialog.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {

  sale : SalesInvoice;

  constructor(private modalService:NgbModal) { 
    this.sale = new SalesInvoice();
  }

  ngOnInit() {
  }

  addNewItem(){
    this.sale.addNewItem();
  }

  deleteItem(no:number){
    let modalRef = this.modalService.open(ModalDialogComponent, { centered: true });
    modalRef.componentInstance.infoTitle = "Confirm";
    modalRef.componentInstance.infoMessage = "Are you sure want to delete item: " + no + "?";
    modalRef.componentInstance.okButton = true;

    modalRef.result.then(
      (result) => {
        this.sale.deleteItem(no);
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
