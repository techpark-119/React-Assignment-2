import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Navigation from './components/Navigation';
import Todo from './components/Todo';
import Quiz from './components/Quiz';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-[#ff0000] via-[#e9e4d0] to-[#0000ff]">
          <Navigation />
          <Routes>
            <Route path="/" element={<Todo />} />
            <Route path="/quiz" element={<Quiz />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
