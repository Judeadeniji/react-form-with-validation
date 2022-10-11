import React, { Component } from 'react';
import './Form.css';

export default class Form extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       fullName: '',
       email: '',
       username: '',
       password: '',
       Password2: '',
       isChecked: 'on',
       formErrors: {
        fullName: '',
        email: '',
        username: '',
        password: '',
        Password2: ''},
      fullNameValid: false,
       emailValid: false,
       usernameValid: false,
       passwordValid: false,
       Password2Valid: false,
       formValid: false,
       submitted: false,
    }
  }


handleUserInput = (e) => {
  const id = e.target.id;
  const value = e.target.value;
  this.setState({[id]: value}, () => {this.validateField(id, value)});

}

validateField(fieldId, value) {
  let fieldValidatonErrors = this.state.formErrors;
  let fullNameValid = this.state.fullNameValid;
  let emailValid = this.state.emailValid;
  let usernameValid = this.state.usernameValid;
  let passwordValid = this.state.passwordValid;
  let Password2Valid = this.state.Password2Valid;

  switch(fieldId) {
    case 'email':
      emailValid = value.match(/^[a-zA-Z0-9]+@+[a-zA-Z0-9]/i);
      fieldValidatonErrors.email = emailValid ? 'is-valid' : " is-invalid";
      break;
      case 'password':
        passwordValid = value.length >=6;
        fieldValidatonErrors.password = passwordValid ? 'is-valid' : ' is-invalid';
        break;
        case 'fullName':
      fullNameValid = value.length >=1;
      fieldValidatonErrors.fullName = fullNameValid ? 'is-valid' : ' is-invalid';
      break;
      case 'Password2':
      Password2Valid =  value === this.state.password;
      fieldValidatonErrors.Password2 = Password2Valid ? 'is-valid' : ' is-invalid';
      break;
      case 'username':
      usernameValid = value.length >=4;
      fieldValidatonErrors.username = usernameValid ? 'is-valid' : ' is-invalid';
      break;
      default:
        break;
  }

  this.setState({
    formErrors: fieldValidatonErrors,
    emailValid: emailValid,
    passwordValid: passwordValid,
    Password2Valid: Password2Valid,
    usernameValid: usernameValid,
    fullNameValid: fullNameValid

  }, this.validateForm)

}

validateForm() {
  this.setState({formValid:
     this.state.emailValid &&
     this.state.passwordValid &&
     this.state.password === this.state.Password2 &&
     this.state.usernameValid &&
     this.state.fullNameValid ? true : false
  })
}

errorClass(err) {
  return (err.length === 0 ? '' : 'has-error')
}

register = (event) => {
  event.preventDefault();
  this.setState({
   submitted: true
  });
  localStorage.setItem('react-form', JSON.stringify({
    fullName: this.state.fullName,
    email: this.state.email,
    username: this.state.username,
    password: this.state.password,
    Password2: this.state.Password2,
  }))
}


checkStatus = localStorage.getItem('react-form') ? true : null



deleteItem = () => {
  localStorage.removeItem('react-form');
  window.location.reload();
}

