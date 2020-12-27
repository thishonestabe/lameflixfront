import React, {useRef, useState} from 'react'
import {Card, Form, Button, Alert} from 'react-bootstrap'
import { useAuth } from "../contexts/AuthContext";
import {Link, useHistory} from 'react-router-dom'

import '../App.css'

export default function Signup() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const {signup}  = useAuth();
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {

            return setError('Passwords do not match!')
        }
        try {
            setError('');
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value )
            setLoading(false);
            history.push('/')
        } catch {
            setError('Failed to create an account!')
            setLoading(false);
        }


    }
    return (
        <>
            <h1 className={"text-center mt-5"}>LAMEFLIX</h1>
            <Card >
                <Card.Body className="cardBody">
                    <h2 className={"text-center mb-4"}>Sign Up</h2>

                    {error && <Alert variant={"danger"}>{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id={"email"}>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type={"email"} ref={emailRef} required/>
                        </Form.Group>
                        <Form.Group id={"password"}>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type={"password"} ref={passwordRef} required/>
                        </Form.Group>
                        <Form.Group id={"password-confirm"}>
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type={"password"} ref={passwordConfirmRef} required/>
                        </Form.Group>
                        <Button disabled={loading} className={"w-100 botonPrimario"} type={"submit"}>Sign Up</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className={"w-100 text-center mt-2"}>
                <Link className={"text-center"} to={'/login'}>  Log In </Link>
            </div>
        </>
    )
}
