import React, {useContext, useState, useEffect} from 'react';
import axios from 'axios';
import 'firebase/firestore';
import app, {auth}  from '../firebase'
const MovieContext = React.createContext();
const db = app.firestore()
export function useMovie() {
    return useContext(MovieContext)
}

export default function MovieProvider({children}) {
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [rentals, setRentals] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true)
    function getTrending() {
        axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=acb1f7cc631280f76384d486fc592d60`)
            .then(res => {
                setTrendingMovies(res.data.results)
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
        let userId = auth.currentUser.uid
        const rentalRef = db.collection('rentals').doc(userId);
        const doc = await rentalRef.get();



        return doc.data()
    }
    async function rentMovie(id ,title) {
        let userId = auth.currentUser.uid
        let duedate = new Date();
        let renteddate = new Date();
        renteddate = renteddate.toString();
        duedate.setDate((duedate.getDate() + 7))
        duedate = duedate.toString()
        console.log(duedate)
        const rentalRef = db.collection('rentals').doc(userId);
        const doc = await rentalRef.get();
        if (!doc.exists) {
            return db.collection('rentals').doc(userId).set(
                {
                    rentals: [
                        {
                            id,
                            title,
                            rented: renteddate,
                            due: duedate
                        }
                    ]

                })
        } else {
            return db.collection('rentals').doc(userId).set(
                {
                    rentals: [ ...doc.data().rentals,
                        {
                            id,
                            title,
                            rented: renteddate,
                            due: duedate
                        }
                    ]

                })
        }

    }

    useEffect(()=> {

        axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=acb1f7cc631280f76384d486fc592d60`)
            .then(res => {
                console.log('res');
                setTrendingMovies(res.data.results)
                setLoading(false)

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

    }
    return (
        <MovieContext.Provider value={value}>
            {!loading && children}
        </MovieContext.Provider>
    )
}
