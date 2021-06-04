import { CSSProperties } from '@material-ui/styles'
import { Link } from 'react-router-dom'
import { useContext } from 'react';
import { LoginContext } from '../../../contexts/User/loginContext'
import AddItem from './AddItem'
import AdminHandler from './AdminHandler'
import '../../../style/UserProfile.css'

const AdminPage = () => {
    const { isLoggedIn } = useContext(LoginContext)

    return (
        <div className="profile-container">
            {isLoggedIn
            ?
            <div>
                <h1 style={title}>Admin</h1>
               <AdminHandler/> 
               <AddItem/> 
            </div>
            :
            // USER IS LOGGED OUT
            <div className="out-logged-container">
                <p>To review your profile, you have to</p>
                <Link to="/entry" style={{ textDecoration: "none" }}>
                    <span>&nbsp;log in</span>
                </Link>
            </div>
            }
        </div>
    )
}

const title: CSSProperties = {
    textAlign: 'center',
    margin: '1rem 1rem',
}

export default AdminPage