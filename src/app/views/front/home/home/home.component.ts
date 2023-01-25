import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { hero } from 'src/app/mock/hero';
import { heros } from 'src/app/mock/heros';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  getdata: any;
  nameOfSector: any;
  loading: boolean = true;
  constructor(private firestore: AngularFirestore, private route: Router) {}

  ngOnInit(): void {
    // get data of sector  from firestore start

    this.firestore
      .collection<heros>('addsector')
      .snapshotChanges()
      .subscribe((data) => {
        this.nameOfSector = data.map((element) => {
          return {
            sectorName: element.payload.doc.data()['sectorName'],
          };
        });
      });
    // get data of sector  from firestore end

    // get data from firestore start

    this.firestore
      .collection<hero>('addstartup')
      .snapshotChanges()
      .subscribe((data) => {
        this.getdata = data.map((element) => {
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
        setTimeout(() => {
          this.loading = false;
        }, 3000);
      });
    // get data from firestore end
  }

  // function to filter startup by sector name start
  selectSector(key: any) {
    let vales = key.target.text;
    console.log(vales);
    console.log(typeof vales);
    if (vales == 'ALL') {
      this.getdata = this.firestore
        .collection<hero>('addstartup')
        .valueChanges({ idField: 'id' })
        .subscribe((response) => {
          this.getdata = response;
          console.log(this.getdata);
        });
    } else {
      this.getdata = this.firestore
        .collection<hero>('addstartup', (ref) =>
          ref.where('sector', '==', vales)
        )
        .valueChanges({ idField: 'id' })
        .subscribe((response) => {
          this.getdata = response;
          console.log(this.getdata);
        });
    }
  }
  // function to filter startup by sector name end

  // get id to show details start
  details(id: any) {
    this.route.navigate(['/details/' + id]);
  }
  // get id to show details end
}
