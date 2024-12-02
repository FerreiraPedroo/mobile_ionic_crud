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
    this._storage = await this.storage.create();
  }

  async validateInput() {
    const error: Contact = {};
    !this.saveContact.name ? (error.name = 'Digite um nome.') : null;
    !this.saveContact.email ? (error.email = 'Digite o email.') : null;
    !this.saveContact.phone ? (error.phone = 'Digite o telefone.') : null;

    this.error = error;
    if (!Object.entries(error).length) {
      this.contactSave();
    }
  }

  async contactSave() {
    const getStorage = (await this._storage!.get('lista')) ?? '[]';
    const tempLista = JSON.parse(getStorage);
    const lastID = tempLista.at(-1);

    tempLista.push({
      ID: lastID ? lastID.ID + 1 : 1,
      ...this.saveContact,
    });

    await this._storage?.set('lista', JSON.stringify(tempLista));

    this.saveContact = {};
    this.router.navigate([`home`]);
  }
}
