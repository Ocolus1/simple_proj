import React from 'react'
import { Carousel } from 'react-bootstrap'
import one from "../img/one.jpg"
import two from "../img/two.jpg"
import three from "../img/three.jpg"
import four from "../img/four.jpg"

export default function Slide() {
    return (
        <div>
            <Carousel>
                <Carousel.Item interval={1000}>
                    <img
                    className="d-block w-100"
                    height="500px"
                    src={one}
                    alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item interval={500}>
                    <img
                    className="d-block w-100"
                    height="500px"
                    src={two}
                    alt="Third slide"
                    />
                </Carousel.Item>
                <Carousel.Item interval={500}>
                    <img
                    className="d-block w-100"
                    height="500px"
                    src={three}
                    alt="Third slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    height="500px"
                    src={four}
                    alt="Third slide"
                    />
                </Carousel.Item>
            </Carousel>
        </div>
    )
}
