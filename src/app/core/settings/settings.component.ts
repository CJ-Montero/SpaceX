import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  standalone: true,
  templateUrl: './settings.component.html'
})
export class SettingsComponent {
  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
