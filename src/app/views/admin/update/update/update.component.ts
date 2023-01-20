import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { hero } from 'src/app/mock/hero';
import { ServiceService } from 'src/app/lib/services/service.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
})
export class UpdateComponent implements OnInit {
  dataquery: any;
  messege: any;
  percentage: any;
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
    private route: ActivatedRoute,
    private firestore: AngularFirestore,
    private service: ServiceService
  ) {
    this.route.params.subscribe((query) => {
      return (this.dataquery = query['id']);
    });
  }
  ngOnInit(): void {
    this.firestore
      .collection<hero>('addstartup')
      .doc(this.dataquery)
      .valueChanges()
      .subscribe((res) => {
        if (res) this.datafromstore = res;
      });
  }

  updatestartup(dataAfterupdate: any) {
    if (this.percentage) {
      this.firestore
        .collection<hero>('addstartup')
        .doc(this.dataquery)
        .update({ ...dataAfterupdate, logo: this.percentage });
    } else {
      this.firestore
        .collection<hero>('addstartup')
        .doc(this.dataquery)
        .update({ ...dataAfterupdate });
    }
  }

  upload(event: Event) {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (file) {
      this.service.uploadimage(file).subscribe((value) => {
        this.percentage = value;
      });
    }
  }
}
