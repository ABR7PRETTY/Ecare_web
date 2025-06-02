import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cours } from '../models/cours';
import { environment } from '../../environement/environement';

@Injectable({
  providedIn: 'root'
})
export class CoursService {

  private apiUrl = `${environment.apiUrl}/free/service/cours/`;

  constructor(private http : HttpClient) { }

  getAllCategories():Observable<Cours[]>{
    return this.http.get<Array<Cours>>(`${this.apiUrl}findAll`);
  }

  saveCours(cours : Cours): Observable<any> {
    const formData = new FormData();
    formData.append('titre', cours.titre);
    formData.append('contenu', cours.contenu);
    formData.append('categorieId', cours.categorieId.toString());

    cours.medias.forEach(file => {
      formData.append('files', file);  // Ajoute chaque fichier dans le FormData
    });

    return this.http.post(`${this.apiUrl}save`, formData);
  }

  getAllCours(id : number):Observable<Cours[]>{
      return this.http.get<Array<Cours>>(`${this.apiUrl}findAllByCategorie/${id}`);
    }

  updateCours(id: number, cours: Cours) : Observable<Cours> {
      const formData = new FormData();
      formData.append('titre', cours.titre);
      formData.append('contenu', cours.contenu);
      formData.append('categorieId', cours.categorieId.toString());
      cours.medias.forEach(file => {
        formData.append('files', file);  // Ajoute chaque fichier dans le FormData
      });
  
      return this.http.put<Cours>(`${this.apiUrl}update/${id}`, formData);
    }
  
    deleteCours(id:number) {
      return this.http.delete(`${this.apiUrl}delete/${id}`, { responseType: 'text' });
    }

    TotalCours():Observable<number> {
      return this.http.get<number>(`${this.apiUrl}countCours`);
    }

}
