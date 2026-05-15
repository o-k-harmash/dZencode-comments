import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./reset.css"
import "./style.css"
import Comments from "./pages/Comments"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Comments />
  </StrictMode>,
)
