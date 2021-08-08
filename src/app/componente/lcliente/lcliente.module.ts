import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LclientePageRoutingModule } from './lcliente-routing.module';

import { LclientePage } from './lcliente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LclientePageRoutingModule
  ],
  declarations: [LclientePage]
})
export class LclientePageModule {}
