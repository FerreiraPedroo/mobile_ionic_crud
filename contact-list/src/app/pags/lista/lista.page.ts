import { Component } from '@angular/core';
import { User } from "../../../models/user.model";
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Storage } from '@ionic/storage-angular';

interface Contact {
  ID?: number
  name?: string
  phone?: string
  email?: string
  address?: string
  birthDate?: string
}

@Component({
  selector: 'app-lista',
  templateUrl: 'lista.page.html',
  styleUrls: ['lista.page.scss'],
})
export class ListaPage {
  private _storage: Storage | null = null;
  lista: Contact[] = [];
  saveContact: Contact = {}

  selectedItem: number = 0

  constructor(private storage: Storage) {
    this.init()
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;

    const startLista = await this._storage.get("lista");
    const startListaJSON = JSON.parse(startLista);
    this.lista = startListaJSON;
  }

  async contactSave(modal: any) {

    const getStorage = await this._storage?.get("lista") ?? "[]";
    let tempLista = [];

    tempLista = JSON.parse(getStorage);

    const lastID = tempLista.length ? tempLista[tempLista.length - 1].ID + 1 : 1;

    const newContact = {
      ID: lastID,
      ...this.saveContact
    }

    tempLista.push(newContact);

    const listaStr = JSON.stringify(tempLista);

    await this._storage?.set("lista", listaStr);

    this.saveContact = {};

    this.init()

    modal.dismiss()

    return;

  }


  selectItemClass(contact: any) {
    return contact.ID == this.selectedItem
  }
  selectItem(ID: any) {
    // const selected = document.getElementById(ID)
    // selected!.setAttribute("style", "background-color: blue !important;")

    // if (this.selectedItem) {
    //   const beforeSelected = document.getElementById(String(this.selectedItem));
    //   beforeSelected!.removeAttribute("style")
    // }

    this.selectedItem = ID;
  }
















}
