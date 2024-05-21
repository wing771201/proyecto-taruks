
import { CalculadoraKit } from './calculadoraKits';
import { Transaccion, TransaccionDetalle } from 'src/app/shared/models/transacciones/transaccion';

export class CalculaVentas {

    private _transaccion: Transaccion;
    private _Detalles: TransaccionDetalle[];
    Set(transaccion: Transaccion, detalles: TransaccionDetalle[]): void {
        this._transaccion = transaccion;
        this._Detalles = detalles;
    }

    Calcular(): void {
        if (this._Detalles.length == 0) {
            this._transaccion.SubTotal = 0;
            this._transaccion.Descuento = 0;
            this._transaccion.SubTotalNeto = 0;
            this._transaccion.ImpuestosIvaTrasladoImporte = 0;
            this._transaccion.ImpuestosIepsTrasladoImporte = 0;
            this._transaccion.ImpuestosIsrRetencionImporte = 0;
            this._transaccion.ImpuestosIvaRetencionImporte = 0;
            this._transaccion.ImpuestoRetencionLocalImporte = 0;
            this._transaccion.ImpuestoTrasladoLocalImporte = 0;
            this._transaccion.Total = 0;
            return;
        }

        let subtotal = 0;
        let descuento = 0;
        let subTotalNeto = 0;
        let trasladoIva = 0;
        let trasladoIeps = 0;
        let retencionIva = 0;
        let retencionIsr = 0;
        let impuestoRetencionLocalImporte = 0;
        let impuestoTrasladoLocalImporte = 0;
        let total = 0;

        // Recorrer los conceptos
        for (const det of this._Detalles) {
            //  this.CalcularConcepto(det);

            subtotal += det.Importe;
            descuento += det.DescuentoImporte;
            subTotalNeto += det.Importe - det.DescuentoImporte;
            trasladoIva += det.ImpuestoTrasladoIvaImporte;
            trasladoIeps += det.ImpuestoTrasladoIepsImporte;
            retencionIsr += det.ImpuestoRetencionIsrImporte;
            retencionIva += det.ImpuestoRetencionIvaImporte;

            if (det.ImpuestoRetencionLocalImporte) {
                impuestoRetencionLocalImporte += det.ImpuestoRetencionLocalImporte;
            }

            if (det.ImpuestoTrasladoLocalImporte) {
                impuestoTrasladoLocalImporte += det.ImpuestoTrasladoLocalImporte;
            }

        }

        total = Math.round((subTotalNeto +
            (Math.round(trasladoIva * 100) / 100) +
            (Math.round(trasladoIeps * 100) / 100) +
            - retencionIva
            - retencionIsr
            - impuestoRetencionLocalImporte
            + impuestoTrasladoLocalImporte) * 100) / 100;


        this._transaccion.SubTotal = Math.round(subtotal * Math.pow(10, 6)) / Math.pow(10, 6);
        this._transaccion.Descuento = Math.round(descuento * 100) / 100;
        this._transaccion.SubTotalNeto = Math.round(subTotalNeto * 100) / 100;
        // TODO: inconsistencia de decimales provocado por redondeo de iva al generar factura de día calcula una tasa de impuesto con más de dos decimales. se resolvió temporalmente redondenado la tasa de las partidas
        this._transaccion.ImpuestosIvaTrasladoImporte = Math.round(trasladoIva * Math.pow(10, 6)) / Math.pow(10, 6);
        this._transaccion.ImpuestosIepsTrasladoImporte = Math.round(trasladoIeps * Math.pow(10, 6)) / Math.pow(10, 6);
        this._transaccion.ImpuestosIsrRetencionImporte = Math.round(retencionIsr * Math.pow(10, 6)) / Math.pow(10, 6);
        this._transaccion.ImpuestosIvaRetencionImporte = Math.round(retencionIva * Math.pow(10, 6)) / Math.pow(10, 6);
        this._transaccion.ImpuestoTrasladoLocalImporte = Math.round(impuestoTrasladoLocalImporte * Math.pow(10, 6)) / Math.pow(10, 6);
        this._transaccion.ImpuestoRetencionLocalImporte = Math.round(impuestoRetencionLocalImporte * Math.pow(10, 6)) / Math.pow(10, 6);
        this._transaccion.Total = Math.round(total * 100) / 100;
    }

