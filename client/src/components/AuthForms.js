import React, { Component } from "react"
import errors from "../store/reducers/errors";

export default class AuthForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            username: "",
            password: "",
            profileImageurl: ""
        }
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = e =>{
        e.preventDefault()
        const authType = this.props.signUp ? "signup" : "signin"
        this.props.onAuth(authType, this.state).then(() => {
            console.log("LOGGED IN SUCCESSFULLY!")
        })
    }

    render() {
        const { email, username, password, profileImageurl }  = this.state
        const { heading, buttonText, signUp, errors, history, removeError } = this.props
        history.listen(() => {
            removeError()
        })
        return(
            <div className="row justify-content-md-center text-center">
                <div className="col-md-6">
                    <form onSubmit={this.handleSubmit}>
                        <h2>{heading}</h2>
                        {errors.message &&  (
                            <div className="alert alert-danger">{errors.message}</div>
                        )}
                        <label htmlFor="email">Email:</label>
                        <input
                            className="form-control"
                            id="email" 
                            name="email"
                            onChange={this.handleChange}
                            value={email}
                            type="text"
                        />
                        <label htmlFor="password">Password:</label>
                        <input
                            className="form-control"
                            id="password"
                            name="password"
                            onChange={this.handleChange}
                            type="password" 
                        />
                        {signUp && (
                        <div>
                            <label htmlFor="username">Username:</label>
                            <input
                                className="form-control"
                                id="username"
                                name="username"
                                onChange={this.handleChange}
                                value={username}
                                type="text"
                            />
                            <label htmlFor="image-url">Image-url:</label>
                            <input
                                className="form-control"
                                id="image-url"
                                name="profileImageUrl"
                                onChange={this.handleChange}
                                type="text" 
                            />
                        </div>)}
                        <button type="submit" className="btn btn-primary btn-block btn-lg">
                            {buttonText}
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}