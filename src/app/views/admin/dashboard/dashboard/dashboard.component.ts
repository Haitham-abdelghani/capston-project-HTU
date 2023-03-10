import { Component, OnInit } from '@angular/core';
import { hero } from 'src/app/mock/hero';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { heros } from 'src/app/mock/heros';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/lib/services/service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  getdata: any;
  nameOfSector: any;
  staticData: any;
  loading: boolean = true;

  constructor(
    private firestore: AngularFirestore,
    private route: Router,
    private service: ServiceService
  ) {}
  ngOnInit(): void {
    //  get name of sector to add for li start
    this.service.addsector().subscribe((data) => {
      this.nameOfSector = data.map((element) => {
        return {
          sectorName: element.payload.doc.data()['sectorName'],
        };
      });
    });
    //  get name of sector to add for li end

    // get data from firestore start

    this.service.getStartups().subscribe((data) => {
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

  // delete card start
  delete(id: any) {
    return this.firestore.collection('addstartup').doc(id).delete();
  }
  // delete card end
}
