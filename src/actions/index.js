import constants from '../constants';
import { api } from '../utils';

export const searchPodcasts = (endpoint, params) => dispatch =>
  api
    .searchPodcasts(endpoint, params)
    .then(podcasts => dispatch(podcastsReceived(podcasts)))
    .catch(err => dispatch(podcastReceivedError(err)));

export const getFeeds = (endpoint, params) => dispatch =>
  api
    .getFeeds(endpoint, params)
    .then(response => {
      if (response == null) {
        dispatch(trackListError('No response from feed channel'));
      }
      let list = [];
      response.item.forEach((track, i) => {
        let trackInfo = {};
        trackInfo['title'] = track.title[0];
        trackInfo['author'] = track['itunes:author'][0];
        // trackInfo['pic'] = this.props.podcasts.selected['artworkUrl600'];
        let enclosure = track.enclosure[0]['$'];
        trackInfo['url'] = enclosure['url'];
        list.push(trackInfo);
      });
      dispatch(trackListReady(list));
    })
    .catch(err => dispatch(trackListError(err)));

export const trackListReady = list => ({
  type: constants.TRACKLIST_READY,
  list: list
});

export const trackListError = message => ({
  type: constants.TRACKLIST_ERROR,
  message
});

export const podcastsReceived = podcasts => ({
  type: constants.PODCASTS_RECEIVED,
  podcasts: podcasts
});

export const podcastReceivedError = message => ({
  type: constants.PODCASTS_RECEIVED_ERROR,
  message
});

export const podcastSelected = podcast => ({
  type: constants.PODCAST_SELECTED,
  podcast: podcast
});
