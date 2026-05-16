public class Comment
{
    public Guid Id { get; private set; }
    public Guid? ParentId { get; private set; } 

    //denormalization possible problem in interprise when user change his credentials like (username, avatar, etc.)
    //this fields stay in unsyncronise state
    public string Nickname { get; private set; }
    public string AvatarUrl { get; private set; } 

    public string Text { get; set; }
    public DateTime CreatedAt { get; private set; } 

    private Comment() { }

    public Comment(string text, string nickname, string avatarUrl, Guid? parentId)
    {
        Text = text;
        Nickname = nickname;
        AvatarUrl = avatarUrl;
        ParentId = parentId;
    }
}