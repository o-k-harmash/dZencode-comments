using Microsoft.EntityFrameworkCore;

public static class GetCommentQuery
{
    public static IQueryable<GetCommentResponse> SelectGetCommentResponse(this IQueryable<Comment> query, AppDbContext dbContext)
    {
        return query
            .Select(c => new GetCommentResponse(
                c.Id,
                c.ParentId,
                c.Nickname,
                c.AvatarUrl,
                c.Text,
                c.CreatedAt,
                dbContext.Comments.Count(r => r.ParentId == c.Id)
            ))
            .AsNoTracking();
    }
}