/**
 * Get register data and send to database for add new user
 */

import { UserService } from './../../services/user.service';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{


  constructor(private router: Router, private user:UserService, private ngZone: NgZone){}

  // validate register form (Reactive)
  registerReactivo = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z]+')
    ]),
    lastname: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z]+')
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')
    ]),
    password: new FormControl('', [
      Validators.required
    ]),
    repeatpassword: new FormControl('', [
      Validators.required
    ]),
  })

  ngOnInit():void{}

  // send register data to service and add user
  submit(){

    var name      = this.registerReactivo.get('name')?.value; 
    var last_name = this.registerReactivo.get('lastname')?.value; 
    var email     = this.registerReactivo.get('email')?.value; 
    var pass      = this.registerReactivo.get('password')?.value;


    var data = {
      "name":      name,
      "last_name": last_name,
      "email":     email,
      "password":  pass,
      "role":      "client"
    }

    this.user.addUser(data)
    .subscribe(() => {
        this.ngZone.run(() => this.router.navigate(['login']))
      }, (err) => {
        
    });
  }
}
