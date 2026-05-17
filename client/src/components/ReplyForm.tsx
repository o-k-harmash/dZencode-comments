import { useEffect, useState } from "react"

export interface ReplyFormProps {
  fromText: string
  avatarUrl: string
  onSubmit: (text: string) => Promise<void> | void
}

export default function ReplyForm({
  onSubmit,
  fromText,
  avatarUrl,
}: ReplyFormProps) {
  const [text, setText] = useState(fromText)

  useEffect(() => {
    setText(fromText)
  }, [fromText])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSubmit(text)
  }

  return (
    <form className="reply-form" onSubmit={handleSubmit}>
      <div className="reply-form__body">
        <img
          className="reply-form__avatar avatar"
          src={avatarUrl}
          alt="user avatar"
        />
        <textarea
          placeholder="Input your comment..."
          value={text}
          required
          className="reply-form__text-field"
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <button type="submit" className="reply-form__send-btn btn">
        Reply
      </button>
    </form>
  )
}
