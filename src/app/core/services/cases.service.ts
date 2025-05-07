import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CasesListModel, CasesModel} from "../models/cases.model";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CasesService {

  constructor(
    private httpClient: HttpClient
  ) {}


  getCasesList(): Observable<CasesListModel[]> {
    return this.httpClient.get<CasesListModel[]>(environment.apiUrl + 'cases/list');
  }

  getCasesById(id: string): Observable<CasesModel> {
    return this.httpClient.get<CasesModel>(environment.apiUrl + 'cases/' + id);
  }
}
