import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContatoNovoPage } from './novo-contato.page';

describe('ContatoNovoPage', () => {
  let component: ContatoNovoPage;
  let fixture: ComponentFixture<ContatoNovoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ContatoNovoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
