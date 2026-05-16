using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class CommentsController: ControllerBase
{
    private readonly AppDbContext _dbContext;

    public CommentsController(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetComment([FromRoute] Guid id)
    {
        var comment = await _dbContext.Comments
            .SelectGetCommentResponse(_dbContext)
            .FirstOrDefaultAsync(c => c.Id == id);
        
        if (comment == null)
        {
            return NotFound();
        }
    
        return Ok(comment);
    }

    [HttpGet]
    public async Task<IActionResult> GetCommentList(
        [FromQuery] Guid? parentId = null,
        [FromQuery] CommentSort? sort = null,
        [FromQuery] int page = 0,
        [FromQuery] int limit = 25)
    {
        var query = _dbContext.Comments
            .AsQueryable()
            .Where(c => c.ParentId == parentId);

        if (sort == CommentSort.DateAsc)
            query = query.OrderBy(c => c.CreatedAt);
        else if (sort == CommentSort.DateDesc)
            query = query.OrderByDescending(c => c.CreatedAt);

        var total = query.Count();

        var comments = await query
            .Skip(page * limit)
            .Take(limit)
            .SelectGetCommentResponse(_dbContext)
            .ToListAsync();

        var list = new GetCommentListResponse(comments,
            total, 
            page, 
            limit
        );

        return Ok(list);
    }

    [HttpPost]
    public async Task<IActionResult> PostComment([FromBody] PostCommentRequest request)
    {
        var comment = new Comment(request.Text, 
            request.Nickname, 
            request.AvatarUrl, 
            request.ParentId);

        _dbContext.Comments.Add(comment);
        await _dbContext.SaveChangesAsync();

        return CreatedAtAction(nameof(GetComment), new { id = comment.Id }, new { comment.Id });
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateComment([FromRoute] Guid id, [FromBody] PutCommentRequest request)
    {
        var comment = await _dbContext.Comments.FindAsync(id);

        if (comment == null)
        {
            return NotFound();
        }

        comment.Text = request.Text;

        await _dbContext.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteComment([FromRoute] Guid id)
    {
        var comment = await _dbContext.Comments.FindAsync(id);

        if (comment == null)
        {
            return NotFound();
        }

        _dbContext.Comments.Remove(comment);
        await _dbContext.SaveChangesAsync();

        return NoContent();
    }
}