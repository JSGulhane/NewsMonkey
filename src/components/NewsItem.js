import React, { Component } from 'react'

export class NewsItem extends Component {

  render() {
    let {title,description, imageUrl, newsUrl} = this.props;
    return (
      <div className='my-3'>
        <div className="card" style={{width: "18rem"}}>
            <img src={!imageUrl?"https://www.hindustantimes.com/ht-img/img/2024/06/08/550x309/France-Tennis-French-Open-52_1717856814928_1717856858927.jpg":imageUrl} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title}...</h5>
                <p className="card-text">{description}...read more</p>
                <a href={newsUrl} target= "_blank" rel="noreferrer noopener" className="btn btn-sm btn-primary">Read more</a>
        </div>
        </div>
      </div>
        )
    }
    }

export default NewsItem
