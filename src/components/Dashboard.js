import React, {useEffect, useState} from 'react';
import {Card, Button, Alert, Container} from 'react-bootstrap';
import AuthProvider, { useAuth } from '../contexts/AuthContext'
import { useHistory } from "react-router";
import Navigation from './Navigation'
import TrendingMovies from './TrendingMovies'


export default function Dashboard() {
    const [error, setError] = useState('');
    const { currentUser, logout } = useAuth();
    
    const horrorMovie = 'https://api.themoviedb.org/3/discover/movie?api_key=acb1f7cc631280f76384d486fc592d60&with_genres=27'
    const actionMovie = 'https://api.themoviedb.org/3/discover/movie?api_key=acb1f7cc631280f76384d486fc592d60&with_genres=28' 
    const dramaMovie = 'https://api.themoviedb.org/3/discover/movie?api_key=acb1f7cc631280f76384d486fc592d60&with_genres=18' 
    const fanatsyMovie = 'https://api.themoviedb.org/3/discover/movie?api_key=acb1f7cc631280f76384d486fc592d60&with_genres=14' 


    const history = useHistory();

    async function handleLogout() {
        setError('')
        try {
            await logout()
            history.push('./login')
        } catch {
            setError('Failed to logout')
        }
    }

    return (
        <>


                <Navigation/>
                <br/>
                <TrendingMovies />



        </>
    )
}
