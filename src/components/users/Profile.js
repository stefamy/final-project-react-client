import React from "react";
import {
  profile,
  logout,
  updateProfile
} from "../../services/UserService";
import {Link} from "react-router-dom";

export default class Profile extends React.Component {

    state = {
        profile: {
            id: '',
            username: '',
            password: '',
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            streetAddress1: '',
            streetAddress2: '',
            city: '',
            state: '',
            zip: '',
            glutenFree: '',
            vegetarian: '',
            vegan: '',
            nutAllergy: '',
            otherDietaryRestrictions: '',
            specialRequests: '',
            roles: []
        }
    }

    handleProfileInput(attribute, newContent) {
      let newState = Object.assign({}, this.state);
      newState.profile[attribute] = newContent;
      this.setState(newState);
    }

    componentDidMount() {
      profile()
      .then(profile => {
        this.setState({
          profile: profile,
          loggedIn: true
        })
        console.log('this profile', this.state.profile);
      }).catch(error => this.setState({loggedIn: false}));
    }

    logout = () => {
      logout()
      .then(status => {
        this.props.history.push('/')
      });
    }

    updateProfile = (e, user) => {
      e.preventDefault();
      console.log('updating user:', user);
      updateProfile(user)
      .then(updatedUser => this.props.history.push('/profile'));
    }

    render() {
        return(
            <div>
              <h1>Profile</h1>
              {!this.state.loggedIn &&
              <p>You are not logged in.<br/>
              <Link to="/login">Log in to</Link> or <Link to="/register">register a new</Link> account.</p>
              }
              {this.state.loggedIn &&
                <div>
                <p>Hi {this.state.profile.username}!</p>
                <hr/>
              <div className="row">
                <div className="col-md-4 col-lg-6 col">
                <form onSubmit={(e) => this.updateProfile(e, this.state.profile)}>
                  <div className="form-group">
                    <label htmlFor="usernameInput">Username</label>
                    <input
                        id="usernameInput"
                        onChange={(e) => this.handleProfileInput('username', e.target.value)}
                        className={`form-control`}
                        placeholder={this.state.profile.username}
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
                        placeholder={this.state.profile.firstName}
                        />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastNameInput">Last Name</label>
                    <input
                        id="lastNameInput"
                        onChange={(e) => this.handleProfileInput('lastName', e.target.value)}
                        className={`form-control`}
                        placeholder={this.state.profile.lastName}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="emailInput">Email Address</label>
                    <input
                        id="emailInput"
                        onChange={(e) => this.handleProfileInput('email', e.target.value)}
                        className={`form-control`}
                        placeholder={this.state.profile.email}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phoneInput">Phone Number</label>
                    <input
                        id="phoneInput"
                        onChange={(e) => this.handleProfileInput('phone', e.target.value)}
                        className={`form-control`}
                        placeholder={this.state.profile.phone}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="streetAddress1Input">Street Address</label>
                    <input
                        id="streetAddress1Input"
                        onChange={(e) => this.handleProfileInput('streetAddress1', e.target.value)}
                        className={`form-control`}
                        placeholder={this.state.profile.streetAddress1}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="streetAddress2Input">Street Address 2</label>
                    <input
                        id="streetAddress2Input"
                        onChange={(e) => this.handleProfileInput('streetAddress2', e.target.value)}
                        className={`form-control`}
                        placeholder={this.state.profile.streetAddress2}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="cityInput">City</label>
                    <input
                        id="cityInput"
                        onChange={(e) => this.handleProfileInput('city', e.target.value)}
                        className={`form-control`}
                        placeholder={this.state.profile.city}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="stateInput">State</label>
                    <input
                        id="stateInput"
                        onChange={(e) => this.handleProfileInput('state', e.target.value)}
                        className={`form-control`}
                        placeholder={this.state.profile.state}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="zipInput">Zip Code</label>
                    <input
                        id="zipInput"
                        onChange={(e) => this.handleProfileInput('zip', e.target.value)}
                        className={`form-control`}
                        placeholder={this.state.profile.zip}
                    />
                  </div>
                  <hr />
                  <h4>Dietary Preferences</h4>
                  <div className="form-group">

                  <div className="form-check">
                    <label htmlFor="glutenFreeInput">Gluten Free</label>

                    <input
                        checked={this.state.profile.glutenFree ? 1 : 0}
                        type="checkbox"
                        id="glutenFreeInput"
                        onChange={(e) => this.handleProfileInput('glutenFree',e.target.checked ? 1 : 0)}
                        className={`form-check-input`}
                    />

                  </div>
                  <div className="form-check">
                    <label htmlFor="vegetarianInput">Vegetarian</label>
                    <input
                        checked={this.state.profile.vegetarian ? 1 : 0}
                        type="checkbox"
                        id="vegetarianInput"
                        onChange={(e) => this.handleProfileInput('vegetarian', e.target.checked ? 1 : 0)}
                        className={`form-check-input`}
                    />
                  </div>
                  <div className="form-check">
                    <label htmlFor="veganInput">Vegan</label>

                    <input
                        checked={this.state.profile.vegan ? 1 : 0}
                        type="checkbox"
                        id="veganInput"
                        onChange={(e) => this.handleProfileInput('vegan', e.target.checked ? 1 : 0)}
                        className={`form-check-input`}
                    />

                  </div>
                  <div className="form-check">
                    <label htmlFor="nutAllergyInput">Nut Allergy</label>

                    <input
                        checked={this.state.profile.nutAllergy ? 1 : 0}
                        type="checkbox"
                        id="nutAllergyInput"
                        onChange={(e) => this.handleProfileInput('nutAllergy', e.target.checked ? 1 : 0)}
                        className={`form-check-input`}
                    />

                  </div>
                    <div className="form-group">
                      <label htmlFor="otherDietaryInput">Other Dietary Restrictions</label>
                      <input
                          id="otherDietaryInput"
                          onChange={(e) => this.handleProfileInput('otherDietaryRestrictions', e.target.value)}
                          className={`form-control`}
                          placeholder={this.state.profile.otherDietaryRestrictions}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="specialRequestsInput">Special Requests</label>
                      <input
                          id="specialRequestsInput"
                          onChange={(e) => this.handleProfileInput('specialRequests', e.target.value)}
                          className={`form-control`}
                          placeholder={this.state.profile.specialRequests}
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
                      onClick={this.logout}
                      className={`btn btn-danger`}>
                      Logout
                  </button>
              </div>
              </div>
                </div>
                  }
            </div>
        )
    }
}
