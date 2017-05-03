import React, {Component} from 'react'
import {connect} from 'react-redux'
import actions from '../../actions'
import {TextUtils} from '../../utils'


class Podcasts extends Component{


  selectPodcast(podcast, event){
    //console.log('selectPodcast: '+JSON.stringify(podcast))
    this.props.podcastSelected(podcast)
  }

  render(){
    const list = this.props.podcasts.all || []
    return(
      <div>
      {list.map((podcast, i)=>{
        return (
          <div key={i} className="shop-banner animated fadeinup delay-2">
            <a onClick={this.selectPodcast.bind(this, podcast)} href="#">
              <img src={podcast.artworkUrl600} alt=""/>
              <div className="opacity-overlay valign-wrapper">
                <div className="valign center width-100">
                <h4 style={{fontSize:18}} className="white-text">{TextUtils.truncateText(podcast.artistName, 14)}</h4>
                  <p style={{fontSize:12}} className="white-text">{TextUtils.truncateText(podcast.collectionName, 28)}</p>

                </div>
              </div>
            </a>
          </div>
        )
      })}
      </div>
    )
  }
}


const stateToProps = (state) => {
  return {
    podcasts: state.podcast
  }
}

const dispatchToProps = (dispatch) =>{
  return{
    podcastSelected: (podcast) => dispatch(actions.podcastSelected(podcast))
  }
}

export default connect(stateToProps, dispatchToProps)(Podcasts)
