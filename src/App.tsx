import "./styles/global.css";
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router/internal/react-server-client";
import Home from "./routes/Home.tsx";
import Detail from "./routes/Detail.tsx";

function APP() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/:id"} element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
}
export default APP;
