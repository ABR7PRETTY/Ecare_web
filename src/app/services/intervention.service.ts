import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Intervention } from '../models/intervention';
import { environment } from '../../environement/environement';

@Injectable({
  providedIn: 'root'
})
export class InterventionService {

  private apiUrl = `${environment.apiUrl}/free/service/intervention/`;

  constructor(private http : HttpClient) { }

  getAllInterventionByAdmin():Observable<Intervention[]>{
      return this.http.get<Array<Intervention>>(`${this.apiUrl}findAllByAdmin`);
    }

    getAllIntervention():Observable<Intervention[]>{
      return this.http.get<Array<Intervention>>(`${this.apiUrl}findAll`);
    }

    accepterIntervention(id:number){
      return this.http.post(`${this.apiUrl}accepter/${id}`, { responseType: 'text' });
    }

    acheverIntervention(id:number){
      return this.http.post(`${this.apiUrl}achever/${id}`, { responseType: 'text' });
    }

    refuserIntervention(id:number){
      return this.http.post(`${this.apiUrl}interompre/${id}`, { responseType: 'text' });
    }

    reprendreIntervention(id:number){
      return this.http.post(`${this.apiUrl}reprendre/${id}`, { responseType: 'text' });
    }
  
    deleteIntervention(id:number) {
      return this.http.delete(`${this.apiUrl}delete/${id}`, { responseType: 'text' });
    }

    TotalIntervention():Observable<number> {
      return this.http.get<number>(`${this.apiUrl}countIntervention`);
    }

}
