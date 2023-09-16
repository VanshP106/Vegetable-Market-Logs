import React, { useState } from 'react'; 
import "./Home.css";
function Home() {
  const [currentSlide, setCurrentSlide] = useState(0); // Add state for current slide index

  const images = ["1.png", "2.png", "3.png", "4.png"]; // Add image names
  const image = ["11.png", "12.png", "13.png"];
  const nextSlides = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % image.length);
  };
  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
  };
  
  return (
      <div>
        <div className="slider-container">
        <div className="slider">
        <a href="/shop">
            <img src={images[currentSlide]} alt={`Slide ${currentSlide + 1}`} />
          </a>
        </div>
        <button className="slider-button" onClick={nextSlide}>Next Slide</button>
      </div>
        <div className="video-container">
          <video autoPlay muted loop className="video">
            <source src="video.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="content-container">
        <div className="content">
          <div className="content-left">
            <img src="vegetable.png" alt="Vegetable" />
          </div>
          <div className="content-right">
            <h2>Vegetables</h2>
            <p>FreshVeggies offers a wide range of premium quality vegetables...
            Our food we intake daily is the source of all essentials namely vitamins, minerals, fibers and phytochemicals. All food we have nowadays does not do well to our body. Since time being, vegetables are said to be the source of nutrients and immunity. One who takes right amount of fruits and vegetables is immune to diseases. Vegetables form a healthy diet which keeps our stomach full for a longer time. As a result, one doesn’t gain weight even if he overeats vegetables every day. Vegetables that are healthy and easy to be added in daily food are tomatoes, garlic, broccoli, carrot, spinach and so on.
            </p>
            <a href="/shop" className="shop-button">
              Shop Now
            </a>
          </div>
        </div>
        </div>
        <div className="content-container">
        <div className="content">
          <div className="content-left">
            <img src="fruits.png" alt="Fruit" />
          </div>
          <div className="content-right">
            <h2>Fruits</h2>
            <p>FreshFruits offers a wide range of premium quality fruits...
            Fruits are nature's gift to mankind. These are not only delicious and refreshing but are also the chief source of vitamins, minerals and proteins. These constituents are essential for the normal physiological well being and help in maintaining healthy state through development of resistance against pathogens.
            </p>
            <a href="/shop" className="shop-button">
              Shop Now
            </a>
          </div>
        </div>
        </div>
        <div className="content-container">
        <div className="content">
          <div className="content-left">
            <img src="seasoning.png" alt="Seasoning" />
          </div>
          <div className="content-right">
            <h2>Seasoning</h2>
            <p>FreshSeasoning offers a wide range of premium quality seasonings...
            Herbs and Spices are the most important part in Indian cooking. No food can be imagined without herbs and spices. Herbs are fresh small plants and spices are derived from the dried leaves, plants and flowers. We are going to show how to identify herbs and species and how to select and store them. This is very important matter for Indian cuisine. First let us talk you about the difference between herbs and species.
            </p>
            <a href="/shop" className="shop-button">
              Shop Now
            </a>
          </div>
        </div>
      </div>
      <div className="slider">
            <img src={image[currentSlide]} alt={`Slide ${currentSlide + 1}`} />
            <button className="slider-button" onClick={nextSlides}>Next Slide</button>
      </div>
      </div>
  );
}

export default Home;
