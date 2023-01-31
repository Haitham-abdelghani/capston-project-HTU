import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ServiceService } from 'src/app/lib/services/service.service';
import { hero } from 'src/app/mock/hero';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  getdata: any;
  nameOfSector: any;
  loading: boolean = true;
  sub: Subscription | undefined;

  constructor(
    private firestore: AngularFirestore,
    private route: Router,
    private service: ServiceService
  ) {}

  ngOnInit(): void {
    // get data of sector  from firestore start

    this.sub = this.service.addsector().subscribe((data) => {
      this.nameOfSector = data.map((element) => {
        return {
          sectorName: element.payload.doc.data()['sectorName'],
        };
      });
    });
    // get data of sector  from firestore end
    // get data from firestore start
    this.service.getStartupsHome().subscribe((data) => {
      this.getdata = data;
    });
    setTimeout(() => {
      this.loading = false;
    }, 3000);

    // get data from firestore end
  }

  // function to filter startup by sector name start
  selectSector(key: any) {
    let vales = key.target.text;

    if (vales == 'ALL') {
      this.getdata = this.firestore
        .collection<hero>('addstartup')
        .valueChanges({ idField: 'id' })
        .subscribe((response) => {
          this.getdata = response;
        });
    } else {
      this.getdata = this.firestore
        .collection<hero>('addstartup', (ref) =>
          ref.where('sector', '==', vales)
        )
        .valueChanges({ idField: 'id' })
        .subscribe((response) => {
          this.getdata = response;
        });
    }
  }
  // function to filter startup by sector name end

  // get id to show details start
  details(id: any) {
    this.route.navigate(['/details/' + id]);
  }
  // get id to show details end
  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
