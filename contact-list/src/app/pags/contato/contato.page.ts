import { Component } from '@angular/core';
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
  selector: 'app-contato',
  templateUrl: 'contato.page.html',
  styleUrls: ['contato.page.scss'],
})
export class ContatoPage {
  private _storage: Storage | null = null;
  contact: Contact = {};

  editContact: Contact = {};

  isEdit: string = "";
  isReadonly: boolean = true;


  error: Contact = {};

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async validateInput() {
    const error: Contact = {};
    if (!this.editContact.name) {
      error.name = 'Digite um nome.';
    }

    if (!this.editContact.email) {
      error.email = 'Digite o email.';
    }

    if (!this.editContact.phone) {
      error.phone = 'Digite o telefone.';
    }

    this.error = error;
    if (!error.name && !error.phone && !error.email) {
      this.contactSave();
    }
  }

  async contactSave() {
    const getStorage = (await this._storage!.get('lista')) ?? '[]';
    let tempLista = [];

    tempLista = JSON.parse(getStorage);

    const lastID = tempLista.length
      ? tempLista[tempLista.length - 1].ID + 1
      : 1;

    const newContact = {
      ID: lastID,
      ...this.editContact,
    };

    tempLista.push(newContact);

    const listaStr = JSON.stringify(tempLista);

    await this._storage?.set('lista', listaStr);

    this.editContact = {};

    return;
  }
}
