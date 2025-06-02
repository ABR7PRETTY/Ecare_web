import { Apprenant } from "./apprenant";
import { Hopital } from "./hopital";

export class Alerte {
    id: number;
    titre: string;
    contenu: string;
    date:Date;
    localisation: string;
    latitude: number;  // Nouveau champ
    longitude: number;
    user: Apprenant;
    statut: boolean;
    medias: (File | string) [];

    constructor(){
        this.id=0;
        this.titre="";
        this.contenu="";
        this.date= new Date();
        this.localisation="";
        this.latitude=0;
        this.longitude=0;
        this.user= new Apprenant();
        this.medias=[];
        this.statut=true;
        
    }

}