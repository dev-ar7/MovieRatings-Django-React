import React, { useState, useEffect } from "react";
import { Header } from 'semantic-ui-react';
import { Button, Form, Icon, Label } from 'semantic-ui-react';
import API from "../api-service";
// import { TokenContext } from "../Router";
import './Auth.css';
import { useCookies } from 'react-cookie';


function Authentication() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // const {token, setToken} = useContext(TokenContext);
    const [token, setToken] = useCookies(['Mr-Cookie']);
    const [isLogin, setIsLogin] = useState(true);

    useEffect( () => {
        if(token['Mr-Cookie']) {
            window.location.href = '/movies';
        }
    }, [token])

    const onClickLogIn = () => {
        API.userLogIn({username, password})
            .then(response => setToken('Mr-Cookie', response.token))
            .catch( error => console.log(error))
    }

    const onClickRegister = () => {
        API.userRegister({username, password})
            .then(() => onClickLogIn())
            .catch( error => console.log(error))
    }

    return (
        <div className="Auth">
                { isLogin ? 
                    <Header className="Auth-header" as='h2' icon='sign-in' content='LogIn' />
                    : 
                    <Header className="Auth-header" as='h2' icon='signup' content='Register' />
                }
            <Form>
                <Form.Field>
                <label htmlFor="username" style={{color: 'white'}}>Username</label>
                <input className="inputFields" id="username" type='text' placeholder="Username" 
                        value={username}
                        onChange={ event => setUsername(event.target.value)} 
                />
                </Form.Field>
                <Form.Field>
                <label htmlFor='password' style={{color: 'white'}}>Password</label>
                <input className="inputFields" id="password" type='password' placeholder="Password"
                        value={password}
                        onChange={ event => setPassword(event.target.value)}
                />
                </Form.Field>
                { isLogin ? 
                    <Button color='blue' onClick={ onClickLogIn }>LogIn</Button>
                    :
                    <Button color='green' onClick={ onClickRegister }>Register</Button>
                }
            </Form>
            { isLogin ?
                <Button className="btn" as='div' labelPosition='right'>
                    <Button basic onClick={ () => setIsLogin(false) } color='green'>
                        <Icon name='heart' />
                        Register
                    </Button>
                    <Label as='a' basic color='red' pointing='left'>
                        Don't Have An Account? 
                    </Label>
                </Button>
                :
                <Button className="btn" as='div' labelPosition='right'>
                    <Button basic onClick={ () => setIsLogin(true) } color='blue'>
                        <Icon name='heart' />
                        LogIn
                    </Button>
                    <Label as='a' basic color='red' pointing='left'>
                        Already Have An Account? 
                    </Label>
                </Button>
            }
        </div>
    );
}


export default Authentication;