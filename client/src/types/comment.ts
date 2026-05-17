export type SortType = "DateAsc" | "DateDesc"
export type PostType = Omit<IComment, "id" | "createdAt" | "repliesCount">
export type PutType = Pick<IComment, "text">

export interface ICommentList {
  comments: IComment[]
  totalCount: number
  page: number
  limit: number
}

export interface IComment {
  id: string
  parentId?: string
  text: string
  nickname: string
  avatarUrl: string
  createdAt: string
  repliesCount: number
}
