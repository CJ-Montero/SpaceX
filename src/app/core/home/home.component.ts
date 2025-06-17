import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SpacexService } from '../spacex.service';
import { Launch, Rocket } from '../models/spacex.models';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  missionName: string = '';
  data: Launch | Rocket[] | null = null;
  suggestions: string[] = [];
  selectedRocket: string = '';
  filteredRockets: Rocket[] = [];
  rocketMenuOpen: boolean = false;
  selectedRocketDetails: Rocket | null = null;

  constructor(private spacexService: SpacexService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    console.log('Componente iniciado');
    this.listRockets();
  }

  isRocketArray(data: Launch | Rocket[] | null): data is Rocket[] {
    return Array.isArray(data);
  }

  isLaunch(data: Launch | Rocket[] | null): data is Launch {
    return data !== null && !Array.isArray(data);
  }

  getRandomLaunch() {
    this.spacexService.getRandomLaunch().subscribe({
      next: (res: Launch) => {
        console.log('Lanzamiento aleatorio seleccionado:', res);
        this.data = res;
        this.cdr.detectChanges();
      },
      error: (err: any) => console.error('Error fetching random launch:', err)
    });
  }

  listRockets() {
    console.log('Cargando cohetes...');
    this.spacexService.getRockets().subscribe({
      next: (res: Rocket[]) => {
        console.log('Datos de cohetes recibidos:', res);
        this.data = res;
        this.filterRocket();
      },
      error: (err: any) => console.error('Error fetching rockets:', err)
    });
  }

  searchMission() {
    this.spacexService.searchMission(this.missionName).subscribe({
      next: (res: Launch) => {
        console.log('Misión encontrada:', res);
        this.data = res;
        this.cdr.detectChanges();
      },
      error: (err: any) => console.error('Error searching mission:', err)
    });
  }

  onInputChange() {
    if (this.missionName.length > 0) {
      this.spacexService.getLaunchSuggestions(this.missionName).subscribe({
        next: (sugs: string[]) => {
          console.log('Sugerencias:', sugs);
          this.suggestions = sugs.slice(0, 5);
        },
        error: (err: any) => console.error('Error fetching suggestions:', err)
      });
    } else {
      this.suggestions = [];
    }
  }

  selectSuggestion(suggestion: string) {
    console.log('Sugerencia seleccionada:', suggestion);
    this.missionName = suggestion;
    this.suggestions = [];
    this.cdr.detectChanges();
    this.searchMission();
  }

  filterRocket() {
    if (this.isRocketArray(this.data)) {
      if (this.selectedRocket) {
        this.filteredRockets = this.data.filter(rocket => rocket.name === this.selectedRocket);
      } else {
        this.filteredRockets = [...this.data];
      }
      console.log('Cohetes filtrados:', this.filteredRockets);
    }
  }

  toggleRocketMenu() {
    console.log('Toggle menú cohetes:', !this.rocketMenuOpen);
    this.rocketMenuOpen = !this.rocketMenuOpen;
  }

  selectRocket(rocket: string) {
    console.log('Seleccionado cohete:', rocket);
    this.selectedRocket = rocket;
    this.rocketMenuOpen = false;
    this.filterRocket();
    if (this.isRocketArray(this.data) && this.selectedRocket) {
      this.selectedRocketDetails = this.data.find(r => r.name.includes(this.selectedRocket)) || null;
      console.log('Detalles del cohete seleccionado:', this.selectedRocketDetails);
      // Si se selecciona Falcon 9, obtener detalles específicos
      if (this.selectedRocket === 'Falcon 9') {
        this.getFalcon9Details();
      }
    } else {
      this.selectedRocketDetails = null;
    }
    this.cdr.detectChanges();
  }

  // Método para obtener detalles del Falcon 9
  getFalcon9Details() {
    this.spacexService.getRocketDetails('5e9d0d95eda69973a809d1ec').subscribe({
      next: (data: Rocket) => {
        this.selectedRocketDetails = data;
        this.cdr.detectChanges();
      },
      error: (err: any) => console.error('Error fetching Falcon 9 details:', err)
    });
  }
}
