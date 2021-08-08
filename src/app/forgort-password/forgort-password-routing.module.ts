import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForgortPasswordPage } from './forgort-password.page';

const routes: Routes = [
  {
    path: '',
    component: ForgortPasswordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForgortPasswordPageRoutingModule {}
