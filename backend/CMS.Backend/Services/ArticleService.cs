using CMS.Backend.Data;
using CMS.Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace CMS.Backend.Services
{
    public class ArticleService
    {
        private readonly AppDbContext _db;

        public ArticleService(AppDbContext db)
        {
            _db = db;
        }

        public async Task<Article?> GetById(int id)
        {
            return await _db.Articles
                .Include(a => a.Versions)
                .FirstOrDefaultAsync(a => a.Id == id);
        }

        public async Task<List<Article>> GetPendingArticles()
        {
            return await _db.Articles
                .Where(a => a.Status == ArticleStatus.InReview)
                .ToListAsync();
        }

        public async Task<Article> CreateOrUpdateDraft(Article article, int userId)
        {
            article.CreatedByUserId = userId;
            article.CreatedDate = DateTime.UtcNow;
            article.Status = ArticleStatus.Draft;

            if (article.Id == 0)
                _db.Articles.Add(article);
            else
                _db.Articles.Update(article);

            await _db.SaveChangesAsync();

            var version = new ArticleVersion
            {
                ArticleId = article.Id,
                VersionNumber = article.Versions?.Count + 1 ?? 1,
                HtmlContent = article.HtmlContent,
                VersionDate = DateTime.UtcNow
            };

            _db.ArticleVersions.Add(version);
            await _db.SaveChangesAsync();

            return article;
        }

        public async Task<Article?> SubmitForReview(int articleId, int userId)
        {
            var article = await _db.Articles.FirstOrDefaultAsync(a => a.Id == articleId && a.CreatedByUserId == userId);
            if (article == null) return null;

            article.Status = ArticleStatus.InReview;
            await _db.SaveChangesAsync();
            return article;
        }

        public async Task<Article?> Publish(int articleId)
        {
            var article = await _db.Articles.FirstOrDefaultAsync(a => a.Id == articleId);
            if (article == null) return null;

            article.Status = ArticleStatus.Published;
            article.PublishedDate = DateTime.UtcNow;
            await _db.SaveChangesAsync();
            return article;
        }
    }
}
