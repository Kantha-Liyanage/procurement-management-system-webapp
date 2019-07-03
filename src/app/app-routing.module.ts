import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SupplierComponent } from './supplier/supplier.component';
import { NewSupplierComponent } from './new-supplier/new-supplier.component';
import { CategoryComponent } from './category/category.component';
import { EditSupplierComponent } from './edit-supplier/edit-supplier.component';
import { ItemComponent } from './item/item.component';
import { EditItemComponent } from './edit-item/edit-item.component';
import { NewItemComponent } from './new-item/new-item.component';
import { GoodsReceiverComponent } from './goods-receiver/goods-receiver.component';
import { SalesComponent } from './sales/sales.component';
import { StockReportComponent } from './stock-report/stock-report.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'supplier', component: SupplierComponent },
  { path: 'new-supplier', component: NewSupplierComponent },
  { path: 'edit-supplier', component: EditSupplierComponent },
  { path: 'item', component: ItemComponent },
  { path: 'new-item', component: NewItemComponent },
  { path: 'edit-item', component: EditItemComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'receive', component: GoodsReceiverComponent },
  { path: 'sales', component: SalesComponent },
  { path: 'stock-report', component: StockReportComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
