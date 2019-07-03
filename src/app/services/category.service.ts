import { Injectable } from '@angular/core';
import { Category } from '../models';
import { AngularFireDatabase } from 'angularfire2/database';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private fbdb : AngularFireDatabase,
              private utilService : UtilService) { }

  create(category:Category){
    category.createdBy   = this.utilService.getLoggedOnEmail();
    category.createdTime = new Date().toLocaleString();
    let newCategory = this.fbdb.object('/Categories/'+ category.name);
    return newCategory.set(category);   
  }

  getCategory(name:string){
    return this.fbdb.object('/Categories/'+ name).valueChanges();
  }

  getCategoriesAll(){
    return this.fbdb.object('/Categories').valueChanges();
  }
}
