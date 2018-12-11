import { Component, OnInit } from '@angular/core';
import {AuthService} from '../AuthService';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private aS: AuthService) { }

  ngOnInit() {

  }

  onSubmit(f: NgForm) {

    this.aS.auth(f.value.email, f.value.password).then(res => {
      console.log(res);
      this.aS.logIn(true);
    }).catch( err => {
      console.warn(err);
    });

  }

}
