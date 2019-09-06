import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lms-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  login() {
    console.log('Running login.');
  }
}
