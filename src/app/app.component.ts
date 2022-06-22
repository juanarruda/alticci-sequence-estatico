import {Component, OnInit} from '@angular/core';
import {AlticciService} from "./services/alticciService";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  respostaValue: number = -1;
  respostaArray: number[] = [];
  loading = false;

  altiValue = new FormControl('', [
    Validators.required,
    Validators.pattern("^[0-9]{1,3}$")
  ]);

  altiArray = new FormGroup({
    start: new FormControl('', [
      Validators.required,
      Validators.pattern("^[0-9]{1,3}$")]),
    end: new FormControl('', [
      Validators.required,
      Validators.pattern("^[0-9]{1,3}$")]),
  });

  constructor(private alticciService: AlticciService,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
  }

  public searchAlticciValue() {
    this.loading = true;
    this.alticciService.getAlticciSeq(this.altiValue.value).subscribe(response => {
      this.respostaValue = response;
      this.loading = false;
    }, (err) => {
      this.messageService.add({severity: 'error', summary: 'Erro', detail: err.status + ' - ' + err.error});
      this.loading = false;
    })
  }

  public searchAlticciArray() {
    this.loading = true;
    this.alticciService.getAlticciSeqArray(this.altiArray.value.start, this.altiArray.value.end)
      .subscribe(response => {
          this.respostaArray = response;
          this.loading = false;
        }, (err) => {
          this.messageService.add({severity: 'error', summary: 'Erro', detail: err.status + ' - ' + err.error});
          this.loading = false;
        }
      )
  }
}
