import { useState } from 'react';
import Contact from './Contact';

export default function About() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="profile-bio profile-same">
      <p className="short-description">
        Hi! My name is Abylai and I'm a Developer. I build mobile apps and software systems...
      </p>
      
      <div id="profile-bio-wrapper" className={isExpanded ? "show-more-info" : ""}>
        <div id="show-more-icon" className="no-select" onClick={toggleExpand}>
          <i className="fa fa-chevron-circle-up" aria-hidden="true"></i>
        </div>
        
        <Contact />

        <div className="bio-extra">
          <p>Hi, my name is Abylai and I am a Computer Systems and Software student at KBTU.</p>
          <p>
            I specialize in mobile app development using Swift, SwiftUI, and Flutter, 
            alongside low-level systems programming in C.
          </p>
          <p>
            I love tech and data engineering. Even if I'm not working on my own projects, 
            I enjoy designing cooperative game mechanics in Unity.
          </p>
          <p>
            If you want to get in touch, try <a href="https://github.com/AbylayBeisen" target="_blank" rel="noreferrer">GitHub</a> or email me at Address: Planet Earth 🌍.
          </p>
        </div>
      </div>
    </div>
  );
}