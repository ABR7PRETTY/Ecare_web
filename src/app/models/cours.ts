export class Cours {
    id: number;
    titre: string;
    contenu: string;
    categorieId: number;
    medias: (File | string) [];

    constructor(){
        this.id=0;
        this.titre="";
        this.contenu="";
        this.medias=[];
        this.categorieId=0;
    }

}