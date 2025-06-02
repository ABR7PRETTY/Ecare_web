import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../admin/header/header.component';
import { FooterComponent } from '../admin/footer/footer.component';
import { AsideComponent } from '../admin/aside/aside.component';
import { StatsComponent } from '../admin/stats/stats.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  imports: [RouterOutlet
      ,HeaderComponent, FooterComponent, AsideComponent, StatsComponent,
    CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

}
