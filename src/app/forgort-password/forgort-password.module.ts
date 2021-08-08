import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForgortPasswordPageRoutingModule } from './forgort-password-routing.module';

import { ForgortPasswordPage } from './forgort-password.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForgortPasswordPageRoutingModule
  ],
  declarations: [ForgortPasswordPage]
})
export class ForgortPasswordPageModule {}
