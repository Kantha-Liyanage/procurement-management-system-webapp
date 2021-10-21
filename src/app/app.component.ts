import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalDialogComponent } from './modal-dialog/modal-dialog.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title : string = "Procurement Management System";
  username : string = "";
  password : string = "";

  isLoggedIn : boolean = false;

  constructor(private router : Router,
              private authService : AuthService,
              private modalService: NgbModal){}

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  getLoggedOnUsername(){
    return AuthService.username;
  }

  signIn(){
    this.authService.signIn(this.username, this.password).subscribe(
      (res)=>{
        this.authService.setLoggedOnUser(res["username"], res["token"]);
        this.isLoggedIn = true;
      },
      (err)=>{
        this.showModalDialog("Error", "Invalid login.");
      }
    );
  }

  signOut(){
    this.authService.signOut();
    this.isLoggedIn = false;
    this.password = "";
  }

  showModalDialog(title:string, errorMessage:string) {
    let modalRef = this.modalService.open(ModalDialogComponent, { centered: true });
    modalRef.componentInstance.infoTitle = title;
    modalRef.componentInstance.infoMessage = errorMessage;
  }
}
