import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Hero from "./components/hero";
import WhyUsCards from "./components/WhyUsCards";
import Features from "./components/features";
import Footer from "./components/footer";
import Login from "./pages/login";
import Signup from "./pages/signup";  // Fixed import - capitalized the component name
import HomeChart from "./components/HomeChart";
import Dashboard from "./components/Dashboard";

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
        <Route path="/signup" element={<Signup />} />  {/* Added the Signup component as the element */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;