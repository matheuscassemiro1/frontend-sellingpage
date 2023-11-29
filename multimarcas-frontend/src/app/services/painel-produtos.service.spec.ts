import { TestBed } from '@angular/core/testing';

import { PainelProdutosService } from './painel-produtos.service';

describe('PainelProdutosService', () => {
  let service: PainelProdutosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PainelProdutosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
