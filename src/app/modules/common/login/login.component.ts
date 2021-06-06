import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Usuario } from './model/loginModel';
import { LoginServicesService } from 'src/app/services/login-services.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  loading = false;
  returnUrl: string;

  constructor(private loginService:LoginServicesService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) { 

                if (this.loginService.currentUserValue) {
                  this.router.navigate(['/Home']);
              }
              }
  usuario:Usuario;
  errorMessage: string;
  private login:string;
  private password:string;
  ngOnInit(): void {
    this.form = this.formBuilder.group({
     login: ['', Validators.required],
     password: ['', Validators.required]
  });
  this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/Home';
  }
  get f() { return this.form.controls; }

   onSubmit(){
    this.submitted = true;

    // reset alerts on submit
    //this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
        return;
    }
    this.usuario = new Usuario();
    this.usuario.login=this.f.login.value;
    this.usuario.password =this.f.password.value;
    this.loading = true;
    this.loginService.getLogin(this.usuario)
    .pipe(first())
    .subscribe(data =>{
      if(data.accessToken != 'undefined'){
        this.router.navigate([this.returnUrl]);
      }
    });

  }
}
