import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";

@Component({
  selector: "app-ctl-input-hora",
  templateUrl: "./ctl-input-hora.component.html",
})
export class CtlInputHoraComponent implements OnInit {
  inicio: Date = new Date();
  inicioM: Date = new Date();

  @Input() titulo = '';
  @Input() fechaDefault?: Date;
  @Output() cGFecha = new EventEmitter<any>();

  hora = "1";
  minuto = "00";
  dia = "am";

  horas: any[] = [
    { value: "1" }, { value: "2" },
    { value: "3" }, { value: "4" },
    { value: "5" }, { value: "6" }, { value: "7" },
    { value: "8" }, { value: "9" },
    { value: "10" }, { value: "11" }, { value: "12" }];


  minutos: any[] = [
    { value: "00" }, { value: "15" },
    { value: "30" }, { value: "45" }];

  dias: any[] = [
    { value: "am" }, { value: "pm" }];

  constructor() {

  }

  ngOnInit(): void {
    if (this.fechaDefault) {

      this.inicio = this.fechaDefault;
      this.inicioM = this.fechaDefault;

      var split = this.fechaDefault.toString().split("T" || "t");
      split = split[1].split(":");

      let hoursLet = + split[0];
      this.hora= hoursLet.toString();
      this.minuto = split[1];
      this.dia = "am";
      if (hoursLet > 11) {
        switch (hoursLet) {
          case 12: this.hora = "12"; break;
          case 13: this.hora = "1"; break;
          case 14: this.hora = "2"; break;
          case 15: this.hora = "3"; break;
          case 16: this.hora = "4"; break;
          case 17: this.hora = "5"; break;
          case 18: this.hora = "6"; break;
          case 19: this.hora = "7"; break;
          case 20: this.hora = "8"; break;
          case 21: this.hora = "9"; break;
          case 22: this.hora = "10"; break;
          case 23: this.hora = "11"; break;
        }
        this.dia = "pm";
      } else {
        if (hoursLet == 0) {
          this.hora = "12";
        }
      }

      this.changeHour();
    } else {
      this.inicio = null;
      this.inicioM = null;
    }
  }

  cambiar($event) {
    const split = $event.split(':');
    const date = new Date(2020, 1, 1, parseInt(split[0]), parseInt(split[1]));

    date.setDate(date.getDate());
    this.inicioM = date;
    const result = //this.inicioM.toDateString() + ' ' +
      this.inicioM.toLocaleTimeString();

    this.cGFecha.emit(result);
  }

  changeHour() {
    if (!this.minuto) {
      this.minuto = "00";
    }
    if (!this.hora) {
      this.hora = "1";
    }

    if (!this.dia) {
      this.dia = "am";
    }

    let horaResult = this.hora;
    if (this.dia == "pm") {
      switch (this.hora) {
        case "1": horaResult = "13"; break;
        case "2": horaResult = "14"; break;
        case "3": horaResult = "15"; break;
        case "4": horaResult = "16"; break;
        case "5": horaResult = "17"; break;
        case "6": horaResult = "18"; break;
        case "7": horaResult = "19"; break;
        case "8": horaResult = "20"; break;
        case "9": horaResult = "21"; break;
        case "10": horaResult = "22"; break;
        case "11": horaResult = "23"; break;
        case "12": horaResult = "12"; break;
      }
    } else {
      switch (this.hora) {
        case "12": horaResult = "00"; break;
      }
    }

    var horaFinal = horaResult + ":" + this.minuto + ":" + "00";
    this.cGFecha.emit(horaFinal);
  }
}
