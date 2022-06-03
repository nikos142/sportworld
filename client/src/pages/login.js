import React, { useEffect } from "react";
import {UserContext} from "../App"
import {useNavigate} from "react-router-dom"
import {Form , Button} from "react-bootstrap"

export default function Login (){
   
    const [user , setUser]= React.useContext(UserContext);
    const [email, setEmail]= React.useState('');
    const [password, setPassword]= React.useState('')
    const navigate = useNavigate()

    const handleSubmit = async e =>{
        e.preventDefault();
        const result =await (await fetch('http://localhost:3001/login' , {
            method:`Post`,
            credentials:'include',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                email,
                password
            })
        } ) ).json();
        
        if(result.accesstoken){
            setUser({
                accesstoken: result.accesstoken,
            });
            navigate("/football", { replace: true });
        }
        else
        {
            console.log(result.error)

        }

    }

    const handleChange =e =>{
        if(e.currentTarget.name ==="email")
        {
            setEmail(e.currentTarget.value)
        }
        else
        {
            setPassword(e.currentTarget.value)
        }
    }

    useEffect(() =>{
        console.log(user)
    },[user])

    return(
        <div style={{textAlign:"center"}}>
            <Form onSubmit={handleSubmit}>
                <Form.Group  className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={handleChange} name="email" value={email}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password" onChange={handleChange}  name="password" value={password}/>
                </Form.Group >
                   <Button type="submit">Submit</Button>
            </Form>
        </div>
    )
}