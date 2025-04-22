using System.ComponentModel.DataAnnotations;

namespace CMS.Backend.Models
{
    public enum ArticleStatus
    {
        Draft,
        InReview,
        Published
    }

    public class Article
    {
        public int Id { get; set; }

        [Required]
        public string Title { get; set; } = string.Empty;

        [Required]
        public string HtmlContent { get; set; } = string.Empty;

        public ArticleStatus Status { get; set; }

        public int CreatedByUserId { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime? PublishedDate { get; set; }

        public virtual ICollection<ArticleVersion> Versions { get; set; } = new List<ArticleVersion>();
    }
}
