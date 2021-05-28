import React, { useContext, useEffect, useState } from 'react';
import { LoginContext } from "../../contexts/User/loginContext";
import '../../style/UserProfile.css';
import CreateIcon from '@material-ui/icons/Create';
import ClearIcon from '@material-ui/icons/Clear';
import { CSSProperties } from '@material-ui/styles';
import { UpdateContext } from '../../contexts/User/updateContext';
import UpdateUserForm from './updateUserForm';

function UserDetails() {
    const [toggleEdit, setToggleEdit] = useState(false);
    const { currentUser } = useContext(LoginContext);
    const { name, city, street, zip, phone, email, setUserState } = useContext(UpdateContext);

    useEffect(() => {
        setUserState(currentUser)
    }, [currentUser, setUserState]);

    return(
        <div>
            <h2 className="user-title">Your Profile</h2>
            <div className="user-details-container">
                {!toggleEdit
                ?
                <div>
                    <div className="icon-holder">
                        <p>Your details</p>
                        <CreateIcon 
                            onClick={() => setToggleEdit(true)}
                            style={editIcon} 
                        />
                    </div>
                    <hr />
                    <div className="details-holder" style={{ margin: "2rem 0rem" }}>
                        <p>Name: {name}</p>
                        <p>City: {city}</p>
                        <p>Street: {street}</p>
                        <p>Zip: {zip}</p>
                        <p>Phone: {phone}</p>
                        <p>Email: {email}</p>
                    </div>
                </div>
                :
                <div>
                    <div className="icon-holder">
                        <p>Edit details</p>
                        <ClearIcon 
                            onClick={() => setToggleEdit(false)}
                            style={editIcon} 
                        />
                    </div>
                    <hr />
                    <div className="details-holder" style={{ margin: "2rem 0rem" }}>
                        <UpdateUserForm/> 
                    </div>
                </div>
                }
            </div>
        </div>
    );
}

const editIcon: CSSProperties = {
    color: "grey",
    cursor: "pointer",
}

export default UserDetails;