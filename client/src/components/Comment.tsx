import ArrowUp from "../assets/arrow_sort_up.svg?react"
import ArrowDown from "../assets/arrow_sort_down.svg?react"

export default function Comment() {
  return (
    <div className="comment">
      <div className="comment__header">
        <div className="comment__profile">
          <img className="comment__avatar avatar" src="" alt="user avatar" />
          <div className="comment__meta">
            <span className="comment__author"></span>
            <time className="comment__date"></time>
          </div>
        </div>
        <div className="comment__vote">
          <button className="comment__vote-btn">
            <ArrowUp></ArrowUp>
          </button>
          <span className="comment__vote-count"></span>
          <button className="comment__vote-btn">
            <ArrowDown></ArrowDown>
          </button>
        </div>
      </div>
      <div className="comment__content"></div>
    </div>
  )
}