info = JSON.parse(localStorage.getItem('react-form'));

    render() {
      if (this.state.submitted === true || this.checkStatus === true) {
        
        return (
          
          <div id="main-wrapper" className="h-100">
              
<div className="container-fluid px-0 h-100">
  <div className="row no-gutters h-100">
      <div className="col-md-6 d-flex align-items-center">
      <div className="container my-4">
        <div className="row">
          <div className="col-11 col-lg-9 col-xl-8 mx-auto">
            <h3 className="font-weight-400 text-center mb-4">Welcome</h3>
            <div className="card">
        <div className="card-body">
            <h5 className="card-title">{this.state.fullName || this.info.fullName}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{this.state.email || this.info.email}</h6>
            <div>Username: {this.state.username || this.info.username}</div>
            <div>Password: {this.state.password || this.info.password}</div>
            <hr />
            <button className="btn btn-outline-danger mr-3" onClick={this.deleteItem}>Log out</button>
        </div>
    </div>
          </div>
        </div>
      </div>
    </div>


    <div className="col-md-6">
      <div className="hero-wrap d-flex align-items-center h-100">
        <div className="hero-mask opacity-8 bg-primary"></div>
        <div className="hero-bg hero-bg-scroll bg-img"></div>
        <div className="hero-content mx-auto w-100 h-100 d-flex flex-column">
          <div className="row no-gutters">
            <div className="col-10 col-lg-9 mx-auto">
              <div className="logo mt-5 mb-5 mb-md-0"> <a className="d-flex" href="index" title="React Validation form"><img src="images/logo-light.png" alt="" /></a> </div>
            </div>
          </div>
            <div className="row no-gutters my-auto">
              <div className="col-10 col-lg-9 mx-auto">
                <h1 className="text-11 text-white mb-4">React form with validation</h1>
                <p className="text-4 text-white line-height-4 mb-5">I guess react can do the same as well</p>
              </div>
            </div>
        </div>
      </div>
      </div>
  </div>
</div>
</div>

)
} else {
  return (
  
  <div id="main-wrapper" className="h-100">
          
  <div className="container-fluid px-0 h-100">
  <div className="row no-gutters h-100">
  <div className="col-md-6 d-flex align-items-center">
  <div className="container my-4">
    <div className="row">
      <div className="col-11 col-lg-9 col-xl-8 mx-auto">
        <h3 className="font-weight-400 mb-4">Register</h3>
        <form id="loginForm" onSubmit={this.register}>
        <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input type="text" className={[this.state.formErrors.fullName + ' form-control']} id="fullName" required placeholder="Enter Your Full Name" value={this.state.fullName} onChange={(event) => this.handleUserInput(event)} />
            { this.state.formErrors.fullName ?<div className='invalid-feedback has-error'><p>This field is required</p></div> : ''  }
          </div> 
  
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" className={this.state.formErrors.username + ' form-control'} id="username" required placeholder="Enter Your Username" value={this.state.username} onChange={(event) => this.handleUserInput(event)} />
            { this.state.formErrors.username ?<div className='invalid-feedback has-error'><p>Username must be greater than 3 characters</p></div> : ''  }
          </div> 
  
          <div className="form-group">
            <label htmlFor="email">E-Mail</label>
            <input type="email" className={this.state.formErrors.email + ' form-control'} id="email" required placeholder="Enter Your Email" value={this.state.email} onChange={(event) => this.handleUserInput(event)} />
            { this.state.formErrors.email ?<div className='invalid-feedback has-error'><p>Input a valid Email</p></div> : ''  }
          </div> 
  
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" className={this.state.formErrors.password + ' form-control'} id="password" required placeholder="Enter Your Password" value={this.state.password} onChange={(event) => this.handleUserInput(event)} />
            { this.state.formErrors.password ?<div className='invalid-feedback has-error'><p>Password must be greater than 5 characters</p></div> : ''  }
          </div> 
  
          
          <div className="form-group">
            <label htmlFor="Password2">Confirm Password</label>
            <input type="password" className={this.state.formErrors.Password2 + ' form-control'} id="Password2" required placeholder="Enter Confirm Password" value={this.state.Password2} onChange={(event) => this.handleUserInput(event)} />
            { this.state.formErrors.Password2 ?<div className='invalid-feedback has-error'><p>Both passwords must match</p></div> : ''  }
          </div>
  
          <div className="row">
            <div className="col-sm">
              <div className="form-check custom-control custom-checkbox">
                <input id="remember-me" name="remember" className="custom-control-input" type="checkbox" checked={this.state.isChecked} required onChange={(event) => this.handleUserInput(event)}  />
                <label className="custom-control-label" htmlFor="remember-me">Terms And Condition</label>
              </div>
            </div>
            <div className="col-sm text-right"><a className="btn-link" href="/">Having A Problem?</a></div>
          </div>
          <button className="btn btn-primary pill btn-block my-4" type="submit" disabled={!this.state.formValid}>Register</button>
        </form>
        <p className="text-3 text-center text-muted">Already have an account? <a className="btn-link" href="signin">Sign In</a></p>
      </div>
    </div>
  </div>
  </div>
  
  
  <div className="col-md-6">
  <div className="hero-wrap d-flex align-items-center h-100">
    <div className="hero-mask opacity-8 bg-primary"></div>
    <div className="hero-bg hero-bg-scroll bg-img"></div>
    <div className="hero-content mx-auto w-100 h-100 d-flex flex-column">
      <div className="row no-gutters">
        <div className="col-10 col-lg-9 mx-auto">
          <div className="logo mt-5 mb-5 mb-md-0"> <a className="d-flex" href="index" title="React Validation form"><img src="images/logo-light.png" alt="" /></a> </div>
        </div>
      </div>
        <div className="row no-gutters my-auto">
          <div className="col-10 col-lg-9 mx-auto">
            <h1 className="text-11 text-white mb-4">React form with validation</h1>
            <p className="text-4 text-white line-height-4 mb-5">I guess react can do the same as well</p>
          </div>
        </div>
    </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  
  )
}
  }
}
