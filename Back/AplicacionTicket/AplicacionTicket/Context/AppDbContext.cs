using AplicacionTicket.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.Data.Entity.ModelConfiguration;

namespace AplicacionTicket.Context
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }
        public DbSet<Tabla_Negocio> Tabla_Negocio { get; set; }
        public DbSet<Tabla_Perfil> Tabla_Perfil { get; set; }
        public DbSet<Tabla_Usuario> Tabla_Usuario { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.ApplyConfiguration(new NegocioConfiguration());
            modelBuilder.ApplyConfiguration(new PerfilConfiguration());
            modelBuilder.ApplyConfiguration(new UsuarioConfiguration());


            base.OnModelCreating(modelBuilder);
        }
        public class NegocioConfiguration : IEntityTypeConfiguration<Tabla_Negocio>
        {
            public void Configure(EntityTypeBuilder<Tabla_Negocio> builder)
            {
                builder.ToTable("Tabla_Negocio");
                builder.HasKey(x => x.IdNegocio);
                
            }
        }

        public class PerfilConfiguration : IEntityTypeConfiguration<Tabla_Perfil>
        {
            public void Configure(EntityTypeBuilder<Tabla_Perfil> builder)
            {
                builder.ToTable("Tabla_Perfil");
                builder.HasKey(x => x.IdPerfil);
                builder.HasOne(o => o.Negocio).WithMany().HasForeignKey(o => o.IdNegocio);
            }
        }

        public class UsuarioConfiguration : IEntityTypeConfiguration<Tabla_Usuario>
        {
            public void Configure(EntityTypeBuilder<Tabla_Usuario> builder)
            {
                builder.ToTable("Tabla_Usuario");
                builder.HasKey(x => x.IdUsuario);
                builder.HasOne(o => o.Negocio).WithMany().HasForeignKey(o => o.IdNegocio);
                builder.HasOne(o => o.Perfil).WithMany().HasForeignKey(o => o.IdPerfil);

            }
        }
       
    }
}
