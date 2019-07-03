import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CategoryTreeItem, Category } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private cookies : CookieService) { }

  getLoggedOnEmail(): string {
    return this.cookies.get("email").toLowerCase()
  }

  getCategoryTree(headers : Array<Category>) : Array<CategoryTreeItem>{
    //List
    let categoryiesTreeItems = new Array<CategoryTreeItem>();
    
    headers.map(category => {
      if(category.header == "Root"){
        let item = new CategoryTreeItem();
        item.name = category.name;
        item.description = category.header + " ↳ " + category.name;
        categoryiesTreeItems.push(item);

        this.getChildCategories(headers, categoryiesTreeItems, category, item.description);
      }
    });

    return categoryiesTreeItems;
  }

  getChildCategories(headers : Array<Category>, returnList : Array<CategoryTreeItem>, headerCategory:Category, description: string){
    headers.map(category => {
      if(category.header == headerCategory.name){
        let item = new CategoryTreeItem();
        item.name = category.name;
        item.description = description + " ↳ " + category.name;
        returnList.push(item);

        this.getChildCategories(headers, returnList, category, item.description);
      }
    });
  }

}
