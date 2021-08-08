import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VproductoPageRoutingModule } from './vproducto-routing.module';

import { VproductoPage } from './vproducto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VproductoPageRoutingModule
  ],
  declarations: [VproductoPage]
})
export class VproductoPageModule {}
