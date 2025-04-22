using CMS.Backend.Models;
using CMS.Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace CMS.Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ArticleController : ControllerBase
    {
        private readonly ArticleService _service;

        public ArticleController(ArticleService service)
        {
            _service = service;
        }

        [HttpPost]
        [Authorize(Roles = "Creator")]
        public async Task<IActionResult> CreateDraft([FromBody] Article article)
        {
            int userId = int.Parse(User.FindFirst("id")?.Value ?? "0");
            var savedArticle = await _service.CreateOrUpdateDraft(article, userId);
            return Ok(savedArticle);
        }

        [HttpPost("submit")]
        [Authorize(Roles = "Creator")]
        public async Task<IActionResult> Submit([FromQuery] int articleId)
        {
            int userId = int.Parse(User.FindFirst("id")?.Value ?? "0");
            var result = await _service.SubmitForReview(articleId, userId);
            if (result == null) return NotFound();
            return Ok(result);
        }

        [HttpGet("pending")]
        [Authorize(Roles = "Editor")]
        public async Task<IActionResult> GetPending()
        {
            var articles = await _service.GetPendingArticles();
            return Ok(articles);
        }

        [HttpPut("{id}/publish")]
        [Authorize(Roles = "Editor")]
        public async Task<IActionResult> Publish(int id)
        {
            var article = await _service.Publish(id);
            if (article == null) return NotFound();
            return Ok(article);
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetArticle(int id)
        {
            var article = await _service.GetById(id);
            if (article == null) return NotFound();
            return Ok(article);
        }
    }
}
