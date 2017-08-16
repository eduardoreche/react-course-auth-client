import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signup extends Component {
  handleFormSubmit(formProps) {
    this.props.signupUser(formProps);
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> { this.props.errorMessage }
        </div>
      )
    }
  }

  renderField({ input, label, type, meta: { touched, error, warning }}) {
    return (
      <fieldset className="form-group">
        <label>{label}: </label>
        <input {...input} placeholder={label} type={type} className="form-control" />
        {touched && error && <div className="error">{error}</div>}
      </fieldset>
    );
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <Field
          name="email"
          component={this.renderField}
          type="text"
          className="form-control"
          label="Email"
        />

        <Field
          name="password"
          component={this.renderField}
          className="form-control"
          type="password"
          label="Password"
        />

        <Field
          name="confirm"
          component={this.renderField}
          className="form-control"
          type="password"
          label="Confirm your password"
        />
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign up!</button>
      </form>
    )
  }
}

function validate(formProps) {
  const errors = {};

  if (!formProps.email) {
    errors.email = 'Please enter an email';
  }

  if (!formProps.password) {
    errors.password = 'Please enter a password';
  }

  if (!formProps.confirm) {
    errors.confirm = 'Please enter a password confirmation';
  }

  if (formProps.password !== formProps.confirm) {
    errors.password = 'Passwords must match';
  }

  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

const reduxFormSignin = reduxForm({
  form: 'signupForm',
  validate,
})(Signup);

export default connect(mapStateToProps, actions)(reduxFormSignin);
