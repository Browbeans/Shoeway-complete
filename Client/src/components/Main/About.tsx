import { CSSProperties } from '@material-ui/styles';
import '../../style/About.css';

const About = () => {
    return (
      <div>
        <h1 style={title}>About</h1>
        <div className="container">
          <p className="paragraf">
           Petter Hampus and Oliver are the people behind this site. Pics from Shelta.se
          </p>
          <ul className="iconList">
            <li className="icon">
              <i className="fab fa-facebook-square"></i>
            </li>
            <li className="icon">
              <i className="fab fa-instagram-square"></i>
            </li>
            <li className="icon">
              <i className="fab fa-twitter-square"></i>
            </li>
          </ul>
        </div>
      </div>
    );
}

const title: CSSProperties = {
  textAlign: 'center',
  margin: '1rem 1rem 4rem',
}

export default About