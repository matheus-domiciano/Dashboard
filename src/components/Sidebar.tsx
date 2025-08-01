import styles from './styles/Sidebar'
import { Link } from 'react-router-dom'
import { Color } from '../themes/Themes'
import { Speedometer, ArrowLeft, CoinIcon, InspectionIcon, CalendarIcon } from '../icons'
import { useState } from 'react'

const Sidebar = () => { 

    const [ activePage, setActivePage  ] = useState('home')

    return (
        <aside style={styles.aside}>
                  
            <nav  style={{ color: Color.gunMetal }}>

                <div style={styles.brandContainer}>
                    <img src="./src/assets/teclight-logo-256.png" width={'75px'} alt="" /> 
                    <h2 style={styles.brandText}>
                        Inter
                    </h2>
                </div>

                <hr style={{border: '1px solid #223b53'}}/>

                <div style={styles.categoryContainer}>
                    <h4 style={styles.categoryTitle}>
                        GERAL
                    </h4>
                </div>

                <ul style={{padding: 0}}>
                    <Link to='/'>
                        <li>
                            <button
                                onClick={()=>setActivePage('home')} 
                                style={{
                                    ...styles.buttons,
                                    ...(activePage == 'home' ? styles.activeAsideBtn : {})
                                }}
                                className='sidebar-btn'>

                                <span style={styles.itemButtonContainer}>
                                    <Speedometer style={styles.icons} />

                                    <p style={{
                                        ...(activePage == 'home' ? styles.activeTextButton : styles.disabledTextButton)
                                    }}> Dashboard </p>
                                </span>

                            </button>
                        </li>
                    </Link>

                    <Link to='/clientes'>

                        <li>
                            <button
                                onClick={()=>setActivePage('clientes')} 
                                style={{
                                    ...styles.buttons,
                                    ...(activePage == 'clientes' ? styles.activeAsideBtn : {})
                                }} 
                                className='sidebar-btn'>

                                <span style={styles.itemButtonContainer}>
                                    <Speedometer style={styles.icons} />

                                    <p style={{
                                        ...(activePage == 'clientes' ? styles.activeTextButton : styles.disabledTextButton)
                                    }}> Painel </p>
                                </span>

                            </button>
                        </li>

                    </Link>
                    
                </ul>


                <div style={styles.categoryContainer}>
                    <h4 style={styles.categoryTitle}>
                        SERVIÇOS
                    </h4>
                </div>

                <ul style={{padding: 0}}>
                    <Link to='/inspecoes'>
                        <li>
                            <button
                                onClick={()=>setActivePage('inspecoes')} 
                                style={{
                                    ...styles.buttons,
                                    ...(activePage == 'inspecoes' ? styles.activeAsideBtn : {})
                                }}
                                className='sidebar-btn'>

                                <span style={styles.itemButtonContainer}>
                                    <InspectionIcon style={styles.icons} />

                                    <p style={{
                                        ...(activePage == 'inspecoes' ? styles.activeTextButton : styles.disabledTextButton)
                                    }}> Inspeções </p>
                                </span>

                            </button>
                        </li>
                    </Link>

                    <Link to='/agendamentos'>

                        <li>
                            <button
                                onClick={()=>setActivePage('agendamentos')} 
                                style={{
                                    ...styles.buttons,
                                    ...(activePage == 'agendamentos' ? styles.activeAsideBtn : {})
                                }} 
                                className='sidebar-btn'>

                                <span style={styles.itemButtonContainer}>
                                    <CalendarIcon style={styles.icons} />

                                    <p style={{
                                        ...(activePage == 'agendamentos' ? styles.activeTextButton : styles.disabledTextButton)
                                    }}> Agenda </p>
                                </span>

                            </button>
                        </li>

                    </Link>
                    
                </ul>

                <div style={styles.categoryContainer}>
                    <h4 style={styles.categoryTitle}>
                        FINANCEIRO
                    </h4>
                </div>

                <ul style={{padding: 0}}>
                    
                        <li>
                            <button
                                onClick={()=>setActivePage('contas')} 
                                style={{
                                    ...styles.buttons,
                                    ...(activePage == 'contas' ? styles.activeAsideBtn : {})
                                }}
                                className='sidebar-btn'>
                                <span style={styles.itemButtonContainer}>
                                    <CoinIcon style={styles.icons} width={26} height={26} />

                                    <p style={{
                                        ...(activePage == 'contas' ? styles.activeTextButton : styles.disabledTextButton)
                                    }}> Contas </p>
                                </span>

                                <ArrowLeft style={{ 
                                    ...styles.subGroupButtonArrow,
                                    ...(activePage == 'contas' ? styles.subGroupButtonArrowActive : {})
                                    }}/>

                            </button>

                            <ul className="subButtonAside" style={{
                                    ...(activePage == 'contas' ? styles.activeSubGroupItems : {})
                                }}>
                                <Link to='/contas-a-pagar'>
                                    <li>
                                       <span className='test'>
                                            <p>A Pagar</p>
                                        </span>
                                    </li>
                                </Link>
                                <Link to='/contas-a-receber'>
                                    <li>
                                        <span className='test'>
                                            <p>A Receber</p>
                                        </span>
                                        
                                    </li>
                                </Link>
                            </ul>

                        </li>
                  

                          <li>
                            <button
                                onClick={()=>setActivePage('teste')} 
                                style={{
                                    ...styles.buttons,
                                    ...(activePage == 'teste' ? styles.activeAsideBtn : {})
                                }} 
                                className='sidebar-btn'>

                                <span style={styles.itemButtonContainer}>
                                    <Speedometer style={styles.icons} />

                                    <p style={{
                                        ...(activePage == 'teste' ? styles.activeTextButton : styles.disabledTextButton)
                                    }}> Painel </p>
                                </span>

                            </button>
                        </li>
                    
                </ul>




            </nav>
        </aside>
    )
}


export default Sidebar