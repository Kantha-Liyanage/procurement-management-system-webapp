import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Item, Category, Supplier, CategoryTreeItem } from '../models';
import { ItemService } from '../services/item.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalDialogComponent } from '../modal-dialog/modal-dialog.component';
import { SupplierService } from '../services/supplier.service';
import { CategoryService } from '../services/category.service';
import { Subscription } from 'rxjs';
import { UtilService } from '../services/util.service';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.css']
})
export class NewItemComponent implements OnInit {
  
  item : Item;
  categoryiesTreeItems : Array<CategoryTreeItem>;
  suppliers : Array<Supplier>;

  //Subscriptions
  getCategoriesAllSubscription : Subscription;
  getSuppliersAllSubscription : Subscription;

  constructor(private location:Location,
              private modalService:NgbModal,
              private itemService:ItemService,
              private utilService:UtilService,
              private supplierService:SupplierService,
              private categoryService:CategoryService) { 
    this.item = new Item();
    this.getCategories();
    this.getSuppliers();
  }

  ngOnInit() {
  }

  ngOnDestroy(){
    if(this.getCategoriesAllSubscription != undefined){
      this.getCategoriesAllSubscription.unsubscribe();
    }

    if(this.getSuppliersAllSubscription != undefined){
      this.getSuppliersAllSubscription.unsubscribe();
    }
  }

  getSuppliers(){
    this.suppliers = [];
    this.getSuppliersAllSubscription = this.supplierService.getSuppliersAll().subscribe(data => {
      this.suppliers = <any>Object.keys(data).map(key => <Supplier>data[key]);
    });
  }

  getCategories(){
    this.getCategoriesAllSubscription = this.categoryService.getCategoriesAll().subscribe(data => {
      let headers = <any>Object.keys(data).map(key => <Category>data[key]);
      this.categoryiesTreeItems = this.utilService.getCategoryTree(headers);
    });
  }

  tryCreateItem(){
    //Check for already created Items
    let sub = this.itemService.getItem(this.item.code).subscribe(data => {
      sub.unsubscribe();
      if(data == null) {
        this.createItem();
      } 
      else {
        this.showModalDialog("Error", "Item already exists!");
      }
    });
  }  

  createItem(){
    this.itemService.create(this.item).then(
      (res)=>{
        this.item = new Item();
        this.showModalDialog("Information", "Item created successfully!");
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
