import { useState } from 'react'
import LoadingScreen from './components/LoadingScreen'
import ScrollProgress from './components/ScrollProgress'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Portfolio from './components/Portfolio'
import Services from './components/Services'
import Tools from './components/Tools'
import Experience from './components/Experience'
import WhyWorkWithMe from './components/WhyWorkWithMe'
// import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      {!isLoading && (
        <div className="relative bg-base text-ink antialiased">
          {/* Fixed UI chrome */}
          <ScrollProgress />
          <Navbar />

          {/* Page sections */}
          <main>
            <Hero />
            <About />
            <Portfolio />
            <Services />
            <Tools />
            <Experience />
            <WhyWorkWithMe />
            {/* <Testimonials /> */}
            <Contact />
          </main>

          <Footer />

          {/* Subtle global noise overlay for cinematic texture */}
          <div className="noise-overlay bg-grain" aria-hidden="true" />
        </div>
      )}
    </>
  )
}
