import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Navigation from './components/Navigation';
import Todo from './components/Todo';
import Quiz from './components/Quiz';
import Stepper from './components/Stepper';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-[#aa0000] via-[#222222] to-[#0000aa]">
          <Navigation />
          <Routes>
            <Route path="/" element={<Todo />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/stepper" element={<Stepper />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
