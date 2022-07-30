import { useState, useEffect} from 'react';
import { animateScroll as scroll } from 'react-scroll';

function ScrollUp() {
  const [ scrollPosition, setScrollPosition] = useState(0);
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  function handleScroll() {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  return (
    <button className={`scroll-up ${scrollPosition > 500 && 'scroll-up_visible'}`} type='button' onClick={scroll.scrollToTop}>ВВЕРХ</button>
  );
};

export default ScrollUp;