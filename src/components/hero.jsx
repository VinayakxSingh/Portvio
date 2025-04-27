import "./Hero.css";

function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <div className="hero-image">
          {/* Replace this with a real phone mockup with chart later */}
          <img
            src="/phone1.png"
            alt="Portvio App on Phone"
            className="phone-mockup"
          />
        </div>
        <div className="hero-text">
          <h1>
            Track. Analyze.
            <br />
            Grow Your Wealth.
          </h1>
          <blockquote>
            "The first step towards getting somewhere is to decide you’re not
            going to stay where you are."
            <br />
            <span>- J.P. Morgan</span>
          </blockquote>
        </div>
      </div>
    </section>
  );
}

export default Hero;
