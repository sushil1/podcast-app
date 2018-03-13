import React from 'react';
import { Footer } from '../presentation';
import { Podcasts, Playlist } from '../containers';

export default () => (
  <div id="main">
    <div id="content" className="main animated fadein">
      <Playlist />
      <div className="animated fadeinup delay-1">
        <Podcasts />
        <div className="clr" />
      </div>
      <div style={{ height: '40vh' }} />
      <Footer />
    </div>
  </div>
);
