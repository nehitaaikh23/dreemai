import React from 'react'
import Navbar from '../Components/Navbar'
import Hero from '../Components/Hero'
import AITools from '../Components/AITools'
import Testimonials from '../Components/Testimonials'
import Plans from '../Components/Plans'
import Footer from '../Components/Footer'

const Home = () => {
  return (
    <div>
        <Navbar />
        <Hero />
        <AITools />
        <Testimonials />
        <Plans />
        <Footer />
    </div>
  )
}

export default Home