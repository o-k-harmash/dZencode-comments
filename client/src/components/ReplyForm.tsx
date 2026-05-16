export default function ReplyForm() {
  return (
    <form className="reply-form">
      <div className="reply-form__body">
        <img className="reply-form__avatar avatar" src="" alt="user avatar" />
        <textarea
          placeholder="Input your comment..."
          required
          className="reply-form__text-field"
        />
      </div>
      <button type="submit" className="reply-form__send-btn btn">
        Reply
      </button>
    </form>
  )
}
