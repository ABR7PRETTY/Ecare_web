import { Component } from '@angular/core';
import { Alerte } from '../../models/alerte';
import { AlerteService } from '../../services/alerte.service';
import { InterventionService } from '../../services/intervention.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthentificationService } from '../../services/authentification.service';
import { User } from '../../models/user';
import { AlerteSocketService } from '../../services/alerte-socket.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-alerte',
  imports: [CommonModule,FormsModule],
  templateUrl: './signalement.component.html',
  styleUrl: './signalement.component.css'
})
export class SignalementComponent {

  tableauAlerte : Array<Alerte> = [];
  page:number=1;
  popupVisible: boolean = false;
  SuccessPopupVisible: boolean = false;
  newPopupVisible: boolean = false;
  voir:Boolean = false;
  alerteSelect : Alerte = new Alerte();
  modalMap: any;


  constructor(private alerteService : AlerteService,private interventionService: InterventionService , private userService : AuthentificationService, private route: ActivatedRoute, private http: HttpClient, private alerteSocketService: AlerteSocketService){}

  ngOnInit(): void {
    this.getAllAlerte();
    this.getNewAlerte();
      }


    annuler() {
      this.page = 1;
      this.alerteSelect = new Alerte();
    }

    retour() {
      this.newPopupVisible = false;
      this.popupVisible = false;

    }

    pageSup(alerte: Alerte) {
      this.alerteSelect = alerte;
    }

    initModalMap(lat: number, lng: number): void {
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
          .bindPopup('alerte')
          .openPopup();
    
        // Redimensionne la carte pour s'adapter à la modal
        setTimeout(() => {
          this.modalMap.invalidateSize();
        }, 200);
      }

  getNewAlerte(){
    this.alerteSocketService.getAlerteObservable().subscribe((alerte) => {
      this.alerteSelect=alerte;
      this.newPopupVisible = true;
     this.tableauAlerte.unshift(alerte); // ou ajoute dans ta liste d'affichage
    });
  }

  getAllAlerte() {
    this.alerteService.getAllAlerte().subscribe((value:Array<Alerte>) => {
      this.tableauAlerte = value.reverse();
      console.log(value);
    },
    (error:String) => {

    },
    () => {

    }
    )

  }

    Voir(alerte : Alerte){
      this.alerteSelect=alerte;

      setTimeout(() => {
        this.initModalMap(alerte.latitude, alerte.longitude);
      }, 100);

    }

    accepter(alerte: Alerte) {
      this.alerteSelect = alerte;
      this.interventionService.accepterIntervention(alerte.id).subscribe(
        response => {
          this.SuccessPopupVisible = true;
            setTimeout(() => {
              this.SuccessPopupVisible = false;
            }
            , 5000);
          this.getAllAlerte();
          this.popupVisible=false;
        },
        error => {
          console.log(error);
        }
      );
    }
}
