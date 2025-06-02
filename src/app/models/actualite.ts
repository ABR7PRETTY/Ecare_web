export class Actualite {
    id: number;
    titre: string;
    contenu: string;
    date_ajout:Date;
    date_fin:Date;
    medias: (File | string) [];

    constructor(){
        this.id=0;
        this.titre="";
        this.contenu="";
        this.date_ajout= new Date();
        this.date_fin= new Date();
        this.medias=[];
        
    }

}