import React from 'react'
import { Route, Switch } from 'react-router'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import NotFound from '../components/not-found/NotFound'
import Home from '../components/home/Home'
import Login from '../components/users/Login'
import Register from '../components/users/Register'
import User from '../components/users/User'
import EditUser from '../components/users/EditUser'
import Search from '../search/Search'
import EventList from '../components/events/EventList'
import Event from '../components/events/Event'
import InviteList from '../components/rsvps/RsvpList'
import TaskList from '../components/tasks/UserTaskList'
import RecipeDetails from "../components/recipes/RecipeDetails";

const routes = (
    <div className="wrap">
      <Header/>
      <div className="container mt-lg-5 mb-lg-5 mt-md-4 mb-md-4 mt-2 mb-2 pl-2 pr-2">
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/login" exact={true} component={Login}/>
          <Route exact path="/register" component={Register}/>
          <Route exact path="/profile/:username" component={User}/>
          <Route exact path="/profile/user/edit" component={EditUser}/>
          <Route exact path="/events" component={EventList}/>
          <Route exact path="/event/:eventId" component={Event}/>
          <Route exact path="/invites" component={InviteList}/>
          <Route exact path="/tasks" component={TaskList}/>
          <Route exact path="/search" component={Search}/>
          <Route exact path="/recipe" component={RecipeDetails}/>
          <Route component={NotFound}/>
        </Switch>
      </div>
      <Footer/>
    </div>
)

export default routes
