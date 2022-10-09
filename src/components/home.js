import React, { Component } from "react";
import styles from "./home.module.css";

class Home extends Component {
constructor(params) {
    super(params) 

    this.state = {
        username: '',
        password: '',
    }
}

    userHandler = (event) => {
        this.setState({
            username: event.target.form[0].value,
            password: event.target.form[1].value
        })
    }

    render () {
        return (
            <section>
            <h2 className={styles.h2fg}>Welcome {this.state.username} {'your password is '+this.state.password}</h2>
            <form>
            <label>Username: </label>
                <input type="text" name="username" value={this.state.username} onChange={this.userHandler} />
                <label>Password: </label>
                <input type="text" name="password" value={this.state.password} onChange={this.userHandler} />
            </form>
        </section>
    )
}

}
export default Home