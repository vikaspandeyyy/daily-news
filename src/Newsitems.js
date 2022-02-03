import React, { Component } from "react";

export default class Newsitems extends Component {
  render() {
    let { title, description, imageUrl, newUrl ,data} = this.props;
    return (
      <div>
        <div className="card">
          <img src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title"> {title}</h5>
            <p className="card-text">{description}</p>
            <p class="card-text"><small class="text-muted">{new Date(data).toGMTString()}</small></p>
            <a rel="noreferrer" href={newUrl} target="_blank" className="btn btn-dark btn-sm">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}
