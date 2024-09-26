
import React, { useEffect, useState } from "react";
import '../src/assets/tailwind.css'
import './main.css'
import Imagecard from "./Components/Imagecard";
import ImageSearchop from "./Components/ImageSearchop";




function App() {
  const [images, setImage] = useState([])
  const [isLoading ,setLoading] = useState(true)
  const [term ,setTerm] = useState('')

  useEffect(()=>{
    fetch(`https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${term}&image_type=photo&pretty=true`)
    .then(res => res.json())
    .then(data => {
                   setImage(data.hits);
                   setLoading(false)
                  })
    .catch(err=> console.log(err))
  },[term])

  return (
      <div className="container mx-auto">
          <ImageSearchop searchText ={(text)=>setTerm(text)}/>
          {isLoading ? <h1 className='text-6xl text-center mx-auto mt-32'>Loading...</h1>:<div className="grid grid-cols-3 gap-4">
          {images.map((image) =>(
            <Imagecard 
            key={image.id} 
            image={image}/>
          ))}
        </div>
          }
      </div>
  );
}

export default App;
