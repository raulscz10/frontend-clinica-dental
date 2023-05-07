import "./App.scss";
import { BrowserRouter } from "react-router-dom";
import {Header} from "./components/";
import AppRouter from "./AppRouter";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <AppRouter/>
      </BrowserRouter>
    </>
  );
}

export default App;