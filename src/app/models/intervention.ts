import { Alerte } from "./alerte";
import { Hopital } from "./hopital";

export class Intervention {
    id: number;
    date:Date;
    statut: string;
    alerte: Alerte;
    hopital: Hopital;

    constructor(){
        this.id=0;
        this.date=new Date();
        this.alerte= new Alerte();
        this.hopital= new Hopital();
        this.statut="";
        
    }

}