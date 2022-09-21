import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { IngresoEgreso } from "src/app/models/ingreso-egreso.model";

import { ChartData, ChartType } from "chart.js";
import { AppStateWithIE } from "../ingreso-egreso.reducer";
@Component({
  selector: "app-estadistica",
  templateUrl: "./estadistica.component.html",
  styles: [],
})
export class EstadisticaComponent implements OnInit, OnDestroy {
  ingresos: number = 0;
  egresos: number = 0;

  totalIngresos: number = 0;
  totalEgresos: number = 0;
  itemsSubs: Subscription;

  public doughnutChartLabels: string[] = [
    "Download Sales",
    "In-Store Sales",
    "Mail-Order Sales",
  ];
  public doughnutChartData: ChartData = {
    labels: this.doughnutChartLabels,
    datasets: [{ data: [this.totalIngresos, this.totalEgresos] }],
  };
  public doughnutChartType: ChartType = "doughnut";

  constructor(private store: Store<AppStateWithIE>) {}

  ngOnInit() {
    this.itemsSubs = this.store
      .select("ingresosEgresos")
      .subscribe(({ items }) => this.generarEstadistica(items));
  }

  ngOnDestroy(): void {
    this.itemsSubs?.unsubscribe();
  }

  generarEstadistica(items: IngresoEgreso[]) {
    this.totalEgresos = 0;
    this.totalEgresos = 0;
    this.egresos = 0;
    this.ingresos = 0;
    for (const item of items) {
      if (item.tipo === "ingreso") {
        this.totalIngresos += item.monto;
        this.ingresos++;
      } else {
        this.totalEgresos += item.monto;
        this.egresos++;
      }
    }
  }
}
