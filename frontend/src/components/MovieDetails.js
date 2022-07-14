import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import './MovieDetails.css';
import { useCookies } from 'react-cookie';


function MovieDetails(props) {

    const movie = props.movie;

    const [ highLighted, setHighLighted ] = useState();
    const [token] = useCookies(['Mr-Cookie']);

    const highLightRate = highlight => event => {
        setHighLighted(highlight);
    }

    const onClick = rate => event => {
        fetch(`http://127.0.0.1:8000/api/movies/${movie.id}/movie_rating/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token['Mr-Cookie']}`
      },
      body: JSON.stringify( {rating: rate + 1 } )
    }).then( response => response.json())
      .then( response => getDetails())
      .catch( e => console.log(e))
    }

    const getDetails = () => {
        fetch(`http://127.0.0.1:8000/api/movies/${movie.id}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token['Mr-Cookie']}`
            }
        })
            .then( response => response.json())
            .then( response => props.updateMovie(response))
            .catch( e => console.log(e))
    }

    return(
        <React.Fragment>
            { movie ? (
                <div>
                    <h3>{movie && movie.title}</h3>
                    <p>{movie && movie.description}</p>
                    <b>Avg Ratings : 
                        <FontAwesomeIcon icon={faStar} className={movie.avg_ratings > 0 ? 'orange' : ''}/>
                        <FontAwesomeIcon icon={faStar} className={movie.avg_ratings > 1 ? 'orange' : ''}/>
                        <FontAwesomeIcon icon={faStar} className={movie.avg_ratings > 2 ? 'orange' : ''}/>
                        <FontAwesomeIcon icon={faStar} className={movie.avg_ratings > 3 ? 'orange' : ''}/>
                        <FontAwesomeIcon icon={faStar} className={movie.avg_ratings > 4 ? 'orange' : ''}/>
                        ({movie.no_of_ratings})
                    </b>
                    <div className="rate-container">
                        <h4>Watched The Movie? Rate It For Others.</h4>
                        {
                            [...Array(5)].map( (e, i) => {
                                return <FontAwesomeIcon key={i} icon={faStar} className={highLighted > i - 1 ? 'aqua' : ''}
                                        onMouseEnter={highLightRate(i)}
                                        onMouseLeave={highLightRate(-1)}
                                        onClick={onClick(i)}
                                />
                            })
                        }
                    </div>
                </div>
            ) : null}
        </React.Fragment>
    );
}


export default MovieDetails