import React, {useContext, useState, useEffect} from 'react';
import axios from 'axios';
import 'firebase/firestore';
import { useAuth } from './AuthContext'
import app, {auth}  from '../firebase'
const MovieContext = React.createContext();

const db = app.firestore()
export function useMovie() {
    return useContext(MovieContext)
}

export default function MovieProvider({children}) {
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [dramaMovies, setDramaMovies] = useState([]);
    const [actionMovies, setActionMovies] = useState([]);
    const [comedyMovies, setComedyMovies] = useState([]);
    const [rentals, setRentals] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true)
    const { currentUser } = useAuth();
    function getTrending() {
        axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=acb1f7cc631280f76384d486fc592d60`)
            .then(res => {
                setTrendingMovies(res.data.results)
                setLoading(false)
            })
    }

        function getDrama() {
            axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=acb1f7cc631280f76384d486fc592d60&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=18`)
                .then(res => {
                    setDramaMovies(res.data.results)
                    setLoading(false)
                })
        }
    function searchMovieTitle(title) {
        axios.get(`https://api.themoviedb.org/3/search/movie?api_key=acb1f7cc631280f76384d486fc592d60&language=en-US&query=${title}&page=1&include_adult=false`)
            .then(res => {
                setTrendingMovies(res.data.results)
                setLoading(false)
            })
    }
  
    async function getRentals() {
        let token = currentUser.access_token;


        return axios.get(`http://localhost:8000/api/v1/rental/getrentals`, {
            headers: {
                Authorization: 'Bearer ' + token //the token is a variable which holds the token
            }
        })

    }

    async function returnMovie(id) {
        let token = currentUser.access_token;

        const params = new URLSearchParams()
        params.append('id', id)

        return axios.post(`http://localhost:8000/api/v1/rental/return`,params, {
            headers: {
                Authorization: 'Bearer ' + token //the token is a variable which holds the token
            }
        })

    }
    async function rentMovie(id ,title) {

        let token = currentUser.access_token;

        const params = new URLSearchParams()
        params.append('movieId', id)
        params.append('title', title)



        return axios.post(`http://localhost:8000/api/v1/rental/create`, params ,{
            headers: {
                Authorization: 'Bearer ' + token //the token is a variable which holds the token
            }
        }).then(res => {
            console.log("rent movie");
            console.log(res)
        })


    }

    useEffect(()=> {



        axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=acb1f7cc631280f76384d486fc592d60`)
            .then(res => {
                console.log('res');
                setTrendingMovies(res.data.results)
                setLoading(false)

            });
        axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=acb1f7cc631280f76384d486fc592d60&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=18`)
            .then(res => {

                setDramaMovies(res.data.results)

            })
        axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=acb1f7cc631280f76384d486fc592d60&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=28`)
            .then(res => {

                setActionMovies(res.data.results)

            })
        axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=acb1f7cc631280f76384d486fc592d60&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=35`)
            .then(res => {

                setComedyMovies(res.data.results)

            })



    }, [])


    const value = {
        trendingMovies,
        currentPage,
        getTrending,
        searchMovieTitle,
        rentMovie,
        getRentals,
        rentals,
        getDrama,
        dramaMovies,
        actionMovies,
        comedyMovies,
        returnMovie

    }
    return (
        <MovieContext.Provider value={value}>
            {!loading && children}
        </MovieContext.Provider>
    )
}
