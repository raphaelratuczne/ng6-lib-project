import { Component, OnInit } from '@angular/core';
import * as m from 'moment';
const moment = m;

@Component({
  selector: 'ble-teste',
  templateUrl: './teste.component.html',
  styleUrls: ['./teste.component.scss']
})
export class TesteComponent implements OnInit {

  public data = moment().format();

  constructor() { }

  ngOnInit() {
  }

}
