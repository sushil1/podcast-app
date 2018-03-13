import superagent from 'superagent';
import Promise from 'bluebird';

export default {
  searchPodcasts: (endpoint, params) =>
    new Promise((resolve, reject) => {
      superagent
        .get(endpoint)
        .query(params)
        .set('Accept', 'application/json')
        .end((err, response) => {
          if (err) {
            reject(err);
          }

          if (response.statusText === 'OK') {
            if (response.body.confirmation === 'fail') {
              reject(response.body.message);
            }
            resolve(response.body.results);
          }
        });
    }),

  getFeeds: (endpoint, params) =>
    new Promise((resolve, reject) => {
      superagent
        .get(endpoint)
        .query(params)
        .set('Accept', 'application/json')
        .end((err, response) => {
          console.log('response in fedd api', response);
          if (err) {
            console.log('Error in getFeeds : ', err);
            reject(err);
          }

          if (response != null) {
            if (response.body.confirmation === 'fail') {
              reject(response.body.message);
            }
            resolve(response.body.podcast);
          } else {
            reject('Feed not Found');
          }
        });
    })
};
