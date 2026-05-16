public record GetCommentResponse(
    Guid Id,
    Guid? ParentId,
    string Nickname,
    string AvatarUrl,
    string Text,
    DateTime CreatedAt,
    int RepliesCount
);