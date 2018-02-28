import React, {Component} from 'react'
import {Footer} from '../presentation'
import {Podcasts, Playlist} from '../containers'

class Featured extends Component{

  render(){
    return(
        <div id="main">
          <div id="content"
          className="main animated fadein">

            <Playlist />


            <div className="animated fadeinup delay-1">

                <Podcasts />

            <div className="clr"></div>
            </div>
            <div style={{height:'40vh'}}></div>

            <Footer />

          </div>

      </div>

    )
  }
}


export default Featured
