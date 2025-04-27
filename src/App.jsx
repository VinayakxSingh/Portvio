import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Hero from "./components/hero";
import WhyUsCards from "./components/WhyUsCards";
import Features from "./components/features";
import Footer from "./components/footer";
import Login from "./pages/login";
import Signup from "./pages/signup";
import HomeChart from "./components/HomeChart";
import Dashboard from "./components/Dashboard";
import AddInvestment from "./components/AddInvestment";
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
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
