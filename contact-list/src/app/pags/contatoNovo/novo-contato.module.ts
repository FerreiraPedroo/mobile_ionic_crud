import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ContatoNovoPage } from './novo-contato.page';

import { ContatoNovoPageRoutingModule } from './novo-contato-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ContatoNovoPageRoutingModule],
  declarations: [ContatoNovoPage],
})
export class ContatoNovoPageModule {}
