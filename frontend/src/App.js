import './App.css';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div>
      <div>
        <Link to="/mypage">앱</Link>
      </div>
      <div>
        <Link to="/petpage">반려동물정보</Link>
      </div>
    </div>
  );
}

export default App;
