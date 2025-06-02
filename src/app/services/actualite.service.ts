import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Actualite } from '../models/actualite';
import { environment } from '../../environement/environement';





@Injectable({
  providedIn: 'root'
})
export class ActualiteService {

  private apiUrl = `${environment.apiUrl}/free/service/info/`;

  constructor(private http : HttpClient) { }

  saveActualite(actualite : Actualite): Observable<any> {
    const formData = new FormData();
    formData.append('titre', actualite.titre);
    formData.append('contenu', actualite.contenu);
    formData.append('date_fin', actualite.date_fin.toString());

    actualite.medias.forEach(file => {
      formData.append('files', file);  // Ajoute chaque fichier dans le FormData
    });

    return this.http.post(`${this.apiUrl}save`, formData);
  }

  getAllActualite():Observable<Actualite[]>{
      return this.http.get<Array<Actualite>>(`${this.apiUrl}findAll`);
    }

  updateActualite(id: number, actualite: Actualite) : Observable<Actualite> {
      const formData = new FormData();
      formData.append('titre', actualite.titre);
      formData.append('contenu', actualite.contenu);
      formData.append('date_fin', actualite.date_fin.toString());
      actualite.medias.forEach(file => {
        formData.append('files', file);  // Ajoute chaque fichier dans le FormData
      });
  
      return this.http.put<Actualite>(`${this.apiUrl}update/${id}`, formData);
    }
  
    deleteActualite(id:number) {
      return this.http.delete(`${this.apiUrl}delete/${id}`, { responseType: 'text' });
    }

    TotalActualite():Observable<number> {
      return this.http.get<number>(`${this.apiUrl}countActualite`);
    }

}
