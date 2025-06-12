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

        // GET: api/prompts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Prompt>>> GetPrompts()
        {
            return await _context.Prompts
                .Include(p => p.User)
                .Include(p => p.Category)
                .Include(p => p.SubCategory)
                .ToListAsync();
        }

        // POST: api/prompts
        [HttpPost]
        public async Task<ActionResult<Prompt>> PostPrompt(Prompt prompt)
        {
            // שליחת שאלה ל־OpenAI
            var aiResponse = await _openAIService.GetCompletionAsync(prompt.Question);
            prompt.Response = aiResponse;

            // שמירה במסד הנתונים
            _context.Prompts.Add(prompt);
            await _context.SaveChangesAsync();

            // שליפה מחדש כדי לכלול קשרים
            var fullPrompt = await _context.Prompts
                .Include(p => p.User)
                .Include(p => p.Category)
                .Include(p => p.SubCategory)
                .FirstOrDefaultAsync(p => p.Id == prompt.Id);

            return CreatedAtAction(nameof(GetPrompts), new { id = prompt.Id }, fullPrompt);
        }
        // GET: api/prompts/user/5
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
        // DELETE: api/prompts/user/5
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



        // PUT: api/prompts/5
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
    }
}
