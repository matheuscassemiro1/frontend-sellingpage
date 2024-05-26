import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlterarWhatsappComponent } from './alterar-whatsapp.component';

describe('AlterarWhatsappComponent', () => {
  let component: AlterarWhatsappComponent;
  let fixture: ComponentFixture<AlterarWhatsappComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlterarWhatsappComponent]
    });
    fixture = TestBed.createComponent(AlterarWhatsappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
