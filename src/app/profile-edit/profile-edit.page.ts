import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.page.html',
  styleUrls: ['./profile-edit.page.scss'],
})
export class ProfileEditPage implements OnInit {
    userId: string;
    name: string;
    email: string;
    phone: string;

  constructor
  (
    private auth: AuthService,
    private afs: AngularFirestore,
    private loadingCtrl: LoadingController,
    private toastr: ToastController,
    private router: Router
  ) { }

  ngOnInit()
  {
    this.auth.user$.subscribe(user =>{
      this.userId = user.userId;
      this.name = user.userName;
      this.email = user.userEmail;
      this.phone = user.userPhone;
    })
  }

 async updateProfile()
  {
    const loading= await this.loadingCtrl.create({
      message: 'Actualizando..',
      spinner: 'crescent',
      showBackdrop: true
    });
    loading.present();
    this.afs.collection('user').doc(this.userId).set({
      'userName': this.name,
      'userEmail': this.email,
      'userPhone': this.phone,
      'editAt': Date.now()
    },{merge: true})
    .then(()=>{
      loading.dismiss();
      this.toast('Actualizacion Completa','success');
      this.router.navigate(['/profile']);
    })
    .catch(error=>{
      loading.dismiss();
      this.toast(error.message,'danger');
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
