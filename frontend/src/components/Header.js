import { useNavigate } from "react-router-dom"

const Header = () => {
  const navigate = useNavigate()

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand"  onClick={() => navigate('/')} >
        <img src={`${process.env.PUBLIC_URL}/logo_docker.png`} width="30" height="30" alt="" />
      </a>
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <a className="nav-link" onClick={() => navigate('/')}>Dashboard</a>
          </li>
          <li className="nav-item active">
            <a className="nav-link" onClick={() => navigate('/containers')}>Containers</a>
          </li>
          <li className="nav-item active">
            <a className="nav-link" onClick={() => navigate('/images')}>Images</a>
          </li>
          <li className="nav-item active">
            <a className="nav-link" onClick={() => navigate('/volumes')}>Volumes</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header