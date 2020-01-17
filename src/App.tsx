import React, { Component } from "react";
import "./App.css";
import logo from "./logo.svg";

interface IAppProps {}
interface IAppState {
  post: string,
  response: string,
  responseToPost: string,
  formIsDirty: boolean
} 

class App extends Component<IAppProps, IAppProps> {
  public state = {
    post: "",
    response: "",
    responseToPost: "",
    formIsDirty: false
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

    // Prevents the form from being POST back... but keeps the HTML5 validations
  private NoPostBack = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }
  
  public handleSubmit = async (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    // THIS VALIDATION ALLOWS THE POPUP TO STILL SHOW UP
    if(this.state.formIsDirty === false || this.state.post === "")
      return

    const response = await fetch("/api/messages", {
      body: JSON.stringify({ post: this.state.post }),
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST"
    });
    const body = await response.text();
    this.setState({ responseToPost: body, formIsDirty: false });
  }
  private changeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      post: e.target.value,
      formIsDirty: true
    })
  }
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
        <form onSubmit={this.NoPostBack}>
          <p>
            <strong>Post to Server:</strong>
          </p>
          <input
            type="text"
            value={this.state.post}
            required={true}
            // tslint:disable-next-line jsx-no-lambda
            onChange={this.changeInputHandler}
          />
          <input onClick={this.handleSubmit} type="submit"/>
        </form>
        <p>{this.state.responseToPost}</p>
      </div>
    );
  }
}

export default App;
