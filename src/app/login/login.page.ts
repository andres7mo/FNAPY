
import { Component, OnInit } from '@angular/core';
/* import { Router } from '@angular/router'; */
import { ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
 email: string;
 password: string;

  constructor(
   public auth: AuthService,
    public toastr: ToastController,
    /* public router: Router, */
  ) { }

  ngOnInit() {
  }

  login(){
    if(this.email && this.password){
      this.auth.signIn(this.email, this.password);
     /*  this.router.navigate(['/home']); */
    }else{
      this.toast('Ingrese su correo y contraseña', 'warning');
    }
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
