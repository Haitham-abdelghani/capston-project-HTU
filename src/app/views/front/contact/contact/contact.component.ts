import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ServiceService } from 'src/app/lib/services/service.service';
import { contact } from 'src/app/mock/contact';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  messegecont: any;
  contactStore: any;

  // to get time of send message start
  time: any = new Date();
  times: any =
    this.time.getDate() +
    '/' +
    (this.time.getMonth() + 1) +
    '/' +
    this.time.getFullYear() +
    ' ' +
    this.time.getHours() +
    ':' +
    this.time.getMinutes() +
    ':' +
    this.time.getSeconds();
  // to get time of send message end

  constructor(
    private firestore: AngularFirestore,
    private service: ServiceService
  ) {}

  // function to set data in contact collection in firebase start
  contactData(contact: any) {
    let contactStore = contact.value;

    this.service
      .contactFunction({ ...contactStore, Date: this.times })
      .then(() => {
        this.messegecont = 'Request sent';
        window.location.reload();
      });
  }
  // function to set data in contact collection in firebase end
}
