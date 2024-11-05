import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  isEdit: string = 'none';
  isReadonly: boolean = true;

  error: Contact = {};

  constructor(private storage: Storage, private route: ActivatedRoute, private router: Router) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    const getStorage = await this.storage.get('lista');

    const tempLista = JSON.parse(getStorage);

    const contactID = Number(this.route.snapshot.paramMap.get('ID'));

    const contactInfo = tempLista.find((cont: Contact) => cont.ID == contactID);

    this.contact = contactInfo;
    this.editContact = contactInfo;
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
      this.contactUpdate();
    }
  }

  async contactUpdate() {
    const getStorage = (await this._storage!.get('lista')) ?? '[]';
    let tempLista = [];

    tempLista = JSON.parse(getStorage);

    const updateContact = {
      ...this.contact,
      ...this.editContact,
    };

    const contactUpdateInfo = tempLista.map((cont: Contact) => {
      if (cont.ID == updateContact.ID) {
        return updateContact
      }
      return cont;
    });

    const listaStr = JSON.stringify(contactUpdateInfo);

    await this._storage?.set('lista', listaStr);

    this.contact = {...updateContact};
    this.editContact = {...updateContact};

    this.router.navigate([`home`]);
  }

  changeEdit() {
    if (this.isReadonly) {
      this.isEdit = '';
      this.isReadonly = false;
    } else {
      this.isEdit = 'none';
      this.isReadonly = true;
    }
  }
}
