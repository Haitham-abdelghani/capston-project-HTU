import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { contact } from 'src/app/mock/contact';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  messegecont: any;
  contactStore: any;
  constructor(private firestore: AngularFirestore) {}

  // function to set data in contact collection in firebase start
  contactData(contact: any) {
    let contactStore = contact.value;
    this.firestore
      .collection<contact>('contact')
      .doc()
      .set({
        Name: contactStore.Name,
        Email: contactStore.Email,
        Subject: contactStore.Subject,
        Message: contactStore.Message,
      })
      .then(() => {
        this.messegecont = 'Request sent';
        window.location.reload();
      });
  }
  // function to set data in contact collection in firebase end
}