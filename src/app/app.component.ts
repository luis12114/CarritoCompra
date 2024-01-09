import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/services/data.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  numItem: number = 0;
  data: any[] = [];
  subtotal: any = 0;
  costEnvios: any = 0;
  impuestos: any = 0;
  total: any = 0;
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getData().subscribe({
      next: (dataResponse: any) => {
        this.data = dataResponse;
        this.count(this.data);
      },
    });
  }

  public count(info: any[]) {
    this.subtotal = info
      .map((item) => parseInt(item.price_without_tax) * item.quantity)
      .reduce((prev, curr) => prev + curr, 0);
    this.costEnvios = info
      .map((item) => parseInt(item.shipping_fee) * item.quantity)
      .reduce((prev, curr) => prev + curr, 0);
    this.impuestos = info
      .map((item) => parseInt(item.tax) * item.quantity)
      .reduce((prev, curr) => prev + curr, 0);
    this.total = this.subtotal + this.costEnvios + this.impuestos;
  }

  public increment(filter: any) {
    this.numItem = 1;
    let datas = this.data.filter((todo: any) => todo.id == filter);
    datas[0].quantity = datas[0].quantity + this.numItem;
    this.count(this.data);
  }

  public decrement(data: any) {
    let comprobador = this.data.filter((todo: any) => todo.id == data);
    if ( comprobador[0].quantity== 0) {
      this.numItem == 0;
      let datas = this.data.filter((todo: any) => todo.id == data);
      datas[0].quantity = this.numItem;
      this.count(this.data);
    } else {
      let datas = this.data.filter((todo: any) => todo.id == data);
      datas[0].quantity = datas[0].quantity -1;
      this.count(this.data);
    }
  }

  public remove() {
    this.data = [];
    this.count(this.data);
  }

  public removeItem(id: any) {
    for (var i = this.data.length - 1; i >= 0; i--) {
      if (this.data[i].id == id) {
        this.data.splice(i, 1);
      }
    }
    this.count(this.data);
  }
}
