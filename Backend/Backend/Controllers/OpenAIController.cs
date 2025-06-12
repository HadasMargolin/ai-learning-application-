using Backend.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OpenAIController : ControllerBase
    {
        private readonly OpenAIService _openAIService;

        public OpenAIController(OpenAIService openAIService)
        {
            _openAIService = openAIService;
        }

        /// <summary>
        /// מקבל שאלה מהמשתמש ושולח אותה ל־OpenAI לקבלת תשובה
        /// </summary>
        [HttpPost("complete")]
        public async Task<IActionResult> GetCompletion([FromBody] PromptRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Question))
                return BadRequest("Question cannot be empty.");

            var answer = await _openAIService.GetCompletionAsync(request.Question);
            return Ok(new { response = answer });
        }
    }

    public class PromptRequest
    {
        public string Question { get; set; }
    }
}