using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class CommentsController: ControllerBase
{
    private readonly AppDbContext _dbContext;

    public CommentsController(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }
}