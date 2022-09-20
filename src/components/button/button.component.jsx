import './button.styles.css';

const Button = ({ children, buttonType, ...otherProps }) => {
  return (
    <div>
      <button className='button-container'>{children}</button>
    </div>
  );
};

export default Button;
