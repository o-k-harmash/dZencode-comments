import { useState } from "react"
import {
  apiGetCommentList,
  apiPostComment,
  apiPutComment,
  apiDeleteComment,
} from "@/services/api/comment"
import type { ICommentList, SortType, PutType, PostType } from "@/types/comment"

export interface UseCommentsHook {
  state: ICommentList | null
  page: number
  limit: number
  sort: SortType

  setPage: React.Dispatch<React.SetStateAction<number>>
  setLimit: React.Dispatch<React.SetStateAction<number>>
  setSort: React.Dispatch<React.SetStateAction<SortType>>

  get: () => Promise<void>
  post: (body: PostType) => Promise<void>
  put: (id: string, body: PutType) => Promise<void>
  remove: (id: string) => Promise<void>
}

export function useCommentsHook(
  initPage = 1,
  initLimit = 25,
  initSort: SortType = "DateAsc",
  parentId?: string,
): UseCommentsHook {
  const [state, setState] = useState<ICommentList | null>(null)
  const [page, setPage] = useState(initPage)
  const [limit, setLimit] = useState(initLimit)
  const [sort, setSort] = useState<SortType>(initSort)

  async function get() {
    const res = await apiGetCommentList(page, limit, parentId, sort)
    setState(res)
  }

  async function post(body: PostType) {
    await apiPostComment(body)
    await get()
  }

  async function put(id: string, body: PutType) {
    await apiPutComment(id, body)
    await get()
  }

  async function remove(id: string) {
    await apiDeleteComment(id)
    await get()
  }

  return {
    state,
    page,
    limit,
    sort,
    setPage,
    setLimit,
    setSort,
    get,
    post,
    put,
    remove,
  }
}
