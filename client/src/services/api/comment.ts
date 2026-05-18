import ApiError from "@/utils/apiError"
import { apiService } from "."
import type { ICommentList, SortType } from "@/types/comment"
import type { IComment } from "@/types/comment"

export async function apiGetCommentList(
  page: number,
  limit: number,
  parentId?: string,
  sort?: SortType,
): Promise<ICommentList> {
  const params = {
    page: page - 1,
    limit,
    parentId,
    sort,
  }

  try {
    const res = await apiService.get<ICommentList, unknown>("/comments", params)

    if (!res.ok || !res.data) {
      throw new ApiError({
        message: "Failed to fetch comments",
        status: res.status,
      })
    }

    return res.data
  } catch (e) {
    throw new ApiError(e as Error)
  }
}

export async function apiGetComment(id: string): Promise<IComment> {
  try {
    const res = await apiService.get<IComment, unknown>(`/comments/${id}`)

    if (!res.ok || !res.data) {
      throw new ApiError({
        message: "Failed to fetch comment",
        status: res.status,
      })
    }

    return res.data
  } catch (e) {
    throw new ApiError(e as Error)
  }
}

export async function apiPostComment(
  body: Omit<IComment, "id" | "createdAt" | "repliesCount">,
): Promise<IComment> {
  try {
    const res = await apiService.post<IComment, unknown>("/comments", body)

    if (!res.ok || !res.data) {
      throw new ApiError({
        message: "Failed to create comment",
        status: res.status,
      })
    }

    return res.data
  } catch (e) {
    throw new ApiError(e as Error)
  }
}

export async function apiPutComment(
  id: string,
  body: Pick<IComment, "text">,
): Promise<IComment> {
  try {
    const res = await apiService.put<IComment, unknown>(`/comments/${id}`, body)

    if (!res.ok || !res.data) {
      throw new ApiError({
        message: "Failed to update comment",
        status: res.status,
      })
    }

    return res.data
  } catch (e) {
    throw new ApiError(e as Error)
  }
}

export async function apiDeleteComment(id: string): Promise<void> {
  try {
    const res = await apiService.delete<unknown, unknown>(`/comments/${id}`)

    if (!res.ok) {
      throw new ApiError({
        message: "Failed to delete comment",
        status: res.status,
      })
    }
  } catch (e) {
    throw new ApiError(e as Error)
  }
}
