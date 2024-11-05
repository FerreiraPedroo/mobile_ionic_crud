import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContatoNovoPage } from './novo-contato.page';

const routes: Routes = [
  {
    path: '',
    component: ContatoNovoPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContatoNovoPageRoutingModule {}
