using Backend.Data;
using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PromptsController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly OpenAIService _openAIService;

        public PromptsController(AppDbContext context, OpenAIService openAIService)
        {
            _context = context;
            _openAIService = openAIService;
        }

        /// <summary>
        /// מחזיר את כל הפרומפטים עם קשרים (User, Category, SubCategory)
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Prompt>>> GetPrompts()
        {
            return await _context.Prompts
                .Include(p => p.User)
                .Include(p => p.Category)
                .Include(p => p.SubCategory)
                .ToListAsync();
        }

        /// <summary>
        /// יוצר פרומפט חדש, שולח ל־OpenAI, שומר במסד ומחזיר אותו
        /// </summary>
        [HttpPost]
        public async Task<ActionResult<Prompt>> PostPrompt(Prompt prompt)
        {
            var aiResponse = await _openAIService.GetCompletionAsync(prompt.Question);
            prompt.Response = aiResponse;

            _context.Prompts.Add(prompt);
            await _context.SaveChangesAsync();

            var fullPrompt = await _context.Prompts
                .Include(p => p.User)
                .Include(p => p.Category)
                .Include(p => p.SubCategory)
                .FirstOrDefaultAsync(p => p.Id == prompt.Id);

            return CreatedAtAction(nameof(GetPrompts), new { id = prompt.Id }, fullPrompt);
        }

        /// <summary>
        /// מחזיר את כל הפרומפטים של משתמש לפי מזהה
        /// </summary>
        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<Prompt>>> GetPromptsByUser(int userId)
        {
            return await _context.Prompts
                .Where(p => p.UserId == userId)
                .Include(p => p.Category)
                .Include(p => p.SubCategory)
                .OrderByDescending(p => p.CreatedAt)
                .ToListAsync();
        }

        /// <summary>
        /// מוחק את כל הפרומפטים של משתמש לפי מזהה
        /// </summary>
        [HttpDelete("user/{userId}")]
        public async Task<IActionResult> DeleteUserPrompts(int userId)
        {
            var userPrompts = await _context.Prompts
                .Where(p => p.UserId == userId)
                .ToListAsync();

            if (userPrompts == null || userPrompts.Count == 0)
                return NotFound();

            _context.Prompts.RemoveRange(userPrompts);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        /// <summary>
        /// מעדכן פרומפט לפי מזהה
        /// </summary>
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPrompt(int id, Prompt updatedPrompt)
        {
            if (id != updatedPrompt.Id)
                return BadRequest("Prompt ID mismatch");

            var existingPrompt = await _context.Prompts
                .Include(p => p.User)
                .Include(p => p.Category)
                .Include(p => p.SubCategory)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (existingPrompt == null)
                return NotFound();

            existingPrompt.Question = updatedPrompt.Question;
            existingPrompt.Response = updatedPrompt.Response;
            existingPrompt.UserId = updatedPrompt.UserId;
            existingPrompt.CategoryId = updatedPrompt.CategoryId;
            existingPrompt.SubCategoryId = updatedPrompt.SubCategoryId;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Prompts.Any(p => p.Id == id))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();
        }

        /// <summary>
        /// מחזיר את כל הפרומפטים במערכת עם קשרים
        /// </summary>
        [HttpGet("all")]
        public async Task<ActionResult<IEnumerable<Prompt>>> GetAllPrompts()
        {
            var prompts = await _context.Prompts
                .Include(p => p.User)
                .Include(p => p.Category)
                .Include(p => p.SubCategory)
                .ToListAsync();

            return Ok(prompts);
        }
    }
}