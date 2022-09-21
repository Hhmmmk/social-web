import logo from '../../assets/social-web-logo.png';

import './header.styles.css';

const Header = () => {
  return (
    <div className='header-container'>
      <div>
        <img className='logo' src={logo} alt='Social Connections Viewer Logo' />
      </div>
      <div>
        <h1>Social Connections Viewer</h1>
      </div>
    </div>
  );
};

export default Header;
