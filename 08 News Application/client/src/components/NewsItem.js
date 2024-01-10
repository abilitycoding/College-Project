import React from 'react';

export default function NewsItem(props) {
    let { title, description, imgUrl, newsUrl, time, author, source } = props;
    return (
        <div className="container">
            <div className="card">
                <img src={!imgUrl ? 'https://bugs.mojang.com/secure/attachment/366228/%D0%B7%D0%BE%D0%B1%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%BD%D1%8F_2021-01-10_214711.png' : imgUrl} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{ left: '90%', zIndex: '1' }}>{source}</span>
                    <p className="card-text">{description}</p>
                    <p className="card-text"><small className="text-muted">By {author ? author : 'Unknown'} On {new Date(time).toGMTString()}</small></p>
                    <a href={newsUrl} target='_blank' rel="noreferrer" className="btn btn-dark btn-sm">Read More</a>
                </div>
            </div>
        </div>
    )
}

