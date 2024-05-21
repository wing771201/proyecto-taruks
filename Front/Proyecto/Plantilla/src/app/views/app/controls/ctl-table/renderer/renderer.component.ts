import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-button-renderer',
  templateUrl: './renderer.component.html'
})

export class ButtonRendererComponent implements ICellRendererAngularComp {

  params;
  label: string;

  edit: boolean = false;
  save: boolean = false;
  delete: boolean = false;
  view: boolean = false;

  type: number = 0;


  agInit(params): void {
    this.params = params;
    this.label = this.params.label || null;

    this.type = this.params.type || null;
    if (this.type) {
      switch (this.type) {
        case 1: this.save = true; break;
        case 2: this.delete = true; break;
        case 3: this.edit = true; break;
        case 4: this.view = true; break;
      }
    }
  }

  refresh(params?: any): boolean {
    return true;
  }

  onClick($event) {
    if (this.params.onClick instanceof Function) {
      // put anything into params u want pass into parents component
      const params = {
        event: $event,
        rowData: this.params.node.data
        // ...something
      }
      this.params.onClick(params);

    }
  }
}