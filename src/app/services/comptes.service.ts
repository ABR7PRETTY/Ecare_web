import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Apprenant } from '../models/apprenant';
import { environment } from '../../environement/environement';

@Injectable({
  providedIn: 'root'
})
export class CompteService {

  private apiUrl = `${environment.apiUrl}/api/auth/`;

  constructor(private http : HttpClient) { }

  getAllComptes():Observable<User[]>{
    return this.http.get<Array<User>>(`${this.apiUrl}findAllAdmins`);
  }

  getAllApprenant():Observable<Apprenant[]>{
    return this.http.get<Array<Apprenant>>(`${this.apiUrl}findAllApprenants`);
  }

  save(user: User){
    const formData = new FormData();

    formData.append('username', user.username);
    formData.append('nom', user.nom);
    formData.append('prenom', user.prenom);
    formData.append('telephone', user.telephone);
    formData.append('email', user.email);
    formData.append('password', user.password);
    formData.append('hopitalId', user.hopital.id.toString());
    formData.append('profil', user.profil);
    
    return this.http.post(`${this.apiUrl}register`, formData, { responseType: 'text' });
  }

  updateUser(id: number, user: User) : Observable<User> {

    return this.http.put<User>(`${this.apiUrl}update/${id}`, user);
  }

  deleteUser(id:number) {
    return this.http.delete(`${this.apiUrl}delete/${id}`, { responseType: 'text' });
  }

  findUser(id:number):Observable<User>{
    return this.http.get<User>(`${this.apiUrl}findUser/${id}`)
  }

  changeStatut(id:number,statut:boolean) {
    
    return this.http.put(`${this.apiUrl}update-status/${id}`,  { statut: statut }, { responseType: 'text' } );
  }
}
