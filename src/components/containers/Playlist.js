import React, { Component } from 'react';
import { Search } from '../presentation';
import { api } from '../../utils';
import { connect } from 'react-redux';
import { searchPodcasts, getFeeds } from '../../actions';
import APlayer from 'aplayer';

class Playlist extends Component {
  constructor() {
    super();
    this.state = {
      player: null,
      isLoading: false
    };
    const getPodcasts = this.getPodcasts.bind(this);
  }

  componentDidMount() {
    //lets load some 'js' podcasts after the component mounts
    this.getPodcasts('js');
  }

  initializePlayer(list) {
    let sublist = [];
    if (list.length > 3) {
      // limit list size to 3
      for (let i = 0; i < 3; i++) {
        sublist.push(list[i]);
      }
    } else {
      sublist = Object.assign([], list);
    }
    const ap1 = new APlayer({
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

    this.setState({
      loading: false,
      player: ap1
    });
  }

  searchPodcasts(event) {
    if (event.keyCode != 13) return;
    const endpoint = '/search/' + event.target.value;
    this.props.searchPodcasts(endpoint, null);
  }

  getPodcasts(query) {
    const endpoint = '/search/' + query;
    this.props.searchPodcasts(endpoint, null);
  }

  componentDidUpdate(nextProps) {
    if (this.props.podcasts.selected == null) return;
    if (this.props.podcasts.selected === nextProps.podcasts.selected) return;
    // grab the feed url, then make request for rss feed
    const feedUrl = this.props.podcasts.selected['feedUrl'];
    if (feedUrl == null) return;
    if (this.props.podcasts.trackList !== null) {
      // tracks are already loaded
      if (this.state.player == null)
        this.initializePlayer(this.props.podcasts.trackList);
      return;
    }
    // RESET THE PLAYER:
    if (this.state.player !== null) {
      this.state.player.pause();
      this.setState({
        //player: null,
        isLoading: true
      });
    }
    const endpoint = '/feed';
    const params = { url: feedUrl };

    this.props
      .getFeeds(endpoint, params)
      .then(() =>
        this.setState({
          isLoading: false
        })
      )
      .then(() => {
        this.initializePlayer(this.props.podcasts.trackList);
      })
      .catch(() =>
        this.setState({
          isLoading: false
        })
      );
  }

  render() {
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
          {this.props.podcasts.error !== null && (
            <div style={{ backgroundColor: 'pink', textAlign: 'center' }}>
              {this.props.podcasts.error}
            </div>
          )}
          {this.state.player === null &&
            this.state.isLoading && (
              <h3
                style={{
                  textAlign: 'center',
                  color: 'white'
                }}
              >
                Loading please wait ...
              </h3>
            )}
          {this.state.player === null &&
            !this.state.isLoading && (
              <h3
                style={{
                  fontSize: '20px',
                  textAlign: 'center',
                  paddingTop: '20px',
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

export default connect(stateToProps, { searchPodcasts, getFeeds })(Playlist);
