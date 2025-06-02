import { Component } from '@angular/core';
import { CompteService } from '../../services/comptes.service';
import { Apprenant } from '../../models/apprenant';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-apprenant',
  imports: [CommonModule],
  templateUrl: './apprenant.component.html',
  styleUrl: './apprenant.component.css'
})
export class ApprenantComponent {

  tableauApprenant : Array<Apprenant> = [];
  desVisible: boolean = false;
  actVisible: boolean = false;

  constructor(private compteService : CompteService){}
  
    ngOnInit(): void { 
      this.getAllApprenant();  
      
    }

    getAllApprenant() {
        this.compteService.getAllApprenant().subscribe((value:Array<Apprenant>) => {
          this.tableauApprenant = value;
        },
        (error:String) => {
    
        },
        () => {
    
        }
        )
    
      }


      toggleStatus(user: Apprenant) {
          user.statut = !user.statut;
          this.compteService.changeStatut(user.id,user.statut).subscribe(
            response =>{
              if (user.statut){
                this.actVisible=true;
                setTimeout(() => {
                  this.actVisible=false;
                },3000)
              
            }else{
              this.desVisible=true;
                setTimeout(() => {
                  this.desVisible=false;
                },3000)
            }
          }
          );
      
      }

}
