import './Home.css';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Home() {
  const fullText = "Welcome to AbHiSheK ReNTaL!";
  const [text, setText] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [pause, setPause] = useState(false);

  useEffect(() => {
    if (pause) return;

    const speed = deleting ? 50 : 100;

    const timeout = setTimeout(() => {
      if (!deleting) {
        setText(fullText.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);

        if (charIndex + 1 === fullText.length) {
          setPause(true);
          setTimeout(() => {
            setDeleting(true);
            setPause(false);
          }, 12000); // hold 20 seconds
        }
      } else {
        setText(fullText.slice(0, charIndex - 1));
        setCharIndex(charIndex - 1);

        if (charIndex - 1 === 0) {
          setDeleting(false);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, pause]);

  return (
    <div className="home">
      <div className="overlay"></div>

      <div className="home-content-box">
        <h1 className="live-text">{text}<span className="cursor">|</span></h1>
        <p className="static-text">
          Find your perfect ride — whether it’s a stylish bike or a comfortable car. Book quickly and ride freely!
        </p>
        <div className="home-buttons">
          <Link to="/bikes" className="home-btn">
            Explore Bikes <FaArrowRight />
          </Link>
          <Link to="/cars" className="home-btn">
            Explore Cars <FaArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
