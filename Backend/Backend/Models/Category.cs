using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class Category
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; } = string.Empty;

        // קשר אחד לרבים עם SubCategories
        public ICollection<SubCategory>? SubCategories { get; set; }

        // קשר אחד לרבים עם Prompts (אם נרצה לשמור גם ב־Prompt את category_id)
        public ICollection<Prompt>? Prompts { get; set; }
    }
}