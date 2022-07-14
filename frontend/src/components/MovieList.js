import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import API from '../api-service';
import './MovieList.css';
import { useCookies } from 'react-cookie';


function MovieList(props) {

    const [token] = useCookies(['Mr-Cookie']);

    const onClick = movie => {
        props.onClick(movie);
    }

    const editClicked = movie => {
        props.editClicked(movie);
    }

    const trashClicked = movie => {
        API.deleteMovie(movie.id, token['Mr-Cookie'])
            .then(() => props.trashClicked(movie))
            .catch( error => console.log(error))
    }

    return (
            <div className='movie-list'>
                <h2>Movies List</h2>
                { Array.isArray(props.movies) && props.movies.map( movie => {
                    return (
                        <div key={movie.id} className='movie-item'>
                                    <h4 onClick={event => onClick(movie)}>
                                        {movie.title}
                                    </h4>
                                    <FontAwesomeIcon icon={faEdit} className='faEdit'
                                        onClick={() => editClicked(movie)} 
                                    />
                                    <FontAwesomeIcon icon={faTrash} className='faTrash'
                                        onClick={() => trashClicked(movie)}
                                    />
                        </div>
                    )
                })}
            </div>
    );
}


export default MovieList;