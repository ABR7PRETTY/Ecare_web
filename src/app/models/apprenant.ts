export class Apprenant {
    id: number;
    username: string;
    password: string;
    nom: string;
    prenom:string;
    telephone: string;
    profil: File | string;
    sexe: string;
    date_naissance: Date;
    localisation: string;
    divers: string;
    statut: boolean;
    

    constructor(){
        this.id=0;
        this.username="";
        this.password="";
        this.nom="";
        this.prenom="";
        this.telephone="";
        this.profil="";
        this.sexe="";
        this.date_naissance=new Date();
        this.divers="";
        this.localisation="";
        this.statut= true;
    }

}