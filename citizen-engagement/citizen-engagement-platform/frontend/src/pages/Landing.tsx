import { Link } from 'react-router-dom';

const Landing = () => (
  <div style={{ textAlign: 'center', marginTop: '3rem' }}>
    <h2>Welcome to Citizen Engagement Platform</h2>
    <Link to="/login">
      <button style={{ margin: '1rem' }}>Login</button>
    </Link>
    <Link to="/signup">
      <button style={{ margin: '1rem' }}>Sign Up</button>
    </Link>
  </div>
);

export default Landing;