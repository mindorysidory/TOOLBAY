import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { store } from './store';
import HomePage from './components/home/home-page';
import MainLayout from './components/layout/main-layout';
import Terms from './pages/terms';
import Feedback from './pages/feedback';
import Contact from './pages/contact';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tools" element={<MainLayout />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  )
}

export default App
