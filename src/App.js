import React from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import 'tachyons';
import ImageLink from './Components/ImageLink/ImageLink';
import Rank from './Components/Rank/Rank';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Signin from './Components/SigninForm/SigninForm';
import Register from './Components/Register/Register';

const app= new Clarifai.App({
  apiKey: '009e22c952fb49938d5da53d162d5855'
});

class App extends React.Component {

  constructor(){
    super();
    this.state={
      input:'',
      imageUrl: '',
      box: {},
      route: 'signin',
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }


    }
  }

  loadUser=(data)=>{
    this.setState({user:{
      id: data.id,
      name: data.name,
      email: data.name,
      entries: data.entries,
      joined: data.joined
    }})
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace= data.outputs[0].data.regions.[0].region_info.bounding_box
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange=(event)=>{
    this.setState({input: event.target.value});
  }

onButtonSubmit = () =>{
  this.setState({imageUrl: this.state.input});

  app.models.predict(
      Clarifai.FACE_DETECT_MODEL, 
      this.state.input)
    .then(response=> {
      
      if(response){
        fetch('https://radiant-dusk-37624.herokuapp.com/image',{
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id 
          })
        })
        .then(response=>response.json()).then(count=>{
          this.setState(Object.assign(this.state.user, {entries: count}))
        })
      }

      this.displayFaceBox(this.calculateFaceLocation(response))})
    .catch(err=>console.log(err));
}
    
onRouteChange=(route)=>{
  this.setState({route: route})
}


  render(){
  return (
    <div className="App">


      <Particles 
              params={{
                particles: {
                 number:{
                  value: 30,
                  density: {
                    enable: true,
                    value_area: 300
                  }
                 }
                }
              }}
            className='particles'/>    
      <Navigation onRouteChange={this.onRouteChange}/>
      
    {this.state.route==='home'? 
      <div>  
        
        <Logo />
        <Rank name={this.state.user.name} count={this.state.user.entries}/>
        <ImageLink onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
        <FaceRecognition box={this.state.box}imageUrl={this.state.imageUrl} />
      </div>
      : (this.state.route==='signin'?<Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} /> : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>)
    }
    </div>
  );
}
}

export default App;
