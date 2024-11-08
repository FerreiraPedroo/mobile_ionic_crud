import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'registro',
    loadChildren: () =>
      import('./pags/registro/registro.module').then(
        (m) => m.RegistroPageModule
      ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pags/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'contact/:ID',
    loadChildren: () =>
      import('./pags/contato/contato.module').then(
        (m) => m.ContatoPageModule
      ),
  },
  {
    path: 'contato-novo',
    loadChildren: () =>
      import('./pags/contatoNovo/novo-contato.module').then(
        (m) => m.ContatoNovoPageModule
      ),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pags/lista/lista.module').then((m) => m.ListaPageModule),
  },
  {
    path: '',
    redirectTo: 'registro',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
