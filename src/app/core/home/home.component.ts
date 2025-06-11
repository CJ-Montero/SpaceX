import { Component } from '@angular/core';
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

  constructor(private spacexService: SpacexService) {}

  // Method to check if data is an array of rockets
  isRocketArray(data: Launch | Rocket[] | null): data is Rocket[] {
    return Array.isArray(data);
  }

  // Method to check if data is a single launch
  isLaunch(data: Launch | Rocket[] | null): data is Launch {
    return data !== null && !Array.isArray(data);
  }

  getRandomLaunch() {
    this.spacexService.getRandomLaunch().subscribe({
      next: (res: Launch) => this.data = res,
      error: (err) => console.error('Error fetching launch:', err)
    });
  }

  listRockets() {
    this.spacexService.getRockets().subscribe({
      next: (res: Rocket[]) => this.data = res,
      error: (err) => console.error('Error fetching rockets:', err)
    });
  }

  searchMission() {
    this.spacexService.searchMission(this.missionName).subscribe({
      next: (res: Launch) => this.data = res,
      error: (err) => console.error('Error searching mission:', err)
    });
  }
}
