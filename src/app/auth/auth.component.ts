import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthResponseData, AuthService} from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoging= false;
  error : string = null;


  onSwitchMode()
  {
    this.isLoginMode=!this.isLoginMode;
  }

  onSubmit(form : NgForm)
  {
    const email = form.value.email;
    const password = form.value.password;
    this.isLoging = true;
    let  authObs : Observable<AuthResponseData>;
    if (this.isLoginMode)
    {
      authObs= this.authService.Login(email,password);
    }else
    {
      if(!form.valid)
      {
        return;
      }
      authObs =  this.authService.SignUp(email,password);
    }
    authObs.subscribe(
      response => {
        console.log(response);
        this.router.navigate(['/recipe']);
        this.isLoging = false;
      }, errorMessage => {
        console.log(errorMessage);
        this.error= errorMessage;
        this.isLoging= false;
      }
    );
    form.reset();
  }

  constructor(private authService : AuthService,private router : Router) { }

  ngOnInit(): void {
  }


}
