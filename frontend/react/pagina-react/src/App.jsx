import './App.css'
import Header from './components/Header.jsx'
import Accordion from './components/Accordion.jsx'
import Footer from './components/Footer.jsx'

function App() {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <Accordion />
      </main>
      <Footer />
    </div>
  )
}

export default App
