import { Injectable } from '@angular/core';
import { Supplier } from '../models';
import { UtilService } from './util.service';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  constructor(private utilService : UtilService,
              private fbdb : AngularFireDatabase) { }

  create(supplier:Supplier){
    supplier.createdBy   = this.utilService.getLoggedOnEmail();
    supplier.createdTime = new Date().toLocaleString();
    let newSupplier = this.fbdb.object('/Suppliers/'+supplier.code);
    return newSupplier.set(supplier);   
  }

  getSupplier(code:string){
    return this.fbdb.object('/Suppliers/'+ code).valueChanges();
  }

  getSuppliersAll(){
    return this.fbdb.object('/Suppliers').valueChanges();
  }
}
