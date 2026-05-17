import CommentCard from "@/components/CommentCard"
import ReplyForm from "@/components/ReplyForm"
import { useCommentsHook } from "@/hooks/useCommentsHook"
import type { SortType } from "@/types/comment"
import { useEffect } from "react"

export default function Comments() {
  const { state, get, post, page, limit, sort, setPage, setLimit, setSort } =
    useCommentsHook(1, 25, "DateAsc")

  useEffect(() => {
    get()
  }, [page, limit, sort])

  return (
    <>
      <form className="filters">
        <label>
          Page:
          <input
            type="number"
            value={page}
            min={1}
            onKeyDown={(e) => e.preventDefault()}
            onChange={(e) => setPage(Number(e.target.value))}
          />
        </label>
        <label>
          Limit:
          <select
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="25">25</option>
          </select>
        </label>
        <label>
          Sort:
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortType)}
          >
            <option value="DateAsc">Date Asc</option>
            <option value="DateDesc">Date Desc</option>
          </select>
        </label>
      </form>

      {state && (
        <div>
          <ReplyForm
            avatarUrl="/anonimus_avatar.png"
            onSubmit={(text: string) =>
              post({
                text,
                avatarUrl: "/anonimus_avatar.png",
                nickname: "Alex",
              })
            }
            fromText={""}
          ></ReplyForm>
          <div className="node">
            {state.comments.map((c) => (
              <CommentCard
                onDelete={() => get()}
                onReply={() => get()}
                key={c.id}
                {...c}
              ></CommentCard>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
