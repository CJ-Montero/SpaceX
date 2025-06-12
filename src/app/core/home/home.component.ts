import { Component, ChangeDetectorRef } from '@angular/core';
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
export class HomeComponent {
  missionName: string = '';
  data: Launch | Rocket[] | null = null;
  suggestions: string[] = [];

  constructor(private spacexService: SpacexService, private cdr: ChangeDetectorRef) {}

  isRocketArray(data: Launch | Rocket[] | null): data is Rocket[] {
    return Array.isArray(data);
  }

  isLaunch(data: Launch | Rocket[] | null): data is Launch {
    return data !== null && !Array.isArray(data);
  }

  getRandomLaunch() {
    this.spacexService.getRandomLaunch().subscribe({
      next: (res: Launch) => this.data = res,
      error: (err: any) => console.error('Error fetching launch:', err)
    });
  }

  listRockets() {
    this.spacexService.getRockets().subscribe({
      next: (res: Rocket[]) => this.data = res,
      error: (err: any) => console.error('Error fetching rockets:', err)
    });
  }

  searchMission() {
    this.spacexService.searchMission(this.missionName).subscribe({
      next: (res: Launch) => this.data = res,
      error: (err: any) => console.error('Error searching mission:', err)
    });
  }

  onInputChange() {
    if (this.missionName.length > 1) {
      this.spacexService.getLaunchSuggestions(this.missionName).subscribe({
        next: (sugs: string[]) => this.suggestions = sugs.slice(0, 5),
        error: (err: any) => console.error('Error fetching suggestions:', err)
      });
    } else {
      this.suggestions = [];
    }
  }

  selectSuggestion(suggestion: string) {
    this.missionName = suggestion; // Actualiza el valor
    this.suggestions = [];         // Limpia las sugerencias
    this.cdr.detectChanges();      // Forza la actualización del DOM
    this.searchMission();          // Realiza la búsqueda automáticamente
  }
}
