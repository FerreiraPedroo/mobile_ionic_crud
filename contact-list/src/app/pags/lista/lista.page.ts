import { Component } from '@angular/core';
import { User } from "../../../models/user.model";
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Storage } from '@ionic/storage-angular';

interface Contact {
  ID: number
  name: string
  email: string
}

@Component({
  selector: 'app-lista',
  templateUrl: 'lista.page.html',
  styleUrls: ['lista.page.scss'],
})
export class ListaPage {
  lista: Contact[] = [];
  private _storage: Storage | null = null;
  modalPresentingElement: any = null;

  constructor(private storage: Storage) {
    this.init()
    this.modalPresentingElement = document.querySelector('.ion-page');
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;

    const startLista = await this._storage.get("lista");
    const startListaJSON = JSON.parse(startLista);
    this.lista = startListaJSON;
  }

  async set(name: string, phone: number, email: string) {
    const getStorage = await this._storage?.get("lista");
    let tempLista = [];

    if (!getStorage) {
      tempLista = [];
      this.lista = [];
      return;
    } else {
      tempLista = JSON.parse(getStorage);

      const lastID = tempLista[tempLista.length - 1].ID ?? 1;

      const newContact = {
        ID: lastID,
        name,
        phone,
        email
      }

      tempLista.push(newContact);

      const listaStr = JSON.stringify(tempLista);

      await this._storage?.set("lista", listaStr);

      return;
    }
  }

  selecionarItem(itemID: number) {
  }

  async canDismiss(data?: any, role?: string) {
    return role !== 'gesture';
  }
















  

}
