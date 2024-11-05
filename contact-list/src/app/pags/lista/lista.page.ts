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
  selector: 'app-lista',
  templateUrl: 'lista.page.html',
  styleUrls: ['lista.page.scss'],
})
export class ListaPage {
  private _storage: Storage | null = null;
  lista: Contact[] = [];
  saveContact: Contact = {};

  constructor(private storage: Storage, private router: Router) {}

  ionViewWillEnter() {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;

    const startLista = await this._storage.get('lista');
    const startListaJSON = JSON.parse(startLista);
    this.lista = startListaJSON;
  }

  async contactSave(modal: any) {
    const getStorage = (await this._storage?.get('lista')) ?? '[]';
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

    this.init();

    modal.dismiss();

    return;
  }

  selectItem(ID: any) {
    this.router.navigate([`contact/${ID}`]);
  }
}
