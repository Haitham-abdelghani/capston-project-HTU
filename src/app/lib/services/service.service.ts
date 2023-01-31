import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { last, switchMap } from 'rxjs';
import { contact } from 'src/app/mock/contact';

import { hero } from 'src/app/mock/hero';
import { heros } from 'src/app/mock/heros';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  dash: any;
  getdata: any;
  constructor(
    private fireauth: AngularFireAuth,
    private firestorage: AngularFireStorage,
    private firestore: AngularFirestore
  ) {
    // to get id of active admin start
    this.fireauth.user.subscribe((data) => {});
  }
  // to get id of active admin end

  signin(email: string, password: string) {
    return this.fireauth.signInWithEmailAndPassword(email, password);
  }

  uploadimage(file: File) {
    const filePath = `addstartup/${file.name}`;
    const storageRef = this.firestorage.ref(filePath);
    return storageRef
      .put(file)
      .snapshotChanges()
      .pipe(
        last(),
        switchMap((val) => {
          return storageRef.getDownloadURL();
        })
      );
  }

  addstartups(startupdata: any) {
    return this.firestore.collection<hero>('addstartup').add(startupdata);
  }
  addsector() {
    return this.firestore.collection<heros>('addsector').snapshotChanges();
  }

  getStartups() {
    return this.firestore.collection<hero>('addstartup').snapshotChanges();
  }

  getStartupsHome() {
    return this.firestore
      .collection<hero>('addstartup')
      .valueChanges({ idField: 'id' });
  }

  addSectorFunction(formsector: any) {
    return this.firestore.collection<heros>('addsector').add(formsector);
  }

  contactFunction(contactStore: any) {
    return this.firestore.collection<contact>('contact').add(contactStore);
  }

  addstartupsRequest(requestData: any) {
    return this.firestore.collection<hero>('requestclint').add(requestData);
  }
  addstartupsApprove(approvedata: any) {
    return this.firestore.collection<hero>('addstartup').add(approvedata);
  }
}
