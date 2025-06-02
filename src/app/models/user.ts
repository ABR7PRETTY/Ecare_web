import { Hopital } from "./hopital";

export class User {
    id: number;
    username: string;
    password: string;
    nom: string;
    prenom:string;
    telephone: string;
    email: string;
    profil: File | string;
    hopital: Hopital;
    statut: boolean;
    

    constructor(){
        this.id=0;
        this.username="";
        this.password="";
        this.nom="";
        this.prenom="";
        this.telephone="";
        this.email="";
        this.profil="";
        this.hopital= new Hopital();
        this.statut= true;
    }

}