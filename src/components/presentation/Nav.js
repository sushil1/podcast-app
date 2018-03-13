import React from 'react';

export default ({ getPodcasts }) => {
  return (
    <div>
      <div className="menu-trigger z-depth-2">
        <div id="menu-icon">
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>

      <nav id="sidebar" className="menu">
        <div className="menu-navigation">
          <ul className="full-menu collapsible">
            <li>
              <a onClick={() => searchPodcasts('music')} className="no-child">
                Music
              </a>
            </li>
            <li>
              <a href="news.html" className="no-child">
                Javascript
              </a>
            </li>
            <li>
              <a href="video.html" className="no-child">
                Fashion
              </a>
            </li>
            <li>
              <a href="contact.html" className="no-child">
                News
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};
