import React, {Component} from 'react'

export default (props) => {

  return(
    <footer className="page-footer grey" >
      <div className="container">
        <div className="row">
          <div className="col s12">
            <div className="center-align">
              <i className="ion-social-facebook m-10 white-text"></i>
              <i className="ion-social-twitter m-10 white-text"></i>
              <i className="ion-social-github m-10 white-text"></i>
            </div>
          </div>
        </div>
      </div>
      <div className="line white"></div>
      <div className="footer-copyright primary-color">
        <div className="container">
        2017 podcast-app
        <a className="grey-text text-lighten-4 right" href="#!">Privacy Policy</a>
        </div>
      </div>
    </footer>
  )

}
