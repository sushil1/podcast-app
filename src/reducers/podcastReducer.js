import constants from '../constants'

var initialState = {
  all: null,
  selected: null,
  trackList: null

}

export default (state = initialState, action)=>{
  let updated = Object.assign({}, state)
  switch(action.type){

    case constants.PODCASTS_RECEIVED:
    //console.log('podcast recieved: '+JSON.stringify(action.podcasts))
    updated['all'] = action.podcasts
    return updated

    case constants.PODCAST_SELECTED:
    if(updated.selected != null){
      if(updated.selected.collectionId == action.podcast.collectionId)
        return state
      }
      updated['trackList'] = null
      updated['selected'] = action.podcast
      return updated

    case constants.TRACKLIST_READY:
    console.log('TRACKLIST_READY')
     updated['trackList'] = action.list
      return updated


    default:
      return state
  }

}
