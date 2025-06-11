import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NumeroVert } from '../models/numero';
import { environment } from '../../environement/environement';

@Injectable({
  providedIn: 'root'
})
export class NumeroVertService {

  private apiUrl = `${environment.apiUrl}/free/service/numero/`;

  constructor(private http : HttpClient) { }

  getAllNumeroVert():Observable<NumeroVert[]>{
    return this.http.get<Array<NumeroVert>>(`${this.apiUrl}findAll`);
  }

  saveNumeroVert(numeroVert: NumeroVert): Observable<NumeroVert> {

    return this.http.post<NumeroVert>(`${this.apiUrl}save`, numeroVert);
  }

  updateNumeroVert(id: number, numeroVert: NumeroVert) : Observable<NumeroVert> {

    return this.http.put<NumeroVert>(`${this.apiUrl}update/${id}`, numeroVert);
  }

  deleteNumeroVert(id:number) {
    return this.http.delete(`${this.apiUrl}delete/${id}`, { responseType: 'text' });
  }

  findNumeroVert(id:number):Observable<NumeroVert>{
    return this.http.get<NumeroVert>(`${this.apiUrl}findNumeroVert/${id}`)
  }
}
