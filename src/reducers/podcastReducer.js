import constants from '../constants';

var initialState = {
  all: null,
  selected: null,
  trackList: null,
  error: null
};

export default (state = initialState, action) => {
  let updated = Object.assign({}, state);
  switch (action.type) {
    case constants.PODCASTS_RECEIVED:
      updated['all'] = action.podcasts;
      updated['error'] = null;
      return updated;

    case constants.PODCASTS_RECEIVED_ERROR:
      updated['error'] = action.message;
      return updated;

    case constants.PODCAST_SELECTED:
      if (updated.selected != null) {
        if (updated.selected.collectionId === action.podcast.collectionId)
          return state;
      }
      updated['trackList'] = null;
      updated['selected'] = action.podcast;
      return updated;

    case constants.TRACKLIST_READY:
      updated['trackList'] = action.list;
      updated['error'] = null;
      return updated;

    case constants.TRACKLIST_ERROR:
      updated['trackList'] = null;
      updated['error'] = action.message;
      return updated;

    default:
      return state;
  }
};
