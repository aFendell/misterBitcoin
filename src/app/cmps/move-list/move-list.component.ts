import { Component, Input, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { Move } from 'src/app/models/move';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user-service';

@Component({
  selector: 'move-list',
  templateUrl: './move-list.component.html',
  styleUrls: ['./move-list.component.scss']
})
export class MoveListComponent implements OnInit {
  @Input() contact: Contact
  @Input() movesToDisplay: Move[]
  @Input() title: string
  user: User

  constructor(private userService: UserService) { }
  filteredUserMoves = []
  ngOnInit(): void {
    this.user = this.userService.getLoggedinUser()
    this.filteredUserMoves = this.user.moves.filter((move, idx) => idx <= 2)
  }
}
