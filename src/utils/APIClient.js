import superagent from 'superagent'
import bluebird from 'bluebird'

module.exports = {

  get: (endpoint, params) =>{
    return new Promise((resolve, reject)=>{

      superagent
      .get(endpoint)
      .query(params)
      .set('Accept', 'application/json')
      .end((err, response)=>{
        if(err){
          reject(err)
          return
        }
        resolve(response.body)
      })

    })
  }

}
