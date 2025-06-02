import { Component } from '@angular/core';
import { Intervention } from '../../models/intervention';
import { InterventionService } from '../../services/intervention.service';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthentificationService } from '../../services/authentification.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-intervention',
  imports: [CommonModule,FormsModule],
  templateUrl: './intervention.component.html',
  styleUrl: './intervention.component.css'
})
export class InterventionComponent {

  tableauTraitement : Array<Intervention> = [];
  tableauAcheve : Array<Intervention> = [];
  type:string = "en cours";
  page:number=1;
  voir:Boolean = false;
  interompreVisible: boolean = false;
  acheverVisible: boolean = false;
  reprendreVisible: boolean = false;
  interventionSelect : Intervention = new Intervention();


  constructor(private interventionService: InterventionService , private userService : AuthentificationService, private route: ActivatedRoute, private http: HttpClient){}

  ngOnInit(): void {
    this.getAllIntervention();
      }


    annuler() {
      this.page = 1;
      this.interventionSelect = new Intervention();
    }

    pageSup(intervention: Intervention) {
      this.interventionSelect = intervention;
    }

  getAllIntervention() {
    this.interventionService.getAllInterventionByAdmin().subscribe((value:Array<Intervention>) => {
      this.tableauTraitement = value.filter(intervention => intervention.statut !== 'Achevé').reverse();
      this.tableauAcheve = value.filter(intervention => intervention.statut === 'Achevé').reverse();
      console.log(value);
    },
    (error:String) => {

    },
    () => {

    }
    )

  }

    Voir(intervention : Intervention){
      this.interventionSelect=intervention;
      this.voir = true;

    }
    

achever(intervention: Intervention) {
  this.interventionSelect = intervention;
  this.interventionService.acheverIntervention(intervention.id).subscribe(
    response => {
        this.getAllIntervention();
        this.acheverVisible = true;
          setTimeout(() => {
            this.acheverVisible = false;
          }, 5000); // Disparait après 3s
        
    },
    (error) => {
      console.log(error);
    }
  );

}

interompre(intervention: Intervention) {
  this.interventionSelect = intervention;
  this.interventionService.refuserIntervention(intervention.id).subscribe(
    response => {
        this.getAllIntervention();
        this.interompreVisible = true;
          setTimeout(() => {
            this.interompreVisible = false;
          }, 5000); // Disparait après 3s
        
    },
    (error) => {
      console.log(error);
    }
  );

}

reprendre(intervention: Intervention) {
  this.interventionSelect = intervention;
  this.interventionService.reprendreIntervention(intervention.id).subscribe(
    response => {
        this.getAllIntervention();
        this.reprendreVisible = true;
          setTimeout(() => {
            this.reprendreVisible = false;
          }, 5000); // Disparait après 3s
        },
    (error) => {
      console.log(error);
    }
  );

}

}
