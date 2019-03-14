import React, { Component } from "react";
import "./App.css";
import logo from "./logo.svg";

class App extends Component {
  public state = {
    post: "",
    response: "",
    responseToPost: ""
  };
  public componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      // tslint:disable-next-line:no-console
      .catch(err => console.log(err));
  }
  public callApi = async () => {
    const response = await fetch("/api/users/1234");
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };
  public handleSubmit = async (e: any) => {
    e.preventDefault();
    const response = await fetch("/api/messages", {
      body: JSON.stringify({ post: this.state.post }),
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST"
    });
    const body = await response.text();
    this.setState({ responseToPost: body });
  };
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Hello world! Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <p>{this.state.response}</p>
        <form onSubmit={this.handleSubmit}>
          <p>
            <strong>Post to Server:</strong>
          </p>
          <input
            type="text"
            value={this.state.post}
            // tslint:disable-next-line jsx-no-lambda
            onChange={e => this.setState({ post: e.target.value })}
          />
          <button type="submit">Submit</button>
        </form>
        <p>{this.state.responseToPost}</p>
      </div>
    );
  }
}

export default App;
