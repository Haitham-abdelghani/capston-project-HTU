import { Component } from '@angular/core';
import { ServiceService } from 'src/app/lib/services/service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  massege: any = '';
  constructor(private service: ServiceService, private route: Router) {}

  // function login auth start
  login(loginform: any) {
    let loginData = loginform.value;
    this.service
      .signin(loginData.email + '', loginData.password + '')
      .then(() => {
        this.route.navigate(['/admin-layout/dashboard']);
      })
      .catch(() => {
        this.massege = 'Email or Password is wrong';
      });
  }
  // function login auth end
}
