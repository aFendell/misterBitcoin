import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { Contact } from '../models/contact.model';
import { Move } from '../models/move';
import { User } from '../models/user';

const user: User = {
  name: 'Coco from Eilat',
  coins: 500,
  moves: []
}


@Injectable({
  providedIn: 'root'
})

export class UserService {
  private _key: string = 'user_db'
  private _user$ = new BehaviorSubject(this.getLoggedinUser() || null)
  // private _user$ = new BehaviorSubject(this._load(this._key) || null)
  public user$ = this._user$.asObservable()

  public getUser() {
    return user ? of(user) : Observable.throw('Contact found user')
  }

  public signUp(name: string) {
    const user: User = { name, coins: 100, moves: [] }
    this._saveSessionUser(user)
    // this._save(this._key, user)
    this._user$.next(user)
  }

  public addMove(contact: Contact, amount: number) {
    let user: User = this.getLoggedinUser()
    // let user: User = this._load(this._key)
    user.coins = user.coins - amount
    const move: Move = { toId: contact._id, to: contact.name, at: Date.now(), amount}
    user.moves.unshift(move)
    this._saveSessionUser(user)
    // this._save(this._key, user)
    this._user$.next(user)
  }

  public logout() {
    sessionStorage.clear()
    // this._save(this._key, '')
  }

  public getMoves(contactId: string) {
    const moves = this.getLoggedinUser().moves
    // const moves = this._load(this._key).moves
    if (!moves) return []
    if (contactId === 'all') return moves
    else return moves.filter((move: Move) => move.toId === contactId)
  }

  // session storage
  private _saveSessionUser(user) {
    sessionStorage.setItem('loggedinUser', JSON.stringify(user))
    return user
  }

  public getLoggedinUser() {
    let user =JSON.parse(sessionStorage.getItem('loggedinUser'))
    return user
  }

  // local storage
  private _save(key: string, val: any) {
    localStorage.setItem(key, JSON.stringify(val))
  }

  private _load(key: string) {
    var val = localStorage.getItem(key)
    return JSON.parse(val)
  }
}