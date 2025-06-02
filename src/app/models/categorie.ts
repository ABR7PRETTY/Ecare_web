export class Categorie {
    id:number;
    titre:string;
    description:string;
    image: File | string;


    constructor(){
        this.id=0;
        this.titre="";
        this.description="";
        this.image="";
    }
}
