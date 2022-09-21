import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { AppState } from "src/app/app.reducer";
import { IngresoEgreso } from "src/app/models/ingreso-egreso.model";
import { IngresoEgresoService } from "src/app/services/ingreso-egreso.service";
import Swal from "sweetalert2";
import { AppStateWithIE } from "../ingreso-egreso.reducer";

@Component({
  selector: "app-detalle",
  templateUrl: "./detalle.component.html",
  styles: [],
})
export class DetalleComponent implements OnInit, OnDestroy {
  IngresosEgresos: IngresoEgreso[];
  ingresoSubs: Subscription;
  constructor(
    private store: Store<AppStateWithIE>,
    private ingresoEgresoService: IngresoEgresoService
  ) {}

  ngOnInit() {
    this.ingresoSubs = this.store
      .select("ingresosEgresos")
      .subscribe(({ items }) => (this.IngresosEgresos = items));
  }

  ngOnDestroy(): void {
    this.ingresoSubs?.unsubscribe();
  }

  borrar(uid) {
    this.ingresoEgresoService
      .borrarIngresoEgreso(uid)
      .then(() => Swal.fire("Borrado", "Item borrado", "success"))
      .catch((err) => Swal.fire("Error", err.message, "error"));
  }
}
