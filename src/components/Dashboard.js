import React, {useEffect, useState} from 'react';
import {Card, Button, Alert, Container} from 'react-bootstrap';
import AuthProvider, { useAuth } from '../contexts/AuthContext'
import { useHistory } from "react-router";
import Navigation from './Navigation'
import TrendingMovies from './TrendingMovies'


export default function Dashboard() {
    const [error, setError] = useState('');
    const { currentUser, logout } = useAuth();


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

                    <Card>
                        <Card.Body className="card-body">
                            <h2 className={"text-center mb-4"}>Welcome</h2>

                            {error && <Alert variant={"danger"}>{error}</Alert>}

                        </Card.Body>
                    </Card>
                <br/>
                <h2 className={"text-center mb-4"}>Trending Movies</h2>
                <TrendingMovies />



        </>
    )
}
