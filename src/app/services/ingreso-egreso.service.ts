import { Injectable } from "@angular/core";

import "firebase/firestore";
import { AngularFirestore } from "@angular/fire/firestore";
import { IngresoEgreso } from "../models/ingreso-egreso.model";
import { AuthService } from "./auth.service";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class IngresoEgresoService {
  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService
  ) {}

  crearIngresoEgreso(ingresoEgreso: IngresoEgreso) {
    delete ingresoEgreso.uid;
    return this.firestore
      .doc(`${this.authService.user.uid}/ingreso-egreso`)
      .collection("items")
      .add({ ...ingresoEgreso });
  }

  initIngresoEgresoListener(uid: string) {
    return this.firestore
      .collection(`${uid}/ingreso-egreso/items`)
      .snapshotChanges()
      .pipe(
        map((snapshot) =>
          snapshot.map((doc: any) => ({
            uid: doc.payload.doc.id,
            ...(doc.payload.doc.data() as any),
          }))
        )
      );
  }

  borrarIngresoEgreso(uidItem: string) {
    return this.firestore
      .doc(`${this.authService.user.uid}/ingreso-egreso/items/${uidItem}`)
      .delete();
  }
}
