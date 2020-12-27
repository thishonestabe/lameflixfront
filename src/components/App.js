import React from "react";
import Signup from "./Signup";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container} from "react-bootstrap";
import AuthProvider from "../contexts/AuthContext";
import {BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login"
import PrivateRoute from "./PrivateRoute";
import MovieProvider from "../contexts/MovieContext";
import RentedMovies from "./RentedMovies";


import '../App.css';



function App() {
  return (


          <Container className={"d-flex justify-content-center"}
                     style={{minHeight: "100vh"}}>
              <div className="w100" style={{maxWidth: '100vw'}}>
                  <Router>
                      <AuthProvider>
                            <MovieProvider>
                                <Switch>
                                    <PrivateRoute exact path='/' component={Dashboard}/>
                                    <Route path='/signup' component={Signup}/>
                                    <Route path='/login' component={Login}/>
                                    <Route path='/mymovies' component={RentedMovies}/>
                                </Switch>
                            </MovieProvider>


                      </AuthProvider>
                  </Router>

              </div>

          </Container>


      )
}

export default App;
