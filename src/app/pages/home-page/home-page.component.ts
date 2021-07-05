import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Move } from 'src/app/models/move';
import { User } from 'src/app/models/user'
import { BitcoinService } from 'src/app/services/bitcoin-service';
import { UserService } from 'src/app/services/user-service';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  user: User
  subscribe: Subscription
  bitcoinRate$: Observable<string>
  movesToDisplay: Move[]
  title: string

  constructor(
    private userService: UserService,
    private bitcoinService: BitcoinService,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    // this.user = await this.userService.getUser().toPromise()
    this.subscribe = this.userService.user$.subscribe(user => this.user = user)
    this.bitcoinRate$ = this.bitcoinService.getRate()
    this.movesToDisplay = this.userService.getMoves('all')
    this.title = this.movesToDisplay.length > 0 ? 'Your Moves' : 'No Moves Yet'
  }

  onLogout() {
    this.userService.logout()
    this.router.navigateByUrl('/signup')
    this.subscribe.unsubscribe()
  }

  ngOnDistroy() {
    this.subscribe.unsubscribe()
  }
}
