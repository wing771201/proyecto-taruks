namespace AplicacionTicket.Models
 
{
    public class Tabla_Perfil
    {
        public int IdPerfil { get; set; }
        

        public int IdNegocio { get; set; }

        public  string nombrePerfil { get; set; }

        public  string menu { get; set; }

        public virtual Tabla_Negocio Negocio { get; set; }


    }
}
