import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgort-password',
  templateUrl: './forgort-password.page.html',
  styleUrls: ['./forgort-password.page.scss'],
})
export class ForgortPasswordPage implements OnInit {

  constructor
  (
    private auth: AuthService,
    private router: Router,
    public toastr: ToastController,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
  }

  async forgortPassword(email)
  {
    const loading= await this.loadingCtrl.create({
      message: 'Enviando..',
      spinner: 'crescent',
      showBackdrop: true
    });
    loading.present();
    this.auth.resetPassword(email.value)
    .then(()=>{
      loading.dismiss();
      this.toast('Envio Completado','success');
      this.router.navigate(['/login']);
    })
    .catch(error=>{
      loading.dismiss();
      this.toast(error.message,'danger');
    })
  }

  async toast(message, status){
    const toast= await this.toastr.create({
      // eslint-disable-next-line object-shorthand
      message: message,
      color: status,
      position: 'top',
      duration: 2000
    });
    toast.present();
  }

}
