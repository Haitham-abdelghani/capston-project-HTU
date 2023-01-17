import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { last, Observable, Observer, switchMap } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  dash: any;
  // person: Observer<firebase.default.User>;
  constructor(
    private fireauth: AngularFireAuth,
    private firestorage: AngularFireStorage
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
