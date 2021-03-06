/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable quote-props */
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';


import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  name: string;
  email: string;
  phone: string;
  password: string;
  constructor(
    private afs: AngularFirestore,
    private afauth: AngularFireAuth,
    private router: Router,
    private loadingCtrl: LoadingController,
    private toastr: ToastController
  ) { }

  ngOnInit() {
  }

  async register(){
    if(this.name && this.email && this.phone && this.password){
      const loading = await this.loadingCtrl.create({
        message: 'procesando..',
        spinner: 'crescent',
        showBackdrop: true
      });
      loading.present();

      this.afauth.createUserWithEmailAndPassword(this.email, this.password)
      .then((data)=>{
        data.user.sendEmailVerification();
        this.afs.collection('user').doc(data.user.uid).set({
          'userId': data.user.uid,
          'userName': this.name,
          'userEmail': this.email,
          'userPhone': this.phone,
          'createdAt': Date.now()
        })
        .then(()=>{
          loading.dismiss();
          this.toast('Registro Completo Revisa Correo Electronico','success');
          this.router.navigate(['/login']);
        })
        // eslint-disable-next-line @typescript-eslint/no-shadow
        .catch(error=>{
          loading.dismiss();
          console.log(error);
        })
      })
      .catch(error =>{
        loading.dismiss();
        this.toast(error.message, 'danger');
      })
    }else{
      this.toast('Complete los Campos', 'warnig');
    }
}
 async toast(message, status){
const toast = await this.toastr.create({
  message: message,
  color: status,
  position: 'top',
  duration: 2000
});
toast.present();
 }

}
