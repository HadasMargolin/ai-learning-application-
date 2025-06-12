
using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers

{
    [Route("api/[controller]")]
    [ApiController]
    public class SubCategoriesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public SubCategoriesController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/subcategories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SubCategory>>> GetSubCategories()
        {
            return await _context.SubCategories
                .Include(sc => sc.Category) // כולל את הקטגוריה שאליה זה שייך
                .ToListAsync();
        }

        // POST: api/subcategories
        [HttpPost]
        public async Task<ActionResult<SubCategory>> PostSubCategory(SubCategory subCategory)
        {
            _context.SubCategories.Add(subCategory);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetSubCategories), new { id = subCategory.Id }, subCategory);
        }
    }
}

