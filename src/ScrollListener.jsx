import React, { useEffect } from "react";
import { BeatLoader } from "react-spinners";
import './ScrollListener.css'

export default function ScrollListener({ setNumOfFixtures }) {
    
  useEffect(() => {
    function handleScroll() {
      const scrollHeight = window.innerHeight + window.scrollY;
      const totalHeight = document.documentElement.scrollHeight;

      if (scrollHeight === totalHeight) {
        setNumOfFixtures(prevNumOfFixtures => prevNumOfFixtures + 5)
        // Perform any actions you want when the bottom of the page is reached
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // return <div className="loading-spinner"><BeatLoader /></div>;
}