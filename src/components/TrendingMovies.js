import React, {useEffect, useState} from 'react';
import {Card, Button, Alert, Container, Row, Col, Modal} from 'react-bootstrap';
import MovieProvider, {useMovie} from "../contexts/MovieContext";
import axios from "axios";


export default function Dashboard() {
    const [error, setError] = useState('');
    //const [trendingMovies, setTrendingMovies] = useState([])
    const [show, setShow] = useState(false);
    const [modalInfo, setModalInfo] = useState({title: '', description: ''})
    const { trendingMovies, rentMovie } = useMovie();
    const handleShow = (t, d) => {
        setModalInfo({title: t, description: d})
        return setShow(true)
    };
    const handleClose = () => setShow(false);
    const handleRent = (id,t) => {
        rentMovie(id,t);
    }


    let movieCards = trendingMovies.map((m,i) => {
            return (
                <Col xs={12} md={6} lg={3} className={'mb-4'}>
                    <Card key={m.id} >
                        <Card.Img style={{height: '300px'}} variant="top" src={'https://image.tmdb.org/t/p/w300/' + m['poster_path']} />
                        <Card.Body>
                            <Container className={'align-items-center text-center'}>
                                <Card.Title style={{textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden'}}>{m.title}</Card.Title>
                                <Card.Text style={{color: '#eeeeee'}} >
                                    Release Date: {m['release_date']}
                                    <br/>
                                    Score: {m['vote_average']}
                                </Card.Text>
                                <Button style={{backgroundColor: '#eeeeee', color:'#393e46'}} variant="light" className={'mr-2'} onClick={() => handleShow(m.title, m.overview)}>Details</Button>
                                <Button style={{backgroundColor: '#ffd369', color:'#393e46'}} variant="warning" onClick={() => handleRent(m.id, m.title)}>Rent</Button>
                            </Container>

                        </Card.Body>
                    </Card>

                </Col>
            )
        })



    return (
        <>

            <Container fluid>
                <Row>
                    {movieCards}
                </Row>

            </Container>

            <Modal show={show} onHide={handleClose} className='modal'>
                <Modal.Header closeButton style={{color: '#ffd369'}}>
                    <Modal.Title>{modalInfo.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{color: '#eeeeee'}}>{modalInfo.description}</Modal.Body>
                <Modal.Footer>
                    <Button style={{backgroundColor: '#393e46'}} variant="secondary" onClick={handleClose}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>


        </>
    )
}
