import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import {LoadingController, ToastController} from '@ionic/angular';
import { Observable,of} from 'rxjs';
import {switchMap} from 'rxjs/operators';

@Injectable()

export class AuthService
{
  user$: Observable<User>;
  user: User;

  constructor
  (
    private afs: AngularFirestore,
    private afauth: AngularFireAuth,
    private router: Router,
    private LoadingCrtl: LoadingController,
    private toastr: ToastController

  )
  {
    this.user$ = this.afauth.authState
    .pipe(
      switchMap(user => {

        if(user)
        {
          return this.afs.doc<User>(`user/${user.uid}`).valueChanges();
        }else{
          return of(null);
        }
      })
    )
  }

  async resetPassword(email): Promise<void> {


    const loading = await this.LoadingCrtl.create({
      message: 'Enviando...',
      spinner:'crescent',
      showBackdrop: true
    });
    loading.present();
    this.afauth.sendPasswordResetEmail(email);
    this.toast('Verifique su Corrreo','warnig')
    .then(()=>{
      loading.dismiss();
      this.router.navigate(['/login']);
    })
  }


  async signIn(email, password)
  {
    const loading = await this.LoadingCrtl.create({
      message: 'Autenticando...',
      spinner:'crescent',
      showBackdrop: true
    });
    loading.present();
    this.afauth.setPersistence(firebase.default.auth.Auth.Persistence.LOCAL)
    .then(()=>{
      this.afauth.signInWithEmailAndPassword(email, password)
      .then((data)=>
      {
        if(!data.user.emailVerified){
          loading.dismiss();
          this.toast('Verifique su Corrreo','warnig');
          this.afauth.signOut();
        }else{
          loading.dismiss();
          this.router.navigate(['/home']);
        }
      })
      .catch(error =>{
        loading.dismiss();
        this.toast(error.message, 'danger');
      })
    })
    .catch(error=>{
      loading.dismiss();
      this.toast(error.message, 'danger')
    });
  }

  async signOut(){
    const loading = await this.LoadingCrtl.create({
      spinner: 'crescent',
      showBackdrop: true
    });
    loading.present();
    this.afauth.signOut()
    .then(()=>{
      loading.dismiss();
      this.router.navigate(['/login']);
    })
  }

  async toast(message, status)
  {
    const toast = await this.toastr.create({
      message: message,
      color: status,
      position: 'top',
      duration: 2000
    });
    toast.present();
  }
}
