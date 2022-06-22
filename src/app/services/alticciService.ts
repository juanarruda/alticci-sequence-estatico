import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";



@Injectable({
  providedIn: 'root'
})
export class AlticciService {
  API_URL = "http://localhost:8080"
  ALTICCI_URL = "/alticci/"

  constructor(private http: HttpClient) {
  }

  getAlticciSeq(n: number): Observable<number> {
    return this.http.get<number>(this.API_URL + this.ALTICCI_URL + n);
  }

  getAlticciSeqArray(start: number, end: number): Observable<number[]> {
    return this.http.get<number[]>(this.API_URL + this.ALTICCI_URL + "array/", {
      params: {
        start: start,
        end: end
      }
    });
  }
}
