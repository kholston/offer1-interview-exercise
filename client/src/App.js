import { BrowserRouter, Route, Routes } from "react-router-dom";
import { FetchProvider } from "./context/FetchContext";
import HomeList from "./components/HomeList";
import HomeView from "./components/HomeView";

function App() {
  return (
    <BrowserRouter>
      <FetchProvider>
        <Routes>
          <Route exact path="/" element={<HomeList />} />
          <Route path="/homes/:id" element={<HomeView />} />
        </Routes>
      </FetchProvider>
    </BrowserRouter>
  );
}

export default App;
