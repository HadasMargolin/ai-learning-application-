using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class SubCategory
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; } = string.Empty;

        // מפתח זר ל־Category
        [ForeignKey("Category")]
        public int CategoryId { get; set; }

        // ניווט לקטגוריה הראשית
        public Category? Category { get; set; }

        // קשר אחד לרבים עם Prompts
        public ICollection<Prompt>? Prompts { get; set; }
    }
}
