import './Header.css'

function Header({ children }) {


    return (
        <img className='logo' src='/logo.svg' alt='Логотип журнала'/>
    );
}

export default Header
