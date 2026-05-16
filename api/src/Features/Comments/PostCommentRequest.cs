public record PostCommentRequest(
    string Text,
    string Nickname,
    string AvatarUrl,
    Guid? ParentId
);