import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
  error: Contact = {};

  constructor(private storage: Storage, private router: Router) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async validateInput() {
    const error: Contact = {};
    if (!this.saveContact.name) {
      error.name = 'Digite um nome.';
    }

    if (!this.saveContact.email) {
      error.email = 'Digite o email.';
    }

    if (!this.saveContact.phone) {
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
      ...this.saveContact,
    };

    tempLista.push(newContact);

    const listaStr = JSON.stringify(tempLista);

    await this._storage?.set('lista', listaStr);

    this.saveContact = {};

    this.router.navigate([`home`]);

  }
}