    /*    CalcularImportes(detalle: TransaccionDetalle) {
    
            // Calcular subtotal
            detalle.Importe = Math.round(detalle.Precio * detalle.Cantidad * Math.pow(10, 6)) / Math.pow(10, 6);
            // Calcular descuento
            detalle.DescuentoImporte = Math.round(detalle.Importe * detalle.Descuento);
            // Calcular SubtotalNETO
            detalle.ImporteNeto = Math.round((detalle.Importe - detalle.DescuentoImporte) * Math.pow(10, 6)) / Math.pow(10, 6);
            // Calcular IVA Trasladado
            detalle.ImpuestoTrasladoIvaImporte = Math.round(detalle.ImporteNeto * detalle.ImpuestoTrasladoIva * Math.pow(10, 6)) / Math.pow(10, 6);
            // Calcular IEPS Traslado
            detalle.ImpuestoTrasladoIepsImporte =
                Math.round(detalle.ImporteNeto * detalle.ImpuestoTrasladoIeps * Math.pow(10, 6)) / Math.pow(10, 6);
    
    
            // Calcular IVA Retencion
            detalle.ImpuestoRetencionIvaImporte = Math.round(detalle.ImporteNeto * detalle.ImpuestoRetencionIva * 100) / 100;
            // Calcular ISR Retencion
            detalle.ImpuestoRetencionIsrImporte = Math.round(detalle.ImporteNeto * detalle.ImpuestoRetencionIsr * 100) / 100;
            // Calculo de impuestos locales
    
            detalle.ImpuestoTrasladoLocalImporte = 0;
            detalle.ImpuestoRetencionLocalImporte = 0;
    
        }*/

    private CalcularConcepto(detalle: TransaccionDetalle): void {
        CalculadoraKit.CalcularConceptoKit(detalle);
    }
}

export function CalcularImportes(detalle: TransaccionDetalle) {

    // Calcular subtotal
    detalle.Importe = Math.round(detalle.Precio * detalle.Cantidad * Math.pow(10, 6)) / Math.pow(10, 6);
    // Calcular descuento
    detalle.DescuentoImporte = Math.round(detalle.Importe * detalle.Descuento);
    // Calcular SubtotalNETO
    detalle.ImporteNeto = Math.round((detalle.Importe - detalle.DescuentoImporte) * Math.pow(10, 6)) / Math.pow(10, 6);
    // Calcular IVA Trasladado
    detalle.ImpuestoTrasladoIvaImporte = Math.round(detalle.ImporteNeto * detalle.ImpuestoTrasladoIva * Math.pow(10, 6)) / Math.pow(10, 6);
    // Calcular IEPS Traslado
    detalle.ImpuestoTrasladoIepsImporte =
        Math.round(detalle.ImporteNeto * detalle.ImpuestoTrasladoIeps * Math.pow(10, 6)) / Math.pow(10, 6);


    // Calcular IVA Retencion
    detalle.ImpuestoRetencionIvaImporte = Math.round(detalle.ImporteNeto * detalle.ImpuestoRetencionIva * 100) / 100;
    // Calcular ISR Retencion
    detalle.ImpuestoRetencionIsrImporte = Math.round(detalle.ImporteNeto * detalle.ImpuestoRetencionIsr * 100) / 100;
    // Calculo de impuestos locales

    detalle.ImpuestoTrasladoLocalImporte = 0;
    detalle.ImpuestoRetencionLocalImporte = 0;

    detalle.TotalLinea = detalle.ImporteNeto + detalle.ImpuestoTrasladoIvaImporte + detalle.ImpuestoTrasladoIepsImporte + 
    detalle.ImpuestoRetencionIvaImporte + detalle.ImpuestoRetencionIsrImporte;
}
