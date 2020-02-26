import React from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import API from "../../utils/API";

export class Login extends React.Component {

  Constructor()
  {
    this.send = this.send.bind(this);
  }

  state = {
    email: "",
    password: "",
    error: ""
  };

  send = async (e) => {
    e.preventDefault;
    const { email, password } = this.state;
    if (!email || email.length === 0) {

      this.setState({error : "wrong email."});
      return;
    }
    
    if (!password || password.length === 0) {
      this.setState({error : "wrong password."});
      return;
    }

    try {
      const { data } = await API.login(email, password);
      localStorage.setItem("token", data.token);
      window.location = "/dashboard";
    } catch (error) {
      console.error(error);
      this.setState({error : "This user did not appear in the database."});
    }
  };
  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };
  render() {
    const { email, password } = this.state;
    return (
      <div className="Login">
        <FormGroup controlId="email" bsSize="large">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            autoFocus
            type="email"
            value={email}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            value={password}
            onChange={this.handleChange}
            type="password"
          />
        </FormGroup>
        <Button onClick={this.send} block bsSize="large" type="submit">
          Connexion
        </Button>
    <p>{this.state.error}</p>
      </div>
    );
  }
}