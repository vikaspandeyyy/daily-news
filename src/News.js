import React from "react";
import axios from "axios";
import Newsitems from "./Newsitems";
import PropTypes from 'prop-types'

export default class PersonList extends React.Component {
  static defaultProps = {
    country : "in",
    pageSize : 8,
    category : "general"
  }

  static propTypes = {
     country : PropTypes.string,
     pageSize : PropTypes.number,
     category : PropTypes.string
  }

  constructor() {
    super();
    this.state = {
      articles: [],
      page: 1,
    };
  }

  componentDidMount() {
    axios
      .get(
        `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fa9d2262215b45f3b24df6995134a84d&page=1&pageSize=${this.props.pageSize}`
      )
      .then((res) => {
        // const a = res.data;
        this.setState({
          articles: res.data.articles,
          totalResults: res.data.totalResults,
        });
        console.log(this.state);
      });
  }

  handlePrevBtn = async () => {
    console.log("Previos button is calling");

    axios
      .get(
        `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fa9d2262215b45f3b24df6995134a84d&page=${
          this.state.page - 1
        }&pageSize=${this.props.pageSize}`
      )
      .then((res) => {
        this.setState({
          articles: res.data.articles,
          page: this.props.page - 1,
        });
      });
  };

  handleNextBtn = async () => {
    console.log("Next button is calling");
    if (
      this.state.page + 1 >
      Math.ceil(this.state.totalResults / this.state.pageSize)
    ) {
    } else {
      axios
        .get(
          `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fa9d2262215b45f3b24df6995134a84d&page=${
            this.state.page + 1
          }&pageSize=${this.state.pageSize}`
        )
        .then((res) => {
          this.setState({
            articles: res.data.articles,
            page: this.state.page + 1,
          });
        });
    }
  };

  render() {
    return (
      <div className="container my-5">
      <h1 className="text-center" style={{paddingTop:"25px"}}>DailyNews - Top Headlines</h1>
        <div className="row">
          {this.state.articles.map((e, index) => {
            return (
              <div className="col-md-4 my-3 " key={index}>
                <Newsitems
                  title={e.title}
                  description={e.description}
                  imageUrl={e.urlToImage}
                  newUrl={e.url}
                  data={e.publishedAt}
                />
              </div>
            );
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            type="button"
            disabled={this.state.page <= 1}
            onClick={this.handlePrevBtn}
            className="btn btn-dark"
          >
            &larr;Previous
          </button>
          <button
            type="button"
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.state.pageSize)
            }
            onClick={this.handleNextBtn}
            className="btn btn-dark"
          >
            Next&rarr;
          </button>
        </div>
      </div>
    );
  }
}
