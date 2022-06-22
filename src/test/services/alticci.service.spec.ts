import {TestBed, waitForAsync} from '@angular/core/testing';
import { AppComponent } from '../../app/app.component';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {AlticciService} from "../../app/services/alticciService";

describe('alticciService', () => {
  let alticciService: AlticciService;
  let httpMock: HttpTestingController;

  beforeEach(
    waitForAsync(() => {
      void TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
    })
  );

/*  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });*/
  beforeEach(() => {
    alticciService = TestBed.inject(AlticciService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('Teste OnInit', () => {
    expect(alticciService).toBeTruthy();
  });

  it('Deve retornar valor por indice', function () {
    const index = 2;
    const dummyResposta = 1;

    alticciService
      .getAlticciSeq(index)
      .subscribe((resposta) => {
        expect(resposta).toBe(dummyResposta);
      });
    const requisicao = httpMock.expectOne(
      alticciService.API_URL + alticciService.ALTICCI_URL + index
    );
    requisicao.flush(dummyResposta);

    expect(requisicao.request.method).toBe('GET');
  });

  it('Deve retornar array de valores por indices', function () {
    const indexStart = 0;
    const indexEnd = 3;
    const dummyResposta = [0,1,1,1];

    alticciService
      .getAlticciSeqArray(indexStart, indexEnd)
      .subscribe((resposta) => {
        expect(resposta.length).toBe(4);
        expect(resposta).toBe(dummyResposta);
      });
    const requisicao = httpMock.expectOne(
      alticciService.API_URL + alticciService.ALTICCI_URL + "array/" + "?start=" + indexStart + "&end=" + indexEnd
    );
    requisicao.flush(dummyResposta);

    expect(requisicao.request.method).toBe('GET');
  });

});
