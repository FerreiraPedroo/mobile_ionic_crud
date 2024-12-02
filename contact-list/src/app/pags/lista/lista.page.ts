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
    this._storage = await this.storage.create();
    const startLista = await this._storage.get('lista');
    this.lista = JSON.parse(startLista);
  }

  async contactSave(modal: any) {
    const getStorage = (await this._storage?.get('lista')) ?? '[]';
    const tempLista = JSON.parse(getStorage);
    const lastID = tempLista.at(-1);

    tempLista.push({
      ID: lastID ? lastID.ID + 1 : 1,
      ...this.saveContact,
    });

    await this._storage?.set('lista', JSON.stringify(tempLista));

    this.saveContact = {};
    this.init();
    modal.dismiss();

  }

  selectItem(ID: any) {
    this.router.navigate([`contact/${ID}`]);
  }
}
