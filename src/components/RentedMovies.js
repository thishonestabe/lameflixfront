import React, {useEffect, useState} from 'react';
import {Card, Button, Container, Table} from 'react-bootstrap';
import {useMovie} from "../contexts/MovieContext";
import Navigation from "./Navigation";
import axios from "axios";


export default function Dashboard() {
    const [error, setError] = useState('');
    const { getRentals, rentals } = useMovie();
    const [rentedMovies, setRentedMovies] = useState([]);
    //let rentedMovies = []
    useEffect(()=> {
        getRentals().then(o => {
            if (!o) {
                return
            }
            console.log(o.rentals)
            //rentedMovies = o.rentals;
            // let a = o.rentals.map(obj => {
            //     obj.due = obj.due.toDateString()
            //     obj.rented = obj.rented.toDateString()
            //     return
            // })
            setRentedMovies(o.rentals)
            console.log(rentedMovies)
        })
    }, [])


       let rentedMoviesTable = rentedMovies.map((m, i) => {
            return (
                <tr  className='rentedMoviesHover'  key={i}>
                    <td>{m.id}</td>
                    <td>{m.title}</td>
                    <td>{m.rented}</td>
                    <td>{m.due}</td>
                    <td><Button style={{backgroundColor: '#ffd369', color:'#393e46'}} variant="warning">Return</Button></td>
                </tr>
            )
        })



    return (
        <>
            <Navigation/>
            <Container className={'mt-5 text-center'}>
                <h1 className={'mb-5'}>Rented Movies</h1>
                <Table style={{color: '#ffd369'}}  striped bordered >
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Day Rented</th>
                        <th>Due Date</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody style={{color: '#eeeeee'}}>
                    {rentedMoviesTable}
                    </tbody>
                </Table>

            </Container>




        </>
    )
}
