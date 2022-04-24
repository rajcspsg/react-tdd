import React from "react";
import axios from "axios";

class SignUpPage extends React.Component {

    state = {
    }

    onChange = (event) => {
        const {id, value} = event.target;
        this.setState({
            [id]:value
        })
    };

    onChangeUsername = (event) => {
        const currentValue = event.target.value;
        this.setState({
            username: currentValue,
          //  disabled: currentValue !== this.state.confirmPassword
        });
    };

    onChangeEmail = (event) => {
        const currentValue = event.target.value;
        this.setState({
            email: currentValue,
          //  disabled: currentValue !== this.state.confirmPassword
        });
    };
    
    onChangePassword= (event) => {
        const currentValue = event.target.value;
        this.setState({
            password: currentValue,
          //  disabled: currentValue !== this.state.confirmPassword
        });
    };

    onChangeConfirmPassword= (event) => {
        const currentValue = event.target.value;
        this.setState({
            confirmPassword: currentValue,
         //   disabled: currentValue !== this.state.password
        });
    };

    submit = (event) => {
        event.preventDefault();
      const {username, email, password } =  this.state;
      const body = {
          username, email, password
      }
      //axios.post('/api/1.0/users', body);
      fetch("http://localhost:3000/api/1.0/users", {
          method: 'POST',
          headers : {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(body)
      });
    };

    render() {
        let disabled = true;
        const { password, confirmPassword} = this.state;
        if(password && confirmPassword) {
            disabled = password !== confirmPassword;
        }

        // setTimeout(() => {
        //     this.setState({disabled: false});
        //     console.log('updating disabled');
        // }, 1000);

        return (
        <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2">
            <form className="card mt-5">
            <h1 className="text-center card-header">Sign Up</h1>

            <div className="card-body">
            <div className="mb-3">            
            <label htmlFor="username" className="form-label">Username</label>
            <input id="username"onChange={this.onChange} className="form-control"/>
            </div>

            <div className="mb-3"><label htmlFor="email" className="form-label">E-mail</label>
            <input id="email" onChange={this.onChange} className="form-control mb-4"/>
            </div>
            <div className="mb-3"><label htmlFor="password" className="form-label">Password</label>
            <input id="password" type="password" onChange={this.onChange} className="form-control"/>
            </div>
            <div className="mb-3"><label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input id="confirmPassword" type="password" onChange={this.onChange} className="form-control"/>
            </div>
            <div className="text-right">
            <button disabled={disabled} onClick={this.submit} className="btn btn-primary">Sign Up</button>
            </div>
            </div>
            </form>
        </div>
        );
    }
}


export default SignUpPage;