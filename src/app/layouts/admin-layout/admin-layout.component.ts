import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { heros } from 'src/app/mock/heros';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { User } from 'src/app/mock/User';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css'],
})
export class AdminLayoutComponent {
  messegeaddsector: any;
  closer?: string;

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
    private route: Router
  ) {}
  addsector(sectordata: any) {
    // function to set sector name in firestore start

    let formsector = sectordata.value;
    this.firestore
      .collection<heros>('addsector')
      .doc()
      .set({
        sectorName: formsector.sectorName,
      })
      .then(() => {
        this.messegeaddsector = 'success';
        this.closer = '';
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
}
