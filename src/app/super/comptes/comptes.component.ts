import { Component } from '@angular/core';
import { User } from '../../models/user';
import { CompteService} from '../../services/comptes.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { Hopital } from '../../models/hopital';
import { HopitalService } from '../../services/hopital.service';

@Component({
  selector: 'app-compte',
  imports: [CommonModule,FormsModule],
  templateUrl: './comptes.component.html',
  styleUrl: './comptes.component.css'
})
export class CompteComponent {

  user :User = new User(); 
  userSelect :User = new User(); // Par défaut
  tableauUser : Array<User> = [];
  tableauHopital : Array<Hopital> = [];
  hopital :Hopital = new Hopital();
  page:number=1;
  voir:Boolean = false;
  desVisible:Boolean = false;
  actVisible:Boolean = false;
  saveVisible:Boolean = false;

  constructor(private compteService : CompteService, private hopitalService : HopitalService){}

  ngOnInit(): void {
    this.getAllhopitaux();
    this.getAllUser(); 
    
  }


    annuler() {
      this.page = 1;
      this.userSelect = new User();
    }


    pageAjout(){
      this.page = 2;
    }

    pageModif(user: User) {
      this.userSelect = user;
      this.page = 3;

    }

    pageSup(user: User) {
      this.userSelect = user;
    }


    onFileSelected(event: any) {
      this.user.profil = event.target.files[0];
    }

  getAllhopitaux() {
    this.hopitalService.getAllHopitaux().subscribe((value:Array<Hopital>) => {
      this.tableauHopital = value;
    },
    (error:String) => {

    },
    () => {

    }
    )

  }

  add() {
      this.compteService.save(this.user)
        .subscribe(response => {
         this.getAllUser();
          this.page=1;
          this.saveVisible=true;
          setTimeout(() => {
            this.saveVisible=false;
          },3000)
        }, error => {
          console.log(this.user.hopital);
          alert(error)
        });
    }

  getAllUser() {
    this.compteService.getAllComptes().subscribe((value:Array<User>) => {
      this.tableauUser = value;
    },
    (error:String) => {

    },
    () => {

    }
    )

  }

  update() {
    }

    Voir(user : User){
      this.userSelect=user;
      this.voir = true;

    }
    
  

  delete() {
        this.compteService.deleteUser(this.userSelect.id).subscribe(
                response => {
                  this.tableauUser = this.tableauUser.filter(user => user.id !== this.userSelect.id);
                  this.page = 1;
                  alert('Cours supprimé avec succès !');
                  this.userSelect = new User();
                },
                (error) => {
                  console.log(error);
                }
                
            );
  }

  currentHop(id:number) : Hopital {
    this.hopitalService.findHopital(id).subscribe((value: Hopital) => {
      this.hopital=value;
    }, error => {
      console.error("Erreur lors de la récupération de l'hôpital :", error);
    });
    return this.hopital;
  }

  toggleStatus(user: User) {
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

