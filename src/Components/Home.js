import React from 'react'
import { Carousel } from 'react-bootstrap'
import ExampleCarouselImage from './ExampleCarouselImage'


const Home = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <ExampleCarouselImage text="Slide 1" src="https://media.istockphoto.com/id/519559505/photo/microscope.jpg?s=612x612&w=0&k=20&c=rAsZn6AYnxz7Zy1XASPTjY5jqRFZ8mj9k5fylazvnP8="/>
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
       <ExampleCarouselImage text={"Second Slide"} src={"https://media.istockphoto.com/id/1214742986/photo/medical-laboratory-scientist-hands-using-microscope-for-chemistry.jpg?s=612x612&w=0&k=20&c=LcFuf1Ri0rNdbKhsnSB7SXwx4F1w2dpMhrFanSuEavc="}/>
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <ExampleCarouselImage text={"Second Slide"} src="https://media.istockphoto.com/id/1185801207/photo/hand-holding-histopathology-slides-stained-with-leishman-stain-displayed-and-ready-for.jpg?s=612x612&w=0&k=20&c=jLFU_ntSukFOjrNZuybgiHmT5KW_Yvvg-CqyZpTJSW8="/>
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  )
}

export default Home