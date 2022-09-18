import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {

    if (this.authService.isLoggedIn) {
      this.router.navigate(['/user']);
    }

    this.loginForm = new FormGroup({
      "email": new FormControl(null, Validators.required), 
      "password": new FormControl(null, Validators.required), 
    })
  }

  login(){
    if(this.loginForm.invalid){
      this.loginForm.markAllAsTouched()
      return  
    }
    this.authService.login(this.loginForm.value, () => {
      this.loginForm.controls['password'].setErrors({ 'incorrect': true });
    });
  }

}
