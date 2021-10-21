import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApprovePurchReqComponent } from './components/approve-purch-req/approve-purch-req.component';
import { NewPurchReqComponent } from './components/new-purch-req/new-purch-req.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'new-pr', component: NewPurchReqComponent },
  { path: 'approve-prs', component: ApprovePurchReqComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
