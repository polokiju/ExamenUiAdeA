import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from './modules/common/login/model/loginModel';
import { LoginServicesService } from './services/login-services.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'examen-ada-ui';
  currentUser: Usuario;
constructor(
  private router: Router,
        private loginServices: LoginServicesService
){
  this.loginServices.currentUser.subscribe(x => this.currentUser = x);
}
logout() {
  //this.loginServices.logout();
  this.router.navigate(['/login']);
}
}
