import { NavLink } from 'react-router-dom';

function BurgerMenu(props) {

  const {isOpen, onLogOut} = props;
  
  return (
    <div className={`burger-menu  ${isOpen ? "burger-menu_open" : ""}`}>
        <h2 className="burger-menu__email">email@email.com</h2>
        <NavLink to="/signin" className="burger-menu__logout" onClick={onLogOut}>Выйти</NavLink>
    </div>
  );
  
}

export default BurgerMenu;
