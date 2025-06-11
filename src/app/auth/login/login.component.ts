import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

   @Component({
     selector: 'app-login',
     standalone: true,
     imports: [FormsModule, CommonModule],
     templateUrl: './login.component.html'
   })
   export class LoginComponent {
     username: string = '';
     password: string = '';
     error: boolean = false;

     constructor(private router: Router) {}

     onLogin() {
       const storedUser = localStorage.getItem('user');
       if (storedUser) {
         const user = JSON.parse(storedUser);
         if (user.username === this.username.trim() && user.password === this.password.trim()) {
           localStorage.setItem('isLoggedIn', 'true');
           this.router.navigate(['/home']);
         } else {
           this.error = true;
         }
       } else {
         this.error = true;
       }
     }

     setTestUser() {
       localStorage.setItem('user', JSON.stringify({ username: 'admin', password: 'admin' }));
       alert('Usuario de prueba establecido: admin/admin');
     }
   }
