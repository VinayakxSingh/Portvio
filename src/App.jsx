import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Hero from "./components/hero";
import WhyUsCards from "./components/WhyUsCards";
import Footer from "./components/footer";
import Login from "./pages/login";
import Signup from "./pages/signup";
import HomeChart from "./components/HomeChart";
import About from "./pages/about"
import Features from "./pages/features"
import Dashboard from "./components/Dashboard";
import AddInvestment from "./components/AddInvestment";
import ContactUs from "./pages/contact";
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <WhyUsCards />
              <Features />
              <HomeChart />
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/add-investment" element={<AddInvestment />} />
        <Route path="/contact" element={<ContactUs/>}/>
        <Route path="/about-us" element={<About/>}/>
        <Route path="/features" element={<Features/>}/>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
