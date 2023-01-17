import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { hero } from 'src/app/mock/hero';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  dataquery: any;
  datafromstore: hero = {
    company: '',
    sector: '',
    city: '',
    founder: '',
    Employees: '',
    yearOfEstablishment: '',
    email: '',
    phone: '',
    logo: '',
  };
  constructor(
    private Firestore: AngularFirestore,
    private route: ActivatedRoute
  ) {
    // function to get id of path start
    this.route.params.subscribe((query) => {
      return (this.dataquery = query['id']);
    });
  }
  // function to get id of path end

  ngOnInit(): void {
    // function to get  data by id  from firebase start

    this.Firestore.collection<hero>('addstartup')
      .doc(this.dataquery)
      .valueChanges()
      .subscribe((res) => {
        if (res) this.datafromstore = res;
      });
  }
  // function to get  data by id  from firebase end
}
