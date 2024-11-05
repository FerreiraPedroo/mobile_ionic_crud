import { Component } from '@angular/core';
import { User } from '../../../models/user.model';
import {
  LoadingController,
  NavController,
  ToastController,
} from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Storage } from '@ionic/storage-angular';

interface Contact {
  ID?: number;
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
  birthDate?: string;
}

@Component({
  selector: 'app-contato-novo',
  templateUrl: 'novo-contato.page.html',
  styleUrls: ['novo-contato.page.scss'],
})
export class ContatoNovoPage {
  private _storage: Storage | null = null;
  saveContact: Contact = {};

  constructor(private storage: Storage) {}

  async contactSave() {
    const getStorage = (await this.storage.get('lista')) ?? '[]';
    let tempLista = [];

    tempLista = JSON.parse(getStorage);

    const lastID = tempLista.length
      ? tempLista[tempLista.length - 1].ID + 1
      : 1;

    const newContact = {
      ID: lastID,
      ...this.saveContact,
    };

    tempLista.push(newContact);

    const listaStr = JSON.stringify(tempLista);

    await this._storage?.set('lista', listaStr);

    this.saveContact = {};

    return;
  }
}