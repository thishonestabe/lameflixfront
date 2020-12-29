import React, {useRef, useState} from 'react';
import {Navbar, Button, Nav, Form} from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext'
import { useHistory } from "react-router";
import { useMovie } from '../contexts/MovieContext';
import { Link } from 'react-router-dom';

export default function Navigation() {
    const [error, setError] = useState('');
    const searchRef = useRef();
    const { currentUser, logout } = useAuth();
    const { searchMovieTitle, getTrending } = useMovie();
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
    async function handleSearch(title) {
        setError('')

        try {
            if(!title) {
               await getTrending()
            } else {
                await searchMovieTitle(title)
            }

        } catch {
            setError('No movies found')
        }
    }
    return (
        <>
            <Navbar style={{width: '100vw'}} bg="dark">
                <Navbar.Brand>
                    <span ><Link style={{color: '#ffd369'}} to={'/'}>LAMEFLIX</Link></span>
                </Navbar.Brand>
                <Nav className={'mr-auto'}>
                    <Nav.Link >
                        <Button style={{color: '#eeeeee'}} variant={'link'} onClick={handleLogout}>Log Out</Button>
                    </Nav.Link>
                    <Nav.Link >
                        <Button variant={'link'}><Link style={{color: '#eeeeee'}} to={'/mymovies'}>My Movies</Link></Button>
                    </Nav.Link>
                </Nav>
                <Form inline>
                    <Form.Group id={"search"}>
                    <Form.Control type="text" ref={searchRef}  placeholder="Search" className="mr-sm-2" />
                    </Form.Group>
                    <Button variant="outline-warning" onClick={() => handleSearch(searchRef.current.value)}>Search</Button>
                </Form>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text style={{color: 'white'}}>
                        Signed in as: {currentUser && currentUser.hasOwnProperty('email') && currentUser.email }
                    </Navbar.Text>
                </Navbar.Collapse>
            </Navbar>

        </>
    )
}
