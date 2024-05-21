using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AplicacionTicket.Context;
using AplicacionTicket.Models;

namespace AplicacionTicket.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PerfilesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PerfilesController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Perfiles
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tabla_Perfil>>> GetPerfiles_1()
        {
            return await _context.Tabla_Perfil.ToListAsync();
        }

        // GET: api/Perfiles/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Tabla_Perfil>> GetPerfiles(int id)
        {
            var perfiles = await _context.Tabla_Perfil.FindAsync(id);

            if (perfiles == null)
            {
                return NotFound();
            }

            return perfiles;
        }

        // PUT: api/Perfiles/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPerfiles(int id, Tabla_Perfil perfiles)
        {
            if (id != perfiles.IdPerfil)
            {
                return BadRequest();
            }

            _context.Entry(perfiles).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PerfilesExists(id))
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

        // POST: api/Perfiles
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Tabla_Perfil>> PostPerfiles(Tabla_Perfil perfiles)
        {
            perfiles.Negocio = null;
            _context.Tabla_Perfil.Add(perfiles);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPerfiles", new { id = perfiles.IdPerfil }, perfiles);
        }

        // DELETE: api/Perfiles/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePerfiles(int id)
        {
            var perfiles = await _context.Tabla_Perfil.FindAsync(id);
            if (perfiles == null)
            {
                return NotFound();
            }

            _context.Tabla_Perfil.Remove(perfiles);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PerfilesExists(int id)
        {
            return _context.Tabla_Perfil.Any(e => e.IdPerfil == id);
        }
    }
}
