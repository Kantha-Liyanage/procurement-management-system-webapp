import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from  '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ModalDialogComponent } from './modal-dialog/modal-dialog.component';
import { SupplierComponent } from './supplier/supplier.component';
import { NewSupplierComponent } from './new-supplier/new-supplier.component';
import { CategoryComponent } from './category/category.component';
import { ItemComponent } from './item/item.component';
import { NewItemComponent } from './new-item/new-item.component';
import { EditSupplierComponent } from './edit-supplier/edit-supplier.component';
import { EditItemComponent } from './edit-item/edit-item.component';
import { GoodsReceiverComponent } from './goods-receiver/goods-receiver.component';
import { SalesComponent } from './sales/sales.component';
import { StockReportComponent } from './stock-report/stock-report.component';

@NgModule({
  declarations: [
    AppComponent,
    ModalDialogComponent,
    SupplierComponent,
    NewSupplierComponent,
    CategoryComponent,
    ItemComponent,
    NewItemComponent,
    EditSupplierComponent,
    EditItemComponent,
    GoodsReceiverComponent,
    SalesComponent,
    StockReportComponent,
    ModalDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgbModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase, 'angular-auth-firebase'),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AppRoutingModule
  ],
  providers: [
    CookieService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ModalDialogComponent
  ]
})
export class AppModule { }
