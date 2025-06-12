import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SpacexService } from '../spacex.service';
import { Launch, Rocket } from '../models/spacex.models';
import { map } from 'rxjs/operators';

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

  isRocketArray(data: Launch | Rocket[] | null): data is Rocket[] {
    return Array.isArray(data);
  }

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
