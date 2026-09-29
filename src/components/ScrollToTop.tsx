import { useEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

export default function ScrollToTop() {
  const location = useLocation();
  const navigationType = useNavigationType();
  const scrollPositions = useRef<Map<string, number>>(new Map());

  useEffect(() => {
    if (navigationType === 'PUSH') {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    } else if (navigationType === 'POP') {
      const key = location.pathname + location.search;
      const savedY = scrollPositions.current.get(key) ?? 0;
      requestAnimationFrame(() => {
        window.scrollTo({ top: savedY, left: 0, behavior: 'instant' });
      });
    }
  }, [location, navigationType]);

  useEffect(() => {
    const key = location.pathname + location.search;
    const handleScroll = () => {
      scrollPositions.current.set(key, window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location]);

  return null;
}
