import { Component } from '@angular/core';
import { Hopital } from '../../models/hopital';
import { HopitalService} from '../../services/hopital.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as L from 'leaflet';


@Component({
  selector: 'app-hopital',
  imports: [CommonModule,FormsModule],
  templateUrl: './hopital.component.html',
  styleUrl: './hopital.component.css'
})
export class HopitalComponent {

  hopital :Hopital = new Hopital(); 
  hopitalSelect :Hopital = new Hopital(); // Par défaut
  tableauHopital : Array<Hopital> = [];
  page:number=1;
  voir:Boolean = false;
  modifVisible: boolean = false;
  supVisible: boolean = false;
  saveVisible: boolean = false;
  mapVisible: boolean = false;
  mapAjout: L.Map | undefined;
  mapModif: L.Map | undefined;
  marker: L.Marker | null = null;
  modalMap: any;



  constructor(private hopitalService : HopitalService){}

  ngOnInit(): void {
    this.getAllHopital();
      }


    annuler() {
      this.page = 1;
      this.hopitalSelect = new Hopital();
    }
    pageAjout(){
      this.page = 2;

      this.mapVisible = true;

  // Laisse le temps à Angular d’afficher la carte
  setTimeout(() => {
    this.initAjoutMap();
  }, 100);
    }

    pageModif(hopital: Hopital) {
      this.hopitalSelect = hopital;
      this.page = 3;

      this.mapVisible = true;

  // Laisse le temps à Angular d’afficher la carte
  setTimeout(() => {
    this.initModifMap();
  }, 100);
    }

    pageSup(hopital: Hopital) {
      this.hopitalSelect = hopital;
      this.page = 4;
    }

    initAjoutMap() {
      setTimeout(() => {
        if (this.mapAjout) {
          this.mapAjout.remove(); // Évite les doublons
        }
    
        this.mapAjout = L.map('map-ajout').setView([6.1319, 1.2228], 13); // Vue sur Lomé
    
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(this.mapAjout);
    
        this.mapAjout.on('click', (e: any) => {
          this.hopital.latitude = e.latlng.lat;
          this.hopital.longitude = e.latlng.lng;


          if (this.marker) {
            this.marker.setLatLng([this.hopital.latitude, this.hopital.longitude]);
          } else {
            if (this.mapAjout) {
              this.marker = L.marker([this.hopital.latitude, this.hopital.longitude]).addTo(this.mapAjout);
            }
          }

          

          this.hopitalService.getAdresseDepuisCoordonnees(this.hopital.latitude, this.hopital.longitude).subscribe(adresse => {
            this.hopital.localisation = adresse;
          });
        });
    
      }, 0); // Attends la fin du cycle de détection Angular
    }

    initModifMap() {
      setTimeout(() => {
        if (this.mapModif) {
          this.mapModif.remove(); // Évite les doublons
        }
    
        this.mapModif = L.map('map-modif').setView([6.1319, 1.2228], 13); // Vue sur Lomé
    
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(this.mapModif);

        this.marker = L.marker([this.hopitalSelect.latitude, this.hopitalSelect.longitude]).addTo(this.mapModif);
        this.marker.bindPopup(this.hopitalSelect.nom).openPopup();
    
        this.mapModif.on('click', (e: any) => {

          this.hopitalSelect.latitude = e.latlng.lat;
          this.hopitalSelect.longitude = e.latlng.lng;

          

          if (this.marker) {
            this.marker.setLatLng([this.hopitalSelect.latitude, this.hopitalSelect.longitude]);
          } else {
            if (this.mapModif) {
              this.marker = L.marker([this.hopitalSelect.latitude, this.hopitalSelect.longitude]).addTo(this.mapModif);
            }
          }

          this.hopitalService.getAdresseDepuisCoordonnees(this.hopitalSelect.latitude, this.hopitalSelect.longitude).subscribe(adresse => {
            this.hopitalSelect.localisation = adresse;
          });
        });
    
      }, 0); // Attends la fin du cycle de détection Angular
    }


    openMapModal(hopital: Hopital): void {
      this.hopitalSelect = hopital;
      
      // Initialise la carte après un court délai pour s'assurer que la modal est visible
      setTimeout(() => {
        this.initModalMap(hopital.latitude, hopital.longitude, hopital.nom);
      }, 100);
    }

    initModalMap(lat: number, lng: number, nom: string): void {
      // Détruit la carte existante si elle existe
      if (this.modalMap) {
        this.modalMap.remove();
      }
  
      // Crée une nouvelle carte
      this.modalMap = L.map('modalMap').setView([lat, lng], 15);
  
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(this.modalMap);

      L.marker([lat, lng]).addTo(this.modalMap)
      .bindPopup(nom)
      .openPopup();

    // Redimensionne la carte pour s'adapter à la modal
    setTimeout(() => {
      this.modalMap.invalidateSize();
    }, 200);
  }

  

  
    

  add() {
      this.hopitalService.save(this.hopital)
        .subscribe(response => {
          console.log(response)
            this.getAllHopital();
          this.page=1;
          this.hopital = new Hopital(); // Réinitialiser le formulaire
          this.hopitalSelect = new Hopital(); // Réinitialiser le formulaire
          this.saveVisible = true;
          setTimeout(() => {
            this.saveVisible = false;
          }
          , 3000); // Masquer le message après 2 secondes
        }, error => {
          console.error("Erreur lors de l'ajout :", error);
        });
  }

  getAllHopital() {
    this.hopitalService.getAllHopitaux().subscribe((value:Array<Hopital>) => {
      this.tableauHopital = value;
    },
    (error:String) => {

    },
    () => {

    }
    )

  }

  update() {
      this.hopitalService.updateHopital(this.hopitalSelect.id,this.hopitalSelect).subscribe(
        (response: Hopital) => {
          console.log('Hopital modifié', response);
          this.getAllHopital();
          this.page = 1;
          this.hopitalSelect = new Hopital();
          this.modifVisible = true;
          setTimeout(() => {
            this.modifVisible = false;
          }
          , 3000); // Disparait après 3s
        },
        (error) => {
          console.log(error);
        }
      );
    }
    
  delete() {
      this.hopitalService.deleteHopital(this.hopitalSelect.id).subscribe(
        response => {
          this.tableauHopital = this.tableauHopital.filter(hopital => hopital.id !== this.hopitalSelect.id);
          this.page = 1;
            this.getAllHopital();
          this.hopitalSelect = new Hopital();
          this.supVisible = true;
          setTimeout(() => {
            this.supVisible = false;
          }
          , 3000); // Disparait après 3s
        },
        (error) => {
          console.log(error);
        }
        
    );}


}
