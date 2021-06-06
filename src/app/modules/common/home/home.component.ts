import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServicesService } from 'src/app/services/login-services.service';
import { Usuario } from '../login/model/loginModel';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser: Usuario;
  usuario = new Usuario();
  currentToken:any;
  myDate = new Date();
  password:string;
  conPassword:string;

  
  constructor(
    private loginService: LoginServicesService,
    private router: Router
  ) {

   }

  ngOnInit(): void {
    this.currentUser = this.loginService.currentUserValue;
    this.currentUser.fechaModificacion = new Date(this.currentUser.fechaModificacion);
     if(this.myDate.getMonth() - (this.currentUser.fechaModificacion.getMonth()-2)!=0){
     // console.log("Actualizar password, la ultima vez actualizada fue hace "+ (this.myDate.getMonth() - (this.currentUser.fechaModificacion.getMonth()-2))+" meses");
     Swal.fire({
      title: 'Ingresa Nuevo Password',
      input: 'password',
      allowOutsideClick: false,
      inputAttributes: {
       autocapitalize: 'off'
       },
      showCancelButton: true,
      confirmButtonText: 'Look up',
      showLoaderOnConfirm: true,
    }).then((result) =>{
      console.log(result.value);
      if(result.value == ""){
        Swal.fire({
          icon: 'error',
          title: 'No puede ir vacio este campo!',
          showConfirmButton: false,
          allowOutsideClick: false,
          allowEscapeKey:false
        })
        return false;
      }
      this.password = result.value;
      Swal.fire({
        title: 'Confirma Nuevo Password',
        input: 'password',
        allowOutsideClick: false,
        inputAttributes: {
         autocapitalize: 'off'
         },
        showCancelButton: true,
        confirmButtonText: 'Look up',
        showLoaderOnConfirm: true,
      }).then((result) =>{
        
        if(result.value == ""){
          Swal.fire({
            icon: 'error',
            title: 'No puede ir vacio este campo!',
            showConfirmButton: false,
            allowOutsideClick: false,
            allowEscapeKey:false
          })
          return false;
        }
        this.conPassword=result.value;
        if(this.password == this.conPassword){
          Swal.fire({
            icon: 'success',
            title: 'Se ha actualizado con exito!',
            showConfirmButton: false,
            timer: 1500
          }).then((result)=>{
                  console.log("Password enviado con exito!");
          }) 
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Verifica que el password sean iguales',
            showConfirmButton: false,
            allowOutsideClick: false,
            allowEscapeKey:false
          })
        }
      })
    })
     }
  }

  

}
