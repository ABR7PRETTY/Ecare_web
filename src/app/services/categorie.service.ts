import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categorie } from '../models/categorie';
import { environment } from '../../environement/environement';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  private apiUrl = `${environment.apiUrl}/free/service/categorie/`;

  constructor(private http : HttpClient) { }

  getAllCategories():Observable<Categorie[]>{
    return this.http.get<Array<Categorie>>(`${this.apiUrl}findAll`);
  }

  saveCategorie(categorie: Categorie): Observable<Categorie> {
    const formData = new FormData();
    formData.append('titre', categorie.titre);
    formData.append('description', categorie.description);
    formData.append('image', categorie.image);

    return this.http.post<Categorie>(`${this.apiUrl}save`, formData);
  }

  updateCategorie(id: number, categorie: Categorie) : Observable<Categorie> {
    const formData = new FormData();
    formData.append('titre', categorie.titre);
    formData.append('description', categorie.description);
    if (categorie.image) {
      formData.append('image', categorie.image);
    }

    return this.http.put<Categorie>(`${this.apiUrl}update/${id}`, formData);
  }

  deleteCategorie(id:number) {
    return this.http.delete(`${this.apiUrl}delete/${id}`, { responseType: 'text' });
  }

  findCategorie(id:number):Observable<Categorie>{
    return this.http.get<Categorie>(`${this.apiUrl}findCategorie/${id}`)
  }

  TotalCategories():Observable<number> {
    return this.http.get<number>(`${this.apiUrl}countCategories`);
  }
}
