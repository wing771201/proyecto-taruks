
import { DecimalPipe } from '@angular/common';
import { Component, EventEmitter, Input, NgModule, OnInit, Output, Pipe } from '@angular/core';


@Pipe({
  name: 'currencyPipe'
})
export class currencyPipe {
  transform(val: string, digits: number) {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: digits,
      maximumFractionDigits: digits
    }).format(Number(val));
  }
}


@NgModule({
  imports: [],
  declarations: [currencyPipe],
  exports: [currencyPipe],
  providers: [DecimalPipe]
})

export class PipeModule {

  static forRoot() {
    return {
      ngModule: PipeModule,
      providers: [],
    };
  }
}


@Component({
  selector: 'app-ctl-money-mask',
  templateUrl: './ctl-money-mask.component.html'
})
export class CtlMoneyMaskComponent implements OnInit {

  primero = true;

  @Input() myModel = 0;
  @Input() decimal = 2;
  @Output() changes: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {

  }

  change($event) {

    try {
      let format = this.unmask($event);
      let num = Number.parseFloat(format);
      if (!num) num = 0;
      this.myModel = num;
      this.changes.emit(num);

    } catch (e) {
      this.changes.emit(0);
    }


    // this.changeFix();
  }

  unmask(val) {
    val = val.replace('$', '');
    return val.replace(',', '');
  }

}
