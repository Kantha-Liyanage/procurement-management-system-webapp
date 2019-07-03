import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
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
  
  title : string = "Dreams Hardware";
  isLoggedIn : boolean = false;
  loggedOnEmail : string = "";

  constructor(private cookies : CookieService,
              private router : Router,
              private authService : AuthService,
              private modalService: NgbModal){}

  ngOnInit() {
    this.isLoggedIn = this.cookies.get("isLoggedIn").startsWith('X');
  }

  signInWithGoogle(){
    this.authService.signInWithGoogle().then(async res => {
      debugger;
      this.authService.checkUserAllowed().subscribe(
        (jsonSnapshot)=>{
          this.isLoggedIn = true;
          this.cookies.set("isLoggedIn", "X");
          this.cookies.set("email", res.user.email);
          this.loggedOnEmail = res.user.email;
        },
        (error)=>{
          this.showModalDialog("Error", "Email: " + res.user.email + " is not a valid account !");
        }
      );
    },
    error=>{
      this.isLoggedIn = false;
      this.cookies.deleteAll();
      this.showModalDialog("Error", error['message']);
    });
  }

  signOut(){
    let modalRef = this.modalService.open(ModalDialogComponent, { centered: true });
    modalRef.componentInstance.infoTitle = "Logout";
    modalRef.componentInstance.infoMessage = "Are you sure want to logout?";
    modalRef.componentInstance.okButton = true;

    modalRef.result.then(
      (result) => {
        this.isLoggedIn = false;
        this.cookies.deleteAll();
        this.router.navigateByUrl('/');
      }
    ).catch(
      (error) => {
        //Do nothing
      }
    );
  }

  showModalDialog(title:string, errorMessage:string) {
    let modalRef = this.modalService.open(ModalDialogComponent, { centered: true });
    modalRef.componentInstance.infoTitle = title;
    modalRef.componentInstance.infoMessage = errorMessage;
  }
}
