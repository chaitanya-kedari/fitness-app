import Navbar from "./Navbar";
import Home from "./Home";
import image from "./img/wave2.png";

function App() {
  return (
    <div style={{
      backgroundImage: `url(${image})`, 
      backgroundRepeat:"repeat", 
      backgroundSize:"auto" 
      }} 
      className="App">
      <Navbar />
      <div className="content">
        <h1 style={{color: 'white'}}>Welcome to Fitness app!</h1>
        <Home />
      </div>
    </div>
  );
}

export default App;
