import React, { Component } from "react";
import PropTypes from "prop-types";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import axios from "axios";

export default class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 5,
    category: "general"
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  };

  capitalize = (string) => {
    let low = string.toLowerCase();
    return low.charAt(0).toUpperCase() + low.slice(1);
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      page: 1,
      loading: false
    };
    document.title = `News Application - ${this.capitalize(
      this.props.category
    )}`;
  }

  async updateNews(page) {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=${this.props.apiKey}&page=${page}&pageSize=${this.props.pageSize}`;
    const URL = process.env.REACT_APP_BACKEND_URL;
    this.setState({ loading: true });
    axios
      .post(`${URL}`, {
        country: this.props.country,
        category: this.props.category,
        page: page,
        pageSize: this.props.pageSize
      })
      .then((res) => {
        let data = res.data;
        this.setState({
          articles: data.articles,
          loading: false,
          totalResults: data.totalResults
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async componentDidMount() {
    this.updateNews(this.state.page);
  }

  funcNext = async () => {
    if (
      !(
        this.state.page + 1 >
        Math.ceil(this.state.totalResults / this.props.pageSize)
      )
    ) {
      this.setState({
        page: this.state.page + 1
      });
      this.updateNews(this.state.page + 1);
    }
  };

  funcPrevious = async () => {
    this.setState({
      page: this.state.page - 1
    });
    this.updateNews(this.state.page - 1);
  };

  render() {
    return (
      <>
        <div className="container">
          <h2 className="my-5">{`${this.capitalize(
            this.props.category
          )} - Top Head Lines`}</h2>
          {this.state.loading && <Spinner />}
          {!this.state.loading && (
            <div className="row">
              {this.state.articles.map((element) => {
                return (
                  <div className="col-md-4 mt-5" key={element.url}>
                    <NewsItem
                      title={element.title /*.slice(0, 65)*/}
                      description={element.description /*.slice(0, 135)*/}
                      imgUrl={element.urlToImage}
                      newsUrl={element.url}
                      time={element.publishedAt}
                      author={element.author}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div className="container flex-di-row d-flex justify-content-between my-5">
          <button
            type="button"
            disabled={this.state.page <= 1}
            onClick={this.funcPrevious}
            className="btn btn-dark"
          >
            {" "}
            &larr; Previous
          </button>
          <button
            type="button"
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            onClick={this.funcNext}
            className="btn btn-dark"
          >
            Next &rarr;
          </button>
        </div>
      </>
    );
  }
}
