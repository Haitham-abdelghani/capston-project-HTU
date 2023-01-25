import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { last, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  dash: any;
  // person: Observer<firebase.default.User>;
  constructor(
    private fireauth: AngularFireAuth,
    private firestorage: AngularFireStorage,
    private firestore: AngularFirestore
  ) {
    this.fireauth.user.subscribe((data) => {
      // this.person = data?.uid;
    });
  }

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
}
