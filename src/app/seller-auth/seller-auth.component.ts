import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit {
  alertText: boolean = false;
  userdata = {
    name: '',
    email: '',
    password: ''
  }
  signupForm: FormGroup | any;
  loginForm: FormGroup | any;
  isLogin: boolean = false;
  loginerror:boolean = false;
  constructor(private sellerService: SellerService, private router: Router) { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required])
    });
    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required])
    });

    this.signupForm.get('email').valueChanges.subscribe((val: any) => {
      this.sellerService.checkUser(val).subscribe((result: any) => {
        if (result.length > 0) {
          this.alertText = true;
        }
        else {
          this.alertText = false;
        }
      })
    })
    this.sellerService.reloadSeller();
  }

  signUp() {
    this.sellerService.checkUser(this.signupForm.value.email).subscribe((result: any) => {
      if (result.length > 0) {
        this.alertText = true;
      }
      else {
        this.sellerService.userSignUp(this.signupForm.value);
      }
    })
  }

  Login() {
    this.sellerService.userLogin(this.loginForm.value);
    this.sellerService.isLoginError.subscribe((iserror)=>{
      if(iserror){
        this.loginerror = true;
      }
    })
  }


  OpenLogin() {
    this.isLogin = true;
  }
  OpenSignUp() {
    this.isLogin = false;
  }
}


