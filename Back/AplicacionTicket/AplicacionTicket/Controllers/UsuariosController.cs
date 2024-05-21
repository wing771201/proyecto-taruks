using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AplicacionTicket.Context;
using AplicacionTicket.Models;
using Microsoft.AspNetCore.Authorization;

namespace AplicacionTicket.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UsuariosController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Usuarios
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tabla_Usuario>>> GetUsuarios()
        {
            return await _context.Tabla_Usuario.ToListAsync();
        }

        // GET: api/Usuarios/Login
        [AllowAnonymous]
        [HttpGet("Login")]
        public async Task<ActionResult<Tabla_Usuario>> Login(string nombreUsuario, string passUsuario)
        {
            try
            {
                var usuario = await _context.Tabla_Usuario.FirstOrDefaultAsync(u => u.NombreUsuario == nombreUsuario && u.PassUsuario == passUsuario);
               
                if (usuario == null)
                {
                    return NotFound();
                }
                return Ok(usuario);
            }
            catch (Exception error)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error al obtener los datos: {error.Message}");
            }
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Tabla_Usuario>> GetUsuairos(int id)
        {
            var usuarios = await _context.Tabla_Usuario.FindAsync(id);

            if (usuarios == null)
            {
                return NotFound();
            }

            return usuarios;
        }

        // PUT: api/Usuairos/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUsuairos(int id, Tabla_Usuario usuarios)
        {
            if (id != usuarios.IdUsuario)
            {
                return BadRequest();
            }

            _context.Entry(usuarios).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UsuariosExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Usuairos
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Tabla_Usuario>> PostUsuairos(Tabla_Usuario usuarios)
        {
            usuarios.Negocio = null;
            usuarios.Perfil = null;

            _context.Tabla_Usuario.Add(usuarios);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUsuarios", new { id = usuarios.IdUsuario }, usuarios);
        }

        // DELETE: api/Usuairos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUsuarios(int id)
        {
            var usuarios = await _context.Tabla_Usuario.FindAsync(id);
            if (usuarios == null)
            {
                return NotFound();
            }

            _context.Tabla_Usuario.Remove(usuarios);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UsuariosExists(int id)
        {
            return _context.Tabla_Usuario.Any(e => e.IdUsuario == id);
        }
    }
}
