import { Injectable } from '@angular/core';
import { Item } from '../models';
import { UtilService } from './util.service';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private utilService : UtilService,
              private fbdb : AngularFireDatabase) { }

  create(item:Item){
    item.createdBy   = this.utilService.getLoggedOnEmail();
    item.createdTime = new Date().toLocaleString();
    let newItem = this.fbdb.object('/Items/'+item.code);
    return newItem.set(item);   
  }

  getItem(code:string){
    return this.fbdb.object('/Items/'+ code).valueChanges();
  }
}
