import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AppComponent} from '../../app/app.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {AlticciService} from "../../app/services/alticciService";
import {Observable, of, throwError} from "rxjs";
import {MessageService} from "primeng/api";

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  const messageServiceMock = jasmine.createSpyObj(MessageService, ['add']);

  const alticciServiceMock = jasmine.createSpyObj(AlticciService, ['getAlticciSeq','getAlticciSeqArray']);
/*  {
    getAlticciSeq: () => {
      return of(1);
    },
    getAlticciSeqArray: () =>
    {
      return of([0,1,1,1]);
    },
  };*/
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {provide: AlticciService, useValue: alticciServiceMock},
        {provide: MessageService, useValue: messageServiceMock},
      ],
      declarations: [AppComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Teste OnInit', () => {
    expect(component).toBeTruthy();
  });


  it('Deve retornar valor por indice', function () {
    alticciServiceMock.getAlticciSeq.and.returnValue(of(1));

    component.searchAlticciValue();

    expect(component.loading).toBe(false);
    expect(component.respostaValue).toBe(1);
  });

  it('Deve retornar exception na consulta de valor por indice', function () {
    alticciServiceMock.getAlticciSeq.and.returnValue(throwError({status: 404}));

    component.searchAlticciValue();

    expect(component.loading).toBe(false);
    expect(messageServiceMock.add).toHaveBeenCalled();
  });

  it('Deve retornar array de valores por indices', function () {
    const mockResposta = [0,1,1,1];
    alticciServiceMock.getAlticciSeqArray.and.returnValue(of(mockResposta));

    component.searchAlticciArray();

    expect(component.loading).toBe(false);
    expect(component.respostaArray).toBe(mockResposta);
  });

  it('Deve retornar exception na consulta de array de valores por indices', function () {
    alticciServiceMock.getAlticciSeqArray.and.returnValue(throwError({status: 404}));

    component.searchAlticciArray();

    expect(component.loading).toBe(false);
    expect(messageServiceMock.add).toHaveBeenCalled();
  });
});
