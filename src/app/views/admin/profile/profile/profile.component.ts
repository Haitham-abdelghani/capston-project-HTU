import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { of, switchMap } from 'rxjs';
import { contact } from 'src/app/mock/contact';

import { User } from 'src/app/mock/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  percentage: any;
  getdata: any;
  requestContact: any;

  // function to get id of user active start
  user$ = this.fireAuth.authState.pipe(
    switchMap((val) => {
      if (val) {
        return this.firestore.collection<User>('users').doc(val.uid).get();
      } else {
        return of(null);
      }
    })
  );
  // function to get id of user active end

  constructor(
    private firestore: AngularFirestore,
    private fireAuth: AngularFireAuth
  ) {}
  ngOnInit(): void {
    // get all requests contact uesers form database start
    this.firestore
      .collection<contact>('contact')
      .snapshotChanges()
      .subscribe((data) => {
        this.requestContact = data.map((element) => {
          return {
            id: element.payload.doc.id,
            Name: element.payload.doc.data()['Name'],
            Email: element.payload.doc.data()['Email'],
            Subject: element.payload.doc.data()['Subject'],
            Message: element.payload.doc.data()['Message'],
            Date: element.payload.doc.data()['Date'],
          };
        });
      });
    // get all requests contact uesers form database end}
  }
}
