using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Prompt
    {
        public int Id { get; set; }

        // מפתח זר ל־User
        [ForeignKey("User")]
        public int UserId { get; set; }

        public User? User { get; set; }

        // מפתח זר ל־Category
        [ForeignKey("Category")]
        public int CategoryId { get; set; }

        public Category? Category { get; set; }

        // מפתח זר ל־SubCategory
        [ForeignKey("SubCategory")]
        public int SubCategoryId { get; set; }

        public SubCategory? SubCategory { get; set; }

        [Required]
        public string Question { get; set; } = string.Empty; // זה הפרומפט עצמו שהמשתמש שואל

        public string Response { get; set; } = string.Empty; // מה ש־OpenAI מחזיר

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    }
}
