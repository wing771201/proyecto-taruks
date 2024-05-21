
import { TransaccionDetalle } from 'src/app/shared/models/transacciones/transaccion';

export class CalculadoraKit {

    public static CalcularConceptoKit(detalle: TransaccionDetalle) {
        return this.CalcularConcepto(detalle);
    }


    public static CalcularConcepto(detalle: TransaccionDetalle) {

        this.CalcularImportes(detalle);

        var result: ModelPrecio = new ModelPrecio();
        result.Precio = Math.round(detalle.Precio * 100) / 100;
        result.Subtotal = Math.round(detalle.Precio * detalle.Cantidad * 100) / 100;
        result.Descuento = Math.round(detalle.DescuentoImporte * 100) / 100;

        result.SubtotalNeto = result.Subtotal - result.Descuento;

        result.TrasladoIva = Math.round(result.SubtotalNeto * detalle.ImpuestoTrasladoIva * 100) / 100;
        result.TrasladoIeps = Math.round((result.SubtotalNeto) * detalle.ImpuestoTrasladoIeps * 100) / 100;
        result.RetencionIva = Math.round(result.SubtotalNeto * detalle.ImpuestoRetencionIva * 100) / 100;
        result.RetencionIsr = Math.round(result.SubtotalNeto * detalle.ImpuestoRetencionIsr * 100) / 100;

        result.Total = Math.round((result.SubtotalNeto
            + result.TrasladoIva
            + result.TrasladoIeps
            - result.RetencionIva
            - result.RetencionIsr
            + detalle.ImpuestoTrasladoLocalImporte
            - detalle.ImpuestoRetencionLocalImporte) * 100) / 100;

        return result;
    }

    private static CalcularImportes(detalle: TransaccionDetalle) {

        // Calcular subtotal
        detalle.Importe = Math.round(detalle.Precio * detalle.Cantidad * Math.pow(10, 6)) / Math.pow(10, 6);
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

    }
}

export class ModelPrecio {
    public Precio = 0;
    public Subtotal = 0;
    public Descuento = 0;
    public SubtotalNeto = 0;
    public TrasladoIva = 0;
    public TrasladoIeps = 0;
    public RetencionIva = 0;
    public RetencionIsr = 0;
    public Total = 0;


}
