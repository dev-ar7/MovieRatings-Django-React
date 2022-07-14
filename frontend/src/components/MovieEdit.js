import React, { useState, useEffect } from "react";
import 'semantic-ui-css/semantic.min.css';
import { Button, Form } from 'semantic-ui-react';
import API from "../api-service";
import { useCookies } from 'react-cookie';


function MovieEdit(props) {

    const [ title, setTitle ] = useState('');
    const [ description, setDescription ] = useState('');
    const [token] = useCookies(['Mr-Cookie']);

    useEffect( () => {
        setTitle(props.movie.title);
        setDescription(props.movie.description);
    }, [props.movie])

    const updateMovie = () => {
        API.updateMovie(props.movie.id, {title, description}, token['Mr-Cookie'])
            .then( response => props.updatedMovie(response))
            .catch( error => console.log(error))
    }

    const createMovie = () => {
        API.createMovie({title, description}, token['Mr-Cookie'])
            .then( response => props.createdMovie(response))
            .catch( error => console.log(error))
    }

    return (
        <React.Fragment>
            { props.movie ? (
                <div>
                    { props.movie.id ? 
                        <h2>Edit { props.movie.title }</h2> :
                        <h2>Create</h2>
                    }
                    <Form>
                        <Form.Field>
                        <label htmlFor="title" style={{color: 'white'}}>Title</label>
                        <input id="title" type='text' placeholder="title" 
                                value={title}
                                onChange={ event => setTitle(event.target.value)} 
                        />
                        </Form.Field>
                        <Form.Field>
                        <label htmlFor='description' style={{color: 'white'}}>Description</label>
                        <textarea id="description" type='text' placeholder="Description"
                                value={description}
                                onChange={ event => setDescription(event.target.value)}
                        />
                        </Form.Field>
                        { props.movie.id ? 
                            <Button color='green' onClick={ updateMovie }>Update</Button>
                            :
                            <Button color='green' onClick={ createMovie }>Create</Button>
                        }
                    </Form>
                </div>
            ) : null }
        </React.Fragment>
    );
}


export default MovieEdit;