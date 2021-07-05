import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { Move } from 'src/app/models/move';
import { User } from 'src/app/models/user';
import { ContactService } from 'src/app/services/contact-service';
import { UserService } from 'src/app/services/user-service';

@Component({
  selector: 'contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})

export class ContactDetailsComponent implements OnInit {
  contact: Contact
  user: User
  amount: number
  movesToDisplay: Move[]
  title: string
  contactSubscription: Subscription
  userSubscription: Subscription

  constructor(
    private contactService: ContactService,
    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
  ) { }

  async ngOnInit(): Promise<void> {
    this.contactSubscription = this.route.data.subscribe(data => this.contact = data.contact)
    this.userSubscription = this.userService.user$.subscribe(user => this.user = user)
    this.movesToDisplay = this.userService.getMoves(this.contact._id)
    this.title = this.movesToDisplay.length > 0 ? `Your last ${this.movesToDisplay.length} moves` : `No moves yet`
  }

  onBack() {
    this.location.back()
  }

  async onDeleteContact() {
    await this.contactService.deleteContact(this.contact._id).toPromise()
    this.router.navigateByUrl('/contact')
  }

  onTransfer(amount: number) {
    console.log('transfer', amount);
    
    if (this.user.coins < amount) {
      alert('You don\'t have enough money')
      return
    } else {
      this.userService.addMove(this.contact, amount)
      this.movesToDisplay = this.userService.getMoves(this.contact._id)
      amount = null
      this.title = this.movesToDisplay.length > 0 ? `Your last ${this.movesToDisplay.length} moves` : `No moves yet`
    }
  }

  ngOnDestroy() {
    this.contactSubscription.unsubscribe()
    this.userSubscription.unsubscribe()
  }
}
