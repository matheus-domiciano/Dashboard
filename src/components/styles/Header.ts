import Style from '../../util/Style'

const styles = Style({
    main: {        
        width: 'calc(100% - 261px)',
        top: 0,
        right: 0,
        display: 'flex',
        padding: '0 0 0 10px',
        position: 'fixed',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgb(247, 247, 247)',
        height: '50px'
    },
    tools: {
        width: '130px',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-around'      
        
    },
    profile: {
        width: '35px',
        height: '35px',
        borderRadius: '50%',
        background: '#5d89c1'
    },
    profileImage: {
        width: '35px',
        height: '35px'
    }
} as const);







export default styles;