import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private firebaseAuth: AngularFireAuth,
              private fbdb: AngularFireDatabase,
              private cookies : CookieService) { }

  signInWithGoogle() {
    let provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    return this.firebaseAuth.auth.signInWithPopup(provider);
  }

  checkUserAllowed(){
    return this.fbdb.list('/Viewers').valueChanges();
  }

  isLoggedIn() : boolean{
    let can = this.cookies.get("isLoggedIn").startsWith('X');
    return can;
  }
}
