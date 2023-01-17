import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ServiceService } from 'src/app/lib/services/service.service';
import { hero } from 'src/app/mock/hero';

@Component({
  selector: 'app-startup',
  templateUrl: './startup.component.html',
  styleUrls: ['./startup.component.css'],
})
export class StartupComponent {
  messegeclint: any;
  percentage: any;
  constructor(
    private firestore: AngularFirestore,
    private service: ServiceService
  ) {}

  //  function add request from client to admin start
  addRequest(requestform: any) {
    let requestData = requestform.value;
    this.firestore
      .collection<hero>('requestclint')
      .doc()
      .set({
        company: requestData.company,
        sector: requestData.sector,
        city: requestData.city,
        founder: requestData.founder,
        Employees: requestData.Employees,
        yearOfEstablishment: requestData.yearOfEstablishment,
        email: requestData.email,
        phone: requestData.phone,
        logo: this.percentage,
      })
      .then(() => {
        this.messegeclint = 'request sent';
        window.location.reload();
      });
  }
  //  function add request from client to admin end

  // upload photo from firebase storage start

  upload(event: Event) {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (file) {
      this.service.uploadimage(file).subscribe((value) => {
        this.percentage = value;
      });
    }
  }
  // upload photo from firebase storage end
}
