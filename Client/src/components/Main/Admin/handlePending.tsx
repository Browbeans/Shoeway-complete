import axios from 'axios';
import react, { useContext, useState } from 'react';
import { LoginContext } from '../../../contexts/User/loginContext';
import CheckIcon from '@material-ui/icons/Check';

interface Props {
    value: any
}

function HandlePending(value: Props) {
    const { fetchUsers } = useContext(LoginContext)
    const [role, setRole] = useState('');
    const [button, displayButton] = useState(false);
    const user = value.value;

    const handleChange = (e: any) => {
        setRole(e.target.value)
        if (e.target.value === 'admin' || e.target.value === 'customer') {
            displayButton(true);
        } else {
            displayButton(false);
        }
    }

    const handlePutRequest = async (userId: string) => {
        try {
            const request = await axios.put(`/users/handleRole/${userId}`, { role: role });
            console.log(request);
        } catch (error) {
            console.log(error)
        }
        fetchUsers();
    };

    return(
        <div>
            {user.role === 'pending' ? 
            <div style={{ display: "flex", alignItems: "center" }}>
                <select onChange={handleChange}>
                    <option value="pending">pending</option>
                    <option value="admin">admin</option>
                    <option value="customer">customer</option>
                </select>
            {button
            ?
            <CheckIcon 
                onClick={() => handlePutRequest(user._id)}
                style={{ color: "#56EAC6", cursor: "pointer" }}
                />
            :
            <></>
            }

            </div>
            : 
            <p>{user.role}</p>
            }
        </div>
    );
}

export default HandlePending;