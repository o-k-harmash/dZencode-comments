import ArrowUp from "../assets/arrow_sort_up.svg?react"
import ArrowDown from "../assets/arrow_sort_down.svg?react"
import type { IComment } from "@/types/comment"
import { useReducer } from "react"
import ReplyForm from "./ReplyForm"
import { useCommentsHook } from "@/hooks/useCommentsHook"

export interface CommentCardProps extends IComment {
  onDelete: () => Promise<void> | void
  onReply: () => Promise<void> | void
}

export default function CommentCard({
  id,
  createdAt,
  avatarUrl,
  nickname,
  text,
  repliesCount,
  onReply,
  onDelete,
}: CommentCardProps) {
  const { state, get, post, remove } = useCommentsHook(1, 25, "DateAsc", id)

  const [isReply, setReply] = useReducer((s) => !s, false)
  const [isReplies, setReplies] = useReducer((s) => !s, false)

  function toggleReplies() {
    const next = !isReplies
    setReplies()
    if (next && !state) {
      get()
    }
  }

  const date = new Date(createdAt)

  return (
    <>
      <div className="comment">
        <div className="comment__header">
          <div className="comment__profile">
            <img
              className="comment__avatar avatar"
              src={avatarUrl}
              alt="user avatar"
            />
            <div className="comment__meta">
              <span className="comment__author">{nickname}</span>
              <time className="comment__date">
                {`${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`}
              </time>
            </div>
          </div>
          <div className="comment__vote">
            <button className="comment__vote-btn">
              <ArrowUp></ArrowUp>
            </button>
            <span className="comment__vote-count">{"0"}</span>
            <button className="comment__vote-btn">
              <ArrowDown></ArrowDown>
            </button>
          </div>
        </div>
        <div className="comment__content">{text}</div>
        <div className="comment__footer">
          <div className="comment__replies">
            <button className="comment__states" onClick={toggleReplies}>
              replies ({repliesCount})
            </button>
            <button className="comment__states" onClick={setReply}>
              reply
            </button>
          </div>
          <button
            className="comment__delete-btn"
            onClick={async () => {
              await remove(id)
              onDelete()
            }}
          >
            Delete
          </button>
        </div>
      </div>
      {isReply && (
        <ReplyForm
          avatarUrl={avatarUrl}
          fromText=""
          onSubmit={async (text: string) => {
            await post({ text, avatarUrl, nickname, parentId: id })
            onReply()
          }}
        ></ReplyForm>
      )}
      {isReplies && state && state.totalCount > 0 && (
        <div className="node">
          {state.comments.map((c) => (
            <CommentCard
              onDelete={async () => {
                await onDelete()
                get()
              }}
              onReply={async () => {
                await onReply()
                get()
              }}
              key={c.id}
              {...c}
            />
          ))}
        </div>
      )}
    </>
  )
}
