using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UsersController(AppDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// מחזיר את כל המשתמשים במערכת
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        /// <summary>
        /// מחפש משתמש לפי שם וטלפון
        /// </summary>
        [HttpPost("find")]
        public async Task<ActionResult<User>> FindUser([FromBody] User user)
        {
            var existing = await _context.Users
                .FirstOrDefaultAsync(u => u.Name == user.Name && u.Phone == user.Phone);

            if (existing == null)
                return NotFound();

            return Ok(existing);
        }

        /// <summary>
        /// מוסיף משתמש חדש
        /// </summary>
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUsers), new { id = user.Id }, user);
        }

        /// <summary>
        /// מחזיר משתמש לפי מזהה
        /// </summary>
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
                return NotFound();
            return Ok(user);
        }
    }
}