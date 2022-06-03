import React from 'react'
import { Bottom } from '../../components/bottom'
import Carousel from 'react-bootstrap/Carousel'



export default function Index (){
   

return(<>
<div className='container'>
    <div className='row'style={{marginTop:"70px", marginBottom:"70px"}}>
        <div className='col-md-2'>
        </div>
        <div className='col-md-8' style={{textAlign: 'center'}}>
                <Carousel fade>
                    <Carousel.Item>
                        <img 
                        style={{height:"500px"}}
                        className="d-block w-100"
                        src="https://localhost/f1project/haland.jpg"
                        alt="First slide"
                        />
                        <Carousel.Caption>
                        <h3>Haland joins Manchester City !</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        style={{height:"500px"}}
                        className="d-block w-100"
                        src="https://localhost/f1project/mbappe.jpg"
                        alt="Second slide"
                        />

                        <Carousel.Caption>
                        <h3>Mbappe joins Real Madrid !</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        style={{height:"500px"}}
                        className="d-block w-100"
                        src="https://localhost/f1project/oly.jpg"
                        alt="Third slide"
                        />

                        <Carousel.Caption>
                        <h3>Olympiakos Final-4 Bound</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    </Carousel>
        </div>
        <div className='col-md-2'>
        </div>
    </div>
</div>
<Bottom/>
</>)
}