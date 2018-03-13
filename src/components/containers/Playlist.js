import React, { Component } from 'react';
import { Search, Nav } from '../presentation';
import { APIClient } from '../../utils';
import { connect } from 'react-redux';
import actions from '../../actions';
import APlayer from 'aplayer';

class Playlist extends Component {
  constructor() {
    super();
    this.state = {
      //trackList: null,
      player: null,
      isLoading: false
		};
		const loadInitialPodcasts = this.loadInitialPodcasts.bind(this)
  }

  componentDidMount() {
		//lets load some playlist after the component mounts
		console.log('loading')
    this.loadInitialPodcasts();
	}
	
	loadInitialPodcasts(){
		const query = 'js'
		const endpoint = '/search/' + query;
		APIClient.get(endpoint, null)
			.then(response => {
				this.props.podcastsReceived(response.results);
			})
			.catch(err => {
				console.log('ERROR: ' + JSON.stringify(response));
			})
	}


  initializePlayer(list) {
    let sublist = [];
    if (list.length > 3) {
      // limit list size to 3
      for (var i = 0; i < 3; i++) {
        sublist.push(list[i]);
      }
    } else {
      sublist = Object.assign([], list);
    }
    this.setState({
      isLoading: true
    });

    var ap1 = new APlayer({
      element: document.getElementById('player1'),
      narrow: false,
      autoplay: true,
      showlrc: false,
      mutex: true,
      theme: '#e6d0b2',
      preload: 'metadata',
      mode: 'circulation',
      music: sublist
    });

    // ap1.on('play', function () {
    //     console.log('play');
    // });
    // ap1.on('play', function () {
    //     console.log('play play');
    // });
    // ap1.on('pause', function () {
    //     console.log('pause');
    // });
    // ap1.on('canplay', function () {
    //     console.log('canplay');
    // });
    // ap1.on('playing', function () {
    //     console.log('playing');
    // });
    // ap1.on('ended', function () {
    //     console.log('ended');
    // });
    // ap1.on('error', function () {
    //     console.log('error');
    // });

    this.setState({
      //        	trackList: list,
      loading: false,
      player: ap1
    });
  }

  searchPodcasts(event) {
    if (event.keyCode != 13) return;
    //console.log('searchPodcasts: '+event.target.value)
    const endpoint = '/search/' + event.target.value;

    APIClient.get(endpoint, null)
      .then(response => {
        //			console.log(JSON.stringify(response))
        this.props.podcastsReceived(response.results);
      })
      .catch(err => {
        console.log('ERROR: ' + JSON.stringify(response));
      });
  }

  getPodcasts(query) {
    const endpoint = '/search/' + query;

    APIClient.get(endpoint, null)
      .then(response => {
        this.props.podcastsReceived(response.results);
      })
      .catch(err => {
        console.log('ERROR: ' + JSON.stringify(response));
      });
  }

  componentDidUpdate() {
    //console.log('componentDidUpdate: '+JSON.stringify(this.props.podcasts.selected))
    if (this.props.podcasts.selected == null) return;

    // grab the feed url, then make request for rss feed
    const feedUrl = this.props.podcasts.selected['feedUrl'];
    if (feedUrl == null) return;
    if (this.props.podcasts.trackList != null) {
      // tracks are already loaded
      if (this.state.player == null)
        this.initializePlayer(this.props.podcasts.trackList);
      return;
    }

    // RESET THE PLAYER:
    if (this.state.player != null) {
      this.state.player.pause();
      this.setState({
        player: null,
        isLoading: true
      });
    }

    APIClient.get('/feed', { url: feedUrl })
      .then(response => {
        const podcast = response.podcast;
        const item = podcast.item;

        let list = [];
        item.forEach((track, i) => {
          let trackInfo = {};
          trackInfo['title'] = track.title[0];
          trackInfo['author'] = this.props.podcasts.selected.collectionName;
          trackInfo['pic'] = this.props.podcasts.selected['artworkUrl600'];
          let enclosure = track.enclosure[0]['$'];
          trackInfo['url'] = enclosure['url'];
          list.push(trackInfo);
        });
        this.props.trackListReady(list);
      })
      .catch(err => {
        console.log('ERROR: ' + err.message);
      });
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <div
          style={{ paddingTop: 64 }}
          style={{
            background: 'url(img/header2.jpg)',
            backgroundSize: 'cover',
            boxShadow: ' 0px 0px 1px 0px rgba(0, 0, 0,.7)'
          }}
          className="animated fadeindown hero-header"
        >
          {this.state.player === null && (
            <h3
              style={{
                fontSize: '20px',
                textAlign: 'center',
                paddingTop: '50px',
                fontWeight: 'bold',
                color: 'white'
              }}
            >
							Search your favourite podcasts.<br />
							Click on the channel to play.<br />
            </h3>
          )}
          <div className="p-20 animated fadeinup delay-1">
            <div
              style={{ background: '#fff', margin: '5%' }}
              id="player1"
              className="aplayer"
            />
          </div>
        </div>

        <Search onSearch={this.searchPodcasts.bind(this)} />
      </div>
    );
  }
}

const stateToProps = state => {
  return {
    podcasts: state.podcast
  };
};

const dispatchToProps = dispatch => {
  return {
    podcastsReceived: podcasts => dispatch(actions.podcastsReceived(podcasts)),
    trackListReady: list => dispatch(actions.trackListReady(list))
  };
};

export default connect(stateToProps, dispatchToProps)(Playlist);
