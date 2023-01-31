import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { heros } from 'src/app/mock/heros';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { User } from 'src/app/mock/User';
import { hero } from 'src/app/mock/hero';
import { ServiceService } from 'src/app/lib/services/service.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css'],
})
export class AdminLayoutComponent implements OnInit, OnDestroy {
  messegeaddsector: any;
  closer?: string;
  lengthofrequest: any;

  // get data of user from auth start
  user$ = this.fireauth.authState.pipe(
    switchMap((val) => {
      if (val) {
        return this.firestore.collection<User>('users').doc(val.uid).get();
      } else {
        return of(null);
      }
    })
  );
  // get data of user from auth end

  constructor(
    private firestore: AngularFirestore,
    private fireauth: AngularFireAuth,
    private route: Router,
    private service: ServiceService
  ) {}

  ngOnInit(): void {
    // function to get length from valuechanges start
    this.firestore
      .collection<hero>('requestclint')
      .valueChanges()
      .subscribe((data) => {
        this.lengthofrequest = data.length;
      });
    // function to get length from valuechanges end
  }
  addsector(sectordata: any) {
    // function to set sector name in firestore start

    let formsector = sectordata.value;
    this.service.addSectorFunction({ ...formsector }).then(() => {
      this.messegeaddsector = 'success';
      this.closer = '';
      window.location.reload();
    });
  }
  // function to set sector name in firestore end

  // log out function start
  logout() {
    this.fireauth.signOut().then(() => {
      this.route.navigate(['/login']);
    });
  }
  // log out function end

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
}
