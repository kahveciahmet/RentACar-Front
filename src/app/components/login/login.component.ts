import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, Form, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  host: {ngSkipHydration:'true'}
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  constructor(
    private formBuilder:FormBuilder, 
    private authService:AuthService,
    private toastrService:ToastrService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.createLoginForm();
  }
  

  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      email:["",Validators.required],
      password:["",Validators.required]
    })
  }

  login(){
    if(this.loginForm.valid){
      let loginModel = Object.assign({},this.loginForm.value)

      this.authService.login(loginModel).subscribe(response=>{
        this.toastrService.success("Giriş başarılı")
        localStorage.setItem("token",response.data.token)
        this.router.navigate(["/cars"]);
      },responseError=>{
        this.toastrService.error("Girdiğiniz kullanıcı adı veya şifre yanlış.")
      })
    }
  }

  navigateToRegister() {
    this.router.navigate(["/register"]);
  }

}
