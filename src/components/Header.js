import PropTypes from 'prop-types'
import Button from './button'
import { useLocation } from 'react-router-dom';


const Header = ({ title,showForm,showAddTask }) => {
    const location = useLocation()
    
    return (
		<header className="header">
			<h1>{title}</h1>
			{location.pathname ==='/' && <Button
				color={`${showAddTask ? "red" : "green"}`}
				text={`${showAddTask ? "close" : "Add"}`}
				onClick={showForm}
			/>}
		</header>
	);
}

Header.defaultProps = {
    title:'Task Tracker',
}

Header.propTypes = {
    title:PropTypes.string.isRequired
}
export default Header

