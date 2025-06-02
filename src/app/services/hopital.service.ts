import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable , map } from 'rxjs';
import { Hopital } from '../models/hopital';
import { environment } from '../../environement/environement';

@Injectable({
  providedIn: 'root'
})
export class HopitalService {

  private apiUrl = `${environment.apiUrl}/free/service/hopital/`;

  constructor(private http : HttpClient) { }


  getAdresseDepuisCoordonnees(lat: number, lon: number): Observable<string> {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;
    return this.http.get<any>(url).pipe(
      map((res) => res.display_name)
    );
  }

  getCoordonneesDepuisAdresse(adresse: string) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(adresse)}`;
    return this.http.get<any[]>(url);
  }

  getAllHopitaux():Observable<Hopital[]>{
    return this.http.get<Array<Hopital>>(`${this.apiUrl}findAll`);
  }

  save(hopital: Hopital): Observable<Hopital> {

    return this.http.post<Hopital>(`${this.apiUrl}save`, hopital);
  }

  updateHopital(id: number, hopital: Hopital) : Observable<Hopital> {

    return this.http.put<Hopital>(`${this.apiUrl}update/${id}`, hopital);
  }

  deleteHopital(id:number) {
    return this.http.delete(`${this.apiUrl}delete/${id}`, { responseType: 'text' });
  }

  findHopital(id:number):Observable<Hopital>{
    return this.http.get<Hopital>(`${this.apiUrl}findHopital/${id}`)
  }
}
