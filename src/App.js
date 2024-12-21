import AddEditBlog from "./pages/AddEditBlog";
import HomePage from "./pages/HomePage";
import { Route, Routes } from "react-router-dom";
import ViewBlog from "./pages/ViewBlog";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/AddEditBlog" element={<AddEditBlog />} />
        <Route path="/viewBlog/:id" element={<ViewBlog/>}/>
      </Routes>
    </div>
  );
}

export default App;