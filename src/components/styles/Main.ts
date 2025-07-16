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
    }
} as const);

export default styles;