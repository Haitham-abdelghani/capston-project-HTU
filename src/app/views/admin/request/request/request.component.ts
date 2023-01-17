import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { hero } from 'src/app/mock/hero';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css'],
})
export class RequestComponent implements OnInit {
  requestDate: any;
  constructor(private firestore: AngularFirestore) {}
  ngOnInit(): void {
    // get all requests uesers form database start
    this.firestore
      .collection<hero>('requestclint')
      .snapshotChanges()
      .subscribe((data) => {
        this.requestDate = data.map((element) => {
          return {
            id: element.payload.doc.id,
            company: element.payload.doc.data()['company'],
            sector: element.payload.doc.data()['sector'],
            city: element.payload.doc.data()['city'],
            founder: element.payload.doc.data()['founder'],
            Employees: element.payload.doc.data()['Employees'],
            yearOfEstablishment:
              element.payload.doc.data()['yearOfEstablishment'],
            email: element.payload.doc.data()['email'],
            phone: element.payload.doc.data()['phone'],
            logo: element.payload.doc.data()['logo'],
          };
        });
      });
    // get all requests uesers form database end
  }

  // delete request start
  deletrequest(id: any) {
    return this.firestore.collection('requestclint').doc(id).delete();
  }
  // delete request end

  // approve request start
  approve(part: any, id: any) {
    let approvedata = part;

    this.firestore.collection<hero>('addstartup').doc().set({
      company: approvedata.company,
      sector: approvedata.sector,
      city: approvedata.city,
      founder: approvedata.founder,
      Employees: approvedata.Employees,
      yearOfEstablishment: approvedata.yearOfEstablishment,
      email: approvedata.email,
      phone: approvedata.phone,
      logo: approvedata.logo,
    });
    this.firestore.collection('requestclint').doc(id).delete();
  }
  // approve request end
}
