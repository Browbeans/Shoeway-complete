import { useState } from 'react';
import HandleRegister from '../UserProfile/handleRegister';
import HandleLogin from '../UserProfile/handleLogin';
import '../../style/Entry.css'

function UserSelection() {
    const [toggle, setToggle] = useState(true);

    const handleToggle = () => {
        setToggle(!toggle)
    }

    return(
        <div className="entry-container">
            <div>
                {toggle
                ?
                <HandleLogin/>
                :
                <HandleRegister/>
                }
                <div className="break">
                    <div></div>
                    <p>Or</p>
                    <div></div>
                </div>
                <div className="option-container">
                    <p>
                        {toggle 
                        ?
                        "Do not have an account?"
                        :
                        "Already have an account?"
                        }
                    </p>
                    <span
                        onClick={handleToggle}
                    >
                        {toggle ? "Register" : "Login"}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default UserSelection;