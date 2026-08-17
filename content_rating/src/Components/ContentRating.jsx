import React, { Component } from "react";
import "./ContentRating.css";

class ContentRating extends Component {
  constructor() {
    super();

    this.state = {
      likes: 0,
      dislikes: 0,
    };
  }

  handleLike = () => {
    this.setState((prevState) => ({
      likes: prevState.likes + 1,
    }));
  };

  handleDislike = () => {
    this.setState((prevState) => ({
      dislikes: prevState.dislikes + 1,
    }));
  };

  render() {
    return (
      <>
        <div className="content-rating">
          <p>
              sss React, a JavaScript library developed by Facebook, has
              revolutionized the landscape of front-end web development
              with its component-based architecture. At its core, React
              enables developers to break down complex user interfaces
              into reusable, encapsulated components, each managing its
              own state and behavior. By utilizing a virtual DOM, React
              efficiently updates the UI in response to changes in data,
              resulting in faster and smoother user experiences. Widely
              adopted for building single-page applications (SPAs). web
              applications, and even mobile apps through frameworks like
              React Native, React offers a declarative approach to UI
              development, where developers describe how the UI should
              look based on the application state. Its ecosystem is rich with
              tools and libraries, such as React Router for navigation and
              Redux for state management, facilitating the creation of
              robust and scalable applications. With its emphasis on
              component reusability, performance optimizations, and
              developer-friendly features, React has become a cornerstone
              of modern web development, empowering developers to
              create dynamic and interactive user interfaces with ease.
          </p>

          <div className="rating-buttons">
            <button
              className="like-button"
              onClick={this.handleLike}
            >
              Like ({this.state.likes})
            </button>

            <button
              className="dislike-button"
              onClick={this.handleDislike}
            >
              Dislike ({this.state.dislikes})
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default ContentRating;