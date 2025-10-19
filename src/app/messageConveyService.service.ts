import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {Users} from 'src/app/models/users.model'

@Injectable({
  providedIn: 'root'
})

export class MessageConveyService {

    public message = new Subject<Users>();
  
    constructor() { }
  
    setMessage(value) {
      this.message.next(value);
    }
  }