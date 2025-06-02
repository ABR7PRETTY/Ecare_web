export class Hopital {
    id: number;
    nom: string;
    localisation: string;
    description: string;
    telephone: string;
    latitude: number;  // Nouveau champ
    longitude: number; // Nouveau champ

    constructor() {
        this.id = 0;
        this.nom = "";
        this.localisation = "";
        this.description = "";
        this.telephone = "";
        this.latitude = 0;  // Initialisation du champ latitude
        this.longitude = 0; // Initialisation du champ longitude
    }
}