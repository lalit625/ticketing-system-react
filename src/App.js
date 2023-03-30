import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./component/footer/Footer";
import Header from "./component/header/Header";
import AddChc from "./pages/addChc/AddChc";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Reset from "./pages/auth/Reset";
import ChcDetails from "./pages/chcDetail/ChcDetails";
import ChcList from "./pages/chcList/ChcList";
import Home from "./pages/home/Home";
import NotFound from "./pages/notFound/NotFound";

// Pages


function App() {
 
  return (
   
    <>
      <BrowserRouter>
        <ToastContainer />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />
       
          
            <Route path="/chc-list" element={<ChcList />} />
            <Route path="/add-chc/:id" element={<AddChc />} />
            <Route path="/chc-details/:id" element={<ChcDetails />} />
            <Route path="*" element={<NotFound />} />
          
         
          
         


          
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
