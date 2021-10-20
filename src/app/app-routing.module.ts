import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewPurchReqComponent } from './components/new-purch-req/new-purch-req.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'new-pr', component: NewPurchReqComponent },
  { path: 'browse-prs', component: NewPurchReqComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
