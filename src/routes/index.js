import React from 'react'
import { Route, Switch } from 'react-router'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import NotFound from '../components/not-found/NotFound'
import Home from '../components/home/Home'
import Login from '../components/users/Login'
import Register from '../components/users/Register'
import User from '../components/users/User'
import Search from '../search/Search'
import EventList from '../components/events/EventList'
import Event from '../components/events/Event'
import InviteList from '../components/rsvps/RsvpList'
import TaskList from '../components/tasks/UserTaskList'
import RecipeDetails from "../components/recipes/RecipeDetails";

const routes = (
    <div className="wrap">
      <Header/>
      <div className="container mt-5 pb-5">
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/login" exact={true} component={Login}/>
          <Route exact path="/register" component={Register}/>
          <Route exact path="/profile" component={User}/>
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
