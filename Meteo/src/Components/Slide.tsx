
import Carousel from 'react-bootstrap/Carousel'


/**
 * Returns a carousel automatically alterning between 3 images with a 2 sec. delay.
 */



function Slide() {
    return (

        <Carousel>
            <Carousel.Item interval={2000}>
                <img
                    src="https://images.pexels.com/photos/974212/pexels-photo-974212.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    className="d-block w-100"
                    alt="First Slide"
                />
                <Carousel.Caption>
                    <h3>Hawaii</h3>
                    <p>📍</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={2000}>
                <img
                    src="https://images.pexels.com/photos/1571746/pexels-photo-1571746.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    className="d-block w-100"
                    alt="Second Slide"
                />
                <Carousel.Caption>
                    <h3>Japan</h3>
                    <p>📍</p>
                </Carousel.Caption>

            </Carousel.Item>
            <Carousel.Item interval={2000}>
                <img
                    src="https://images.pexels.com/photos/302271/pexels-photo-302271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    className="d-block w-100"
                    alt="Third Slide"
                />
                <Carousel.Caption>
                    <h3>Alaska</h3>
                    <p>📍</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel >

    )
}

export default Slide