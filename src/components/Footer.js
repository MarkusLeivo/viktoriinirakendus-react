import { useState, useEffect } from 'react';

function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  return (
    <footer className="footer">
      {showScrollTop && (<button className="scroll-to-top" onClick={scrollToTop}> ÜLES </button>)}
        <a href="https://github.com/MarkusLeivo/viktoriinirakendus-react" target="_blank" rel="noopener noreferrer" className="href-link">
          GitHub
        </a>
    </footer>
  );
}

export default Footer;