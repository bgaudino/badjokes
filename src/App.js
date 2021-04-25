import {useState} from 'react';
import {Joke} from './components/Joke'
import './App.css';

function App() {

  const [setup, setSetup] = useState('Would you like to hear a joke?')
  const [delivery, setDelivery] = useState('')
  const [image, setImage] = useState('https://i.kym-cdn.com/entries/icons/facebook/000/008/356/moray.jpg')

  function think() {
    getThinker();
    setSetup('hmm, let me think...');
    setDelivery('');
    setTimeout(getJoke, 1500);
  }

  function getThinker() {
    fetch('https://api.giphy.com/v1/gifs/random?api_key=LjrF19d7yvgQ9rhQbdpgurG52Nj29wF0&tag=thinking&rating=g')
    .then(response => response.json())
    .then(response => setImage(response.data.fixed_height_downsampled_url))
  }

  function getReaction() {
    fetch('https://api.giphy.com/v1/gifs/random?api_key=LjrF19d7yvgQ9rhQbdpgurG52Nj29wF0&tag=haha&rating=g')
    .then(response => response.json())
    .then(response => setImage(response.data.fixed_height_downsampled_url))
  }

  function getJoke() {
    fetch('https://v2.jokeapi.dev/joke/Miscellaneous,Dark,Pun,Spooky')
    .then(response => response.json())
    .then(data => {
      if (!data.safe) {
        getJoke();
      } else if (data.joke) {
        setSetup(data.joke);
        setDelivery('');
        getReaction();
      } else {
        setSetup(data.setup);
        setDelivery(data.delivery);
        getReaction();
      }
    })
    .catch(error => {
      console.log(error);
      setImage('https://i.kym-cdn.com/entries/icons/facebook/000/008/356/moray.jpg')
      setSetup(error);
      setDelivery('sorry');
    });
  }

  return (
    <div className="App">
      <h1>Bad Joke Generator</h1>
      <img src={image} alt="Joke reaction"/>
      <Joke setup={setup} delivery={delivery} />
      <button className="btn" onClick={think}>Tell me a joke</button>
      <img id="giphy" alt="Powered by Giphy" src={process.env.PUBLIC_URL + '/giphy.gif'} /> 
    </div>
  );
}

export default App;
