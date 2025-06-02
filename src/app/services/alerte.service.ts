import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Alerte } from '../models/alerte';
import { environment } from '../../environement/environement';

@Injectable({
  providedIn: 'root'
})
export class AlerteService {

  private apiUrl = `${environment.apiUrl}/alerte/`;

  constructor(private http : HttpClient) { }

  getAllAlerte():Observable<Alerte[]>{
      return this.http.get<Array<Alerte>>(`${this.apiUrl}findAll`);
    }

  
    deleteAlerte(id:number) {
      return this.http.delete(`${this.apiUrl}delete/${id}`, { responseType: 'text' });
    }

    TotalAlerte():Observable<number> {
      return this.http.get<number>(`${this.apiUrl}countAlerte`);
    }

}
