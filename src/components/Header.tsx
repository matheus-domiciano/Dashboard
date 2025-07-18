import styles from './styles/Header'
import { Color } from '../themes/Themes';
import { ArrowLeft } from '../icons';

const Header = () => {

    return (
        <header>
            <ArrowLeft width={16} height={68} fill='#cbcbcb'/>
            <div style={styles.tools}>
                <p style={{color: Color.gunMetal}}>Cleyton</p>
                <div style={styles.profile}>
                    <img src="../src/assets/icons/user.png" style={styles.profileImage} alt="User Icon" />
                </div>
            </div>
        </header>
    );

}


export default Header;