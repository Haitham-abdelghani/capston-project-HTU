import { Component } from '@angular/core';
import { hero } from 'src/app/mock/hero';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ServiceService } from 'src/app/lib/services/service.service';
@Component({
  selector: 'app-addstartup',
  templateUrl: './addstartup.component.html',
  styleUrls: ['./addstartup.component.css'],
})
export class AddstartupComponent {
  messege: any;

  percentage?: string;
  pct: number = 100;
  constructor(
    private firestore: AngularFirestore,

    private service: ServiceService
  ) {}
  // add startup from form to firebase start
  addstartup(formaddstartup: any) {
    let startupdata = formaddstartup.value;
    this.firestore
      .collection<hero>('addstartup')
      .doc()
      .set({
        company: startupdata.company,
        sector: startupdata.sector,
        city: startupdata.city,
        founder: startupdata.founder,
        Employees: startupdata.Employees,
        yearOfEstablishment: startupdata.yearOfEstablishment,
        email: startupdata.email,
        phone: startupdata.phone,
        logo: this.percentage,
      })
      .then(() => {
        this.messege = 'Success Adding';
        window.location.reload();
      });
  }
  // add startup from form to firebase end

  // function to get photo from firebase storage start
  upload(event: Event) {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (file) {
      this.service.uploadimage(file).subscribe((value) => {
        this.percentage = value;
      });
    }
  }
  // function to get photo from firebase storage end
}
