import Style from '../../util/Style'
import { Color } from '../../themes/Themes';

const styles = Style({
  aside: {
    height: '100vh',
    width: '250px',
    top: 0,
    left: 0,
    position: 'fixed',
    borderRight: '1px solid rgb(223, 226, 230)',
    backgroundColor: 'rgb(26 44 61)',
    transition: 'all 0.4s ease',
    WebkitTouchCallout: 'none',
    WebkitUserSelect: 'none',
    MozUserSelect: 'none',
    msUserSelect: 'none',
    userSelect: 'none',
  },
  brandContainer: {
    margin: '25px 20px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  brandText: {
    fontSize: '30px',
    color: 'white',
    margin: '0 14px'
  },
  categoryContainer: {
    display: 'flex',
    margin: '24px 0 0 24px'
  },
  categoryTitle: {
    color:  'rgb(132 167 187)',
    fontWeight: 600,
    fontFamily: '\'Montserrat\', sans-serif',
    fontSize: '14px',
    margin: 0
  },
  buttons: {
    display: 'flex',
    width: '92%',
    borderRadius: '7px',
    height: '47px',
    color: 'rgb(46, 49, 51)',
    margin: '5px 10px',
    padding: '0px 14px 0px 14px',
    cursor: 'pointer',
    alignContent: 'center',
    justifyContent: 'space-between'
  },
  itemButtonContainer: {
    fontSize: '15px',
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 400,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  subGroupButtonArrow: {
    width: '7px',
    fill: '#fff',
  },
  subGroupButtonArrowActive: {
    transform: 'rotate(-90deg)'
  },
  activeSubGroupItems: {
    height: '70px',
  },
  activeAsideBtn: {
    backgroundColor: 'rgb(62 121 177)'
  },
  icons: {
    width: '25px',
    height: '25px',
    margin: '0 14px 0 0',
    // fill: 'rgb(46, 49, 51)',
    fill: '#fff',
  }, 
  activeTextButton: {
    color: '#fff'
  },
  disabledTextButton: {
    color: '#fff'
  }
} as const);

export default styles;