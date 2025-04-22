using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace CMS.Backend.Models
{
    public class ArticleVersion
    {
        public int Id { get; set; }
        public int ArticleId { get; set; }
        public int VersionNumber { get; set; }
        public string HtmlContent { get; set; } = string.Empty;
        public DateTime VersionDate { get; set; }

        [JsonIgnore]
        [NotMapped] // ✅ Tells EF and validation to ignore this
        public Article? Article { get; set; } // ✅ Nullable to avoid validation errors
    }
}
