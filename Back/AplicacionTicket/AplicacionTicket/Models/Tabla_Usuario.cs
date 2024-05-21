namespace AplicacionTicket.Models
{
    public class Tabla_Usuario
    {
        public int IdUsuario { get; set; }

        public int IdNegocio { get; set; }

        public int IdPerfil { get; set; }
        public string NombreUsuario { get; set; }

        public string PassUsuario { get; set; }

        public virtual Tabla_Negocio Negocio { get; set; }

        public virtual Tabla_Perfil Perfil { get; set; }
    }
}
