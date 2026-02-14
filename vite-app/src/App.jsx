import React from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Story from './components/Story';
import Gallery from './components/Gallery';
import PhotoSection from './components/PhotoSection';
import Message from './components/Message';
import ClickableSurprise from './components/ClickableSurprise';
import LoveGame from './components/LoveGame';
import SecretReveal from './components/SecretReveal';
import './App.css';

function App() {
  return (
    <>
      <Navigation />
      <Hero />
      <Story />
      <Gallery />
      <PhotoSection />
      <Message />
      <ClickableSurprise />
      <LoveGame />
      <SecretReveal />
    </>
  );
}

export default App;
