import { Injectable } from '@angular/core';
import { AngularFirestore,  AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Township } from '../models/township.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
 
@Injectable({
  providedIn: 'root'
})
export class TownshipService {
 
    townshipCollection: AngularFirestoreCollection<Township>;
    townships: Observable<Township[]>;
    taskDoc: AngularFirestoreDocument<Township>;
 
  constructor(public db: AngularFirestore) {
    this.townshipCollection = this.db.collection('townships', ref => ref.orderBy('amount', 'desc'));
    // this.tasks = this.afs.collection('tasks').valueChanges();
    this.townships = this.townshipCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Township;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
  }


  getTownshipsByAmount() {
    this.townshipCollection = this.db.collection('townships', ref => ref.orderBy('amount', 'desc'));

    this.townships = this.townshipCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Township;
        data.id = a.payload.doc.id;
        return data;
      });
    }));

    return this.townships; 
  }

  getTownshipsByName() {
    this.townshipCollection = this.db.collection('townships', ref => ref.orderBy('name'));

    this.townships = this.townshipCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Township;
        data.id = a.payload.doc.id;
        return data;
      });
    }));

    return this.townships; 
  }

  addTask(township: Township) {
    const param = JSON.parse(JSON.stringify(township));
    this.townshipCollection.add(param);
  }

  deleteAge(township: Township) {
    this.taskDoc = this.db.doc(`townships/${township.id}`);
    this.taskDoc.delete();
  }

  updateAge(township: Township) {
    this.taskDoc = this.db.doc(`townships/${township.id}`);
    this.taskDoc.update(township);
  }
}