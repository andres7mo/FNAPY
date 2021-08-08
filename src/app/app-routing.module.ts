import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'forgort-password',
    loadChildren: () => import('./forgort-password/forgort-password.module').then( m => m.ForgortPasswordPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
    ,canActivate: [AuthGuard]
  },
  {
    path: 'profile/edit',
    loadChildren: () => import('./profile-edit/profile-edit.module').then( m => m.ProfileEditPageModule)
    ,canActivate: [AuthGuard]
  },
  {
    path: 'change-password',
    loadChildren: () => import('./change-password/change-password.module').then( m => m.ChangePasswordPageModule)
    ,canActivate: [AuthGuard]
  },
  {
    path: 'galeria',
    loadChildren: () => import('./componente/galeria/galeria.module').then( m => m.GaleriaPageModule)
    ,canActivate: [AuthGuard]
  },
  {
    path: 'vproducto',
    loadChildren: () => import('./componente/vproducto/vproducto.module').then( m => m.VproductoPageModule)
    ,canActivate: [AuthGuard]
  },
  {
    path: 'cliente',
    loadChildren: () => import('./componente/cliente/cliente.module').then( m => m.ClientePageModule)
  },
  {
    path: 'lcliente',
    loadChildren: () => import('./componente/lcliente/lcliente.module').then( m => m.LclientePageModule)
    ,canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
