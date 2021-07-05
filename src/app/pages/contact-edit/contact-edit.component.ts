import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact-service';

@Component({
  selector: 'contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.scss']
})
export class ContactEditComponent implements OnInit {

  constructor(private contactService: ContactService, private router: Router, private route: ActivatedRoute) { }
  contact: Contact
  subscription: Subscription

  ngOnInit(): void {
  this.subscription = this.route.data.subscribe(data => {
      this.contact = data.contact || this.contactService.getEmptyContact()
    })
    // this.route.params.subscribe(async params => {
    //   const { id } = params
    //   this.contact = id ? await this.contactService.getContactById(id).toPromise() : this.contactService.getEmptyContact()
    // })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  onSaveContact() {
    this.contactService.saveContact(this.contact)
    this.router.navigateByUrl('/contact')
  }
}
