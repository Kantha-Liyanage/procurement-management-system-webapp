import { Component, OnInit } from '@angular/core';
import { Category, CategoryTreeItem } from '../models';
import { CategoryService } from '../services/category.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalDialogComponent } from '../modal-dialog/modal-dialog.component';
import { Subscription } from 'rxjs';
import { UtilService } from '../services/util.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  category : Category;
  categoryiesTreeItems : Array<CategoryTreeItem>;

  //Subscriptions
  getCategoriesAllSubscription : Subscription;

  constructor(private categoryService : CategoryService,
              private utilService : UtilService,
              private modalService : NgbModal) { 
    this.category = new Category();
    this.getHeaders();
  }

  ngOnInit() {
  }

  ngOnDestroy(){
    if(this.getCategoriesAllSubscription != undefined){
      this.getCategoriesAllSubscription.unsubscribe();
    }
  }

  tryCreateCategory(){
    //Check for already created Categories
    let sub = this.categoryService.getCategory(this.category.name).subscribe(data => {
      sub.unsubscribe();
      if(data == null) {
        this.createCategory();
      } 
      else {
        this.showModalDialog("Error", "Category already exists!");
      }
    });
  }

  createCategory(){
    this.categoryService.create(this.category).then(
      (res)=>{
        this.category = new Category();
        this.showModalDialog("Information", "Category created successfully!");
      }
    ).catch(
      (e)=>{
        this.showModalDialog("Error", e['message']);
      }
    );
  }

  getHeaders(){
    this.getCategoriesAllSubscription = this.categoryService.getCategoriesAll().subscribe(data => {
      let headers = <any>Object.keys(data).map(key => <Category>data[key]);
      this.categoryiesTreeItems = this.utilService.getCategoryTree(headers);
    });
  }

  showModalDialog(title:string, errorMessage:string) {
    let modalRef = this.modalService.open(ModalDialogComponent, { centered: true });
    modalRef.componentInstance.infoTitle = title;
    modalRef.componentInstance.infoMessage = errorMessage;
  }
}