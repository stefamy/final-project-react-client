import React from "react";
import { connect } from "react-redux";
import {Link} from "react-router-dom";
import userActions from "../../actions/UserActions";
import userService from "../../services/UserService";
import User from "./User";
import {push} from "connected-react-router";

class EditUser extends React.Component {

    state = {
        updatedUser:  {...this.props.user.profile},
    }

    handleProfileInput(attribute, newContent) {
      let newState = Object.assign({}, this.state);
      newState.updatedUser[attribute] = newContent;
      this.setState(newState);
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState) {
      if ((prevProps.user.id !== this.props.user.id) && this.props.user.id) {
        this.setState({updatedUser: this.props.user.profile});
      }
    }

    handleProfileSubmit(e) {
      e.preventDefault();
      this.props.updateUser(this.props.user, this.state.updatedUser);
    }

    render() {
        return(
            <>
              {!this.props.user.id &&
              <div className="bg-white border p-5">
                <h1>Profile</h1>
                <p>You are not logged in.<br/>
                <Link to="/login">Log in to</Link> or <Link to="/register">register a new</Link> account.</p>
              </div>
              }
              {this.props.user.id &&
              <div className="bg-white border p-5">
                <h1>Profile</h1>
                <p>Hi {this.props.user.profile.username}!</p>
                <hr/>
              <div className="row">
                <div className="col-md-6 col-lg-8 col">
                <form onSubmit={(e) => this.handleProfileSubmit(e)}>
                  <div className="form-group">
                    <label htmlFor="usernameInput">Username</label>
                    <input
                        id="usernameInput"
                        onChange={(e) => this.handleProfileInput('username', e.target.value)}
                        className={`form-control`}
                        placeholder={this.props.user.profile.username}
                        />
                  </div>
                  <div className="form-group">
                    <label htmlFor="passwordInput">Password</label>
                    <input
                        id="passwordInput"
                        onChange={(e) => this.handleProfileInput('password', e.target.value)}
                        className={`form-control`}
                        type="password"
                        placeholder='***'
                        />
                  </div>
                  <div className="form-group">
                    <label htmlFor="firstNameInput">First Name</label>
                    <input
                        id="firstNameInput"
                        onChange={(e) => this.handleProfileInput('firstName', e.target.value)}
                        className={`form-control`}
                        placeholder={this.props.user.profile.firstName || 'First Name'}
                        />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastNameInput">Last Name</label>
                    <input
                        id="lastNameInput"
                        onChange={(e) => this.handleProfileInput('lastName', e.target.value)}
                        className={`form-control`}
                        placeholder={this.props.user.profile.lastName || 'Last Name'}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="emailInput">Email Address</label>
                    <input
                        id="emailInput"
                        onChange={(e) => this.handleProfileInput('email', e.target.value)}
                        className={`form-control`}
                        placeholder={this.props.user.profile.email || 'Email Address'}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phoneInput">Phone Number</label>
                    <input
                        id="phoneInput"
                        onChange={(e) => this.handleProfileInput('phone', e.target.value)}
                        className={`form-control`}
                        placeholder={this.props.user.profile.phone}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="streetAddress1Input">Street Address</label>
                    <input
                        id="streetAddress1Input"
                        onChange={(e) => this.handleProfileInput('streetAddress1', e.target.value)}
                        className={`form-control`}
                        placeholder={this.props.user.profile.streetAddress1}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="streetAddress2Input">Street Address 2</label>
                    <input
                        id="streetAddress2Input"
                        onChange={(e) => this.handleProfileInput('streetAddress2', e.target.value)}
                        className={`form-control`}
                        placeholder={this.props.user.profile.streetAddress2}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="cityInput">City</label>
                    <input
                        id="cityInput"
                        onChange={(e) => this.handleProfileInput('city', e.target.value)}
                        className={`form-control`}
                        placeholder={this.props.user.profile.city}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="stateInput">State</label>
                    <input
                        id="stateInput"
                        onChange={(e) => this.handleProfileInput('state', e.target.value)}
                        className={`form-control`}
                        placeholder={this.props.user.profile.state}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="zipInput">Zip Code</label>
                    <input
                        id="zipInput"
                        onChange={(e) => this.handleProfileInput('zip', e.target.value)}
                        className={`form-control`}
                        placeholder={this.props.user.profile.zip}
                    />
                  </div>
                  <hr />
                  <h4>Dietary Preferences</h4>
                  <div className="form-group">

                  <div className="form-check">
                    <label htmlFor="glutenFreeInput">
                    <input
                        checked={this.state.updatedUser.glutenFree ? 1 : 0}
                        type="checkbox"
                        id="glutenFreeInput"
                        onChange={(e) => this.handleProfileInput('glutenFree',e.target.checked ? 1 : 0)}
                        className={`form-check-input`}
                    /> Gluten Free</label>
                  </div>
                  <div className="form-check">
                    <label htmlFor="vegetarianInput">
                    <input
                        checked={this.state.updatedUser.vegetarian ? 1 : 0}
                        type="checkbox"
                        id="vegetarianInput"
                        onChange={(e) => this.handleProfileInput('vegetarian', e.target.checked ? 1 : 0)}
                        className={`form-check-input`}
                    />Vegetarian</label>
                  </div>
                  <div className="form-check">
                    <label htmlFor="veganInput">
                    <input
                        checked={this.state.updatedUser.vegan ? 1 : 0}
                        type="checkbox"
                        id="veganInput"
                        onChange={(e) => this.handleProfileInput('vegan', e.target.checked ? 1 : 0)}
                        className={`form-check-input`}
                    />Vegan</label>

                  </div>
                  <div className="form-check">
                    <label htmlFor="nutAllergyInput">
                    <input
                        checked={this.state.updatedUser.nutAllergy ? 1 : 0}
                        type="checkbox"
                        id="nutAllergyInput"
                        onChange={(e) => this.handleProfileInput('nutAllergy', e.target.checked ? 1 : 0)}
                        className={`form-check-input`}
                    />Nut Allergy</label>
                  </div>
                    <div className="form-group">
                      <label htmlFor="otherDietaryInput">Other Dietary Restrictions</label>
                      <input
                          id="otherDietaryInput"
                          onChange={(e) => this.handleProfileInput('otherDietaryRestrictions', e.target.value)}
                          className={`form-control`}
                          placeholder={this.props.user.profile.otherDietaryRestrictions}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="specialRequestsInput">Special Requests</label>
                      <input
                          id="specialRequestsInput"
                          onChange={(e) => this.handleProfileInput('specialRequests', e.target.value)}
                          className={`form-control`}
                          placeholder={this.props.user.profile.specialRequests}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <button
                        type="submit"
                        className={`btn btn-primary btn-block`}>
                      Update Profile
                    </button>
                  </div>

                </form>
                <hr/>
                  <button
                      onClick={this.props.logout}
                      className={`btn btn-danger`}>
                      Logout
                  </button>
              </div>
              </div>
                </div>
                  }

            </>
        )
    }
}


const stateToPropertyMapper = state => {
  return {
    user: state.user.user
  }
    
};

const dispatchToPropertyMapper = dispatch => {
  return {
    logout: () => {
      userService.logout()
      .then(() => dispatch(userActions.logout()));
    },
    updateUser: (user, newProfile) => {
      userService.updateCurrentUser(newProfile)
      .then(newUser => {
        dispatch(userActions.updateCurrentUserProfile(user, newProfile));
        dispatch(push('/profile/' + newProfile.username));
      });
    },
  };
};

export default connect(
    stateToPropertyMapper,
    dispatchToPropertyMapper
)(EditUser);
