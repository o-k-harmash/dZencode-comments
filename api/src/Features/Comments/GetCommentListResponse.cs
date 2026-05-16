public record GetCommentListResponse(
    IReadOnlyList<GetCommentResponse> Comments,
    int TotalCount,
    int Page,
    int Limit
);
