import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user-service';

@Component({
  selector: 'signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {
  name: string

  constructor(
    private userService: UserService,
    private router: Router
    ) { }

  onSignup() {
    const userName = this.name
    this.userService.signUp(this.name)
    this.router.navigateByUrl('/')
  }

  ngOnInit(): void {
  }
}
