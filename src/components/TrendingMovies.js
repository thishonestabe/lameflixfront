import React, {useEffect, useState} from 'react';
import {Card, Button, Alert, Container, Row, Col, Modal, Carousel} from 'react-bootstrap';
import MovieProvider, {useMovie} from "../contexts/MovieContext";
import axios from "axios";


export default function Dashboard() {
    const [error, setError] = useState('');
    //const [trendingMovies, setTrendingMovies] = useState([])
    const [show, setShow] = useState(false);
    const [modalInfo, setModalInfo] = useState({title: '', description: ''})
    const { trendingMovies, rentMovie, dramaMovies, actionMovies, comedyMovies } = useMovie();

    const handleShow = (t, d) => {
        setModalInfo({title: t, description: d})
        return setShow(true)
    };
    const handleClose = () => setShow(false);
    const handleRent = (id,t) => {
        rentMovie(id,t);
        alert(`${t} movie rented`)
    }

    let addCards = (arr) => {
        return arr.map((m,i) => {
            return (

                <Col xs={12} md={6} lg={3} className={'mb-4'}>
                    <Card key={m.id}>
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
    }
    // let movieCards = trendingMovies.map((m,i) => {
    //         return (
    //
    //             <Col xs={12} md={6} lg={3} className={'mb-4'}>
    //                 <Card key={m.id}>
    //                     <Card.Img style={{height: '300px'}} variant="top" src={'https://image.tmdb.org/t/p/w300/' + m['poster_path']} />
    //                     <Card.Body>
    //                         <Container className={'align-items-center text-center'}>
    //                             <Card.Title style={{textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden'}}>{m.title}</Card.Title>
    //                             <Card.Text style={{color: '#eeeeee'}} >
    //                                 Release Date: {m['release_date']}
    //                                 <br/>
    //                                 Score: {m['vote_average']}
    //                             </Card.Text>
    //                             <Button style={{backgroundColor: '#eeeeee', color:'#393e46'}} variant="light" className={'mr-2'} onClick={() => handleShow(m.title, m.overview)}>Details</Button>
    //                             <Button style={{backgroundColor: '#ffd369', color:'#393e46'}} variant="warning" onClick={() => handleRent(m.id, m.title)}>Rent</Button>
    //                         </Container>
    //
    //                     </Card.Body>
    //                 </Card>
    //
    //             </Col>
    //
    //         )
    //     })
    let divideInto4 = (arr) => {
        let counter = 0;
        let arrayOf4 = [];
        let carrouselOfMovies = [];
        for(let item of arr) {

            if(counter !== 4) {
                arrayOf4.push(item)
                counter++;
            } else {
                counter = 0;
                carrouselOfMovies.push(arrayOf4);
                arrayOf4 = []
            }
        }
        return carrouselOfMovies
    }
    let makeCarrousel = (arr) => {
        return arr.map((item, index) => {
            return (

                <Carousel.Item key={`${index}trending`}>
                    <Container>
                        <Row>
                            {item}
                        </Row>
                    </Container>
                </Carousel.Item>

            )
        })
    }



   let carrusel = addCards(trendingMovies);
    carrusel = divideInto4(carrusel);
    carrusel = makeCarrousel(carrusel);
    let drama = addCards(dramaMovies);
    drama = divideInto4(drama);
    drama = makeCarrousel(drama);
    let action = addCards(actionMovies);
    action = divideInto4(action);
    action = makeCarrousel(action);
    let comedy = addCards(comedyMovies);
    comedy = divideInto4(comedy);
    comedy = makeCarrousel(comedy);




    return (
        <>



                <h3 style={{textAlign: 'center', color: 'white'}}>Trending Movies</h3>

                <Container fluid>


                        <Row>
                            <Carousel style={{width: '100vw', paddingBottom: '20px'}}>

                                {carrusel}

                            </Carousel>
                        </Row>


                </Container>

            <h3 style={{textAlign: 'center', color: 'white'}}>Drama Movies</h3>

            <Container fluid>


                <Row>
                    <Carousel style={{width: '100vw', paddingBottom: '20px'}}>

                        {drama}

                    </Carousel>
                </Row>


            </Container>

            <h3 style={{textAlign: 'center', color: 'white'}}>Action Movies</h3>

            <Container fluid>


                <Row>
                    <Carousel style={{width: '100vw', paddingBottom: '20px'}}>

                        {action}

                    </Carousel>
                </Row>


            </Container>

            <h3 style={{textAlign: 'center', color: 'white'}}>Comedy Movies</h3>

            <Container fluid>


                <Row>
                    <Carousel style={{width: '100vw', paddingBottom: '20px'}}>

                        {comedy}

                    </Carousel>
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
