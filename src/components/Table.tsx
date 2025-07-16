import styles from './styles/Main'
import { PencilIcon, TrashIcon } from '../icons'
import ObjectQuery from '../util/ObjectQuery'
import TwoDatesCalculator from '../util/TwoDatesCalculator'
import DB from '../util/DB'
import SimpleDate from '../util/SimpleDate'
import { PrinterIcon, CSVIcon } from '../icons'

import ActionButton from './ActionButton'

const Main = () => {


    const tableMap = {
        progress: {
            started: { 
                glossary : 'Iniciado',
                color: 'blue'
            },
            inProgress: { 
                glossary : 'Em Andamento',
                color: 'blue'
            },
            finished: { 
                glossary : 'Finalizado',
                color: '#40af96'
            },
            cancelled: { 
                glossary : 'Cancelado',
                color: '#CF6353'
            }
        }
    } 


    return (

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>

            <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                margin: '14px 7px',
                width: '100%'
                }}
            >
                <div style={{
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    <span>
                        <input className='Domini' type="search" style={{
                            background: 'white',
                            color: 'black',
                            width: '300px'
                        }} placeholder='Pesquise por aqui...'/>
                    </span>

                        <div style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                margin: '0 15px'
                        }}>
                            <button className='Domini' style={{
                                background: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '37px',
                                width: '37px',
                                border: '1px solid #d4d4d4',
                                borderRadius: '7px 0 0 7px',
                                outline: 0
                                
                            }}>
                                <PrinterIcon width={23} height={23} fill='#3c5461'/>
                            </button>
                            <button className='Domini' style={{
                                background: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '37px',
                                width: '37px',
                                border: '1px solid #d4d4d4',
                                borderRadius: '0 7px 7px 0',
                                outline: 0
                            }}>
                                <CSVIcon width={23} height={23} fill='#3c5461'/>
                            </button>
                        </div>


                     
                </div>

                <span>

            
                        <ActionButton></ActionButton>
              
                    
                </span>
                   
                    
            </div>


                <div style={{
                        border: '1px solid #d6dadf',
                        borderRadius: '7px',
                        height: '450px',
                        width: '100%'
                    }}>
                    <table cellSpacing={0}>
                        <thead>
                            <tr>
                                <th style={{ width: '125px'}}>Cliente</th>
                                <th style={{ width: '30px'}}>Serviço</th>
                                <th style={{ width: '30px'}}>Agendado</th>
                                <th style={{ width: '130px'}}>Funcionários</th>
                                <th style={{ width: '90px'}}>Inicio</th>
                                <th style={{ width: '90px'}}>Fim</th>
                                <th style={{ width: '80px'}}>Tempo Gasto</th>
                                <th style={{ width: '50px'}}>Status</th>
                                <th style={{ width: '30px'}}>Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {DB.services.map((job)=>{

                                const { 
                                    clientID, 
                                    wedoID, 
                                    scheduled,
                                    start, 
                                    estimatedTime,
                                    end,
                                    status,
                                    employees
                                } = job;

                                const { hours, minutes } = TwoDatesCalculator(start, end)
        

                                console.log(job);
                                

                                const queryClient = ObjectQuery.search(clientID, DB.clients, 'value')
                                const queryWeDo = ObjectQuery.search(wedoID, DB.weDo, 'value')
                                if(queryClient.length === 0 || queryWeDo.length === 0)  return 


                                let employeesText = ''
                                
                                for(const [idx, item] of employees.entries()){
                                    const queryEmployees = ObjectQuery.search(item, DB.employees, 'value')
                                    const totalEmployees = employees.length
                                    const leftEmployees = totalEmployees - 2

                                    if (totalEmployees >= 2 && idx >= 2) {
                                        employeesText += ' e +' + leftEmployees;
                                        break
                                    }else {
                                        employeesText += queryEmployees[0].name
                                        employeesText += idx == 0 ? ', ' : ''
                                    }
                                }

                    

                                return (
                                    <tr>
                                        <td>{queryClient[0].name }</td>
                                        <td>{queryWeDo[0].category} </td>
                                        <td>{scheduled == true ? 'Sim' : 'Não'}</td>
                                        <td>{employeesText}</td>
                                        <td>{SimpleDate(start)}</td>
                                        <td>{SimpleDate(end)}</td>
                                        <td>{hours}h e {minutes}min</td>
                                        <td>
                                            <span style={{
                                                color: 'white',
                                                backgroundColor: tableMap.progress[status].color,
                                                borderRadius: '15px',
                                                padding: '4px 15px'
                                            }}>{tableMap.progress[status].glossary}</span>
                                        </td>
                                        <td>

                                            <span className='flex-center'>
                                                <button className='flex-center' style={{
                                                        width: '33px',
                                                        height: '33px',
                                                        background: 'white',
                                                        outline: '0',
                                                        border: 'none',
                                                        margin: '4px'
                                                    }}
                                                >
                                                    <PencilIcon width={17} height={17} fill='#697983'/>
                                                </button>
                                                <button className='flex-center' style={{
                                                        width: '33px',
                                                        height: '33px',
                                                        background: 'white',
                                                        outline: '0',
                                                        border: 'none',
                                                        margin: '4px'
                                                    }}
                                                >
                                                    <PrinterIcon width={30} height={30} fill='#697983'/>
                                                </button>
                                                <button className='flex-center' style={{
                                                        width: '33px',
                                                        height: '33px',
                                                        background: 'white',
                                                        outline: '0',
                                                        border: 'none',
                                                        margin: '4px'
                                                    }}
                                                >
                                                    <PrinterIcon width={30} height={30} fill='#697983'/>
                                                </button>
                                            </span>
                                            
                                        </td>
                                    </tr>
                                )
    })}
                        </tbody>
                    </table>


                </div>
            </div>

        

    );

}


export default Main;