using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;

        // Navigation property - כל משתמש יכול לשלוח הרבה פרומפטים
        public ICollection<Prompt>? Prompts { get; set; }
    }
}