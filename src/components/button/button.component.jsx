import './button.styles.css';

const Button = ({ onClickHandler, children, buttonType, ...otherProps }) => {
  return (
    <div>
      <button onClick={onClickHandler} className='button-container'>
        {children}
      </button>
    </div>
  );
};

export default Button;
