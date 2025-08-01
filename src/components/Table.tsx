import React, { useMemo, useState } from 'react'
import { PencilIcon, SearchIcon } from '../icons'
import ObjectQuery from '../util/ObjectQuery'
import TwoDatesCalculator from '../util/TwoDatesCalculator'
import DB from '../util/DB'
import SimpleDate from '../util/SimpleDate'
import { PrinterIcon, CSVIcon } from '../icons'
import ActionButton from './ActionButton'

// Types
interface ProcessedService {
  id: string
  clientID: number
  wedoID: number
  scheduled: boolean
  start: string
  estimatedTime: number | string
  end: string
  status: keyof typeof STATUS_MAP.progress
  priority: string
  employees: number[]
  clientName: string
  serviceName: string
  employeesText: string
  timeSpent: string
}

// Constants
const STATUS_MAP = {
        progress: {
            started: { 
            glossary: 'Iniciado',
            color: '#2563eb'
            },
            inProgress: { 
            glossary: 'Em Andamento',
            color: '#2563eb'
            },
            finished: { 
            glossary: 'Finalizado',
                color: '#40af96'
            },
            cancelled: { 
            glossary: 'Cancelado',
                color: '#CF6353'
            }
        }
} as const

// Utility functions
const formatEmployeesText = (employees: number[]): string => {
    if (employees.length === 0) return 'Nenhum funcionário'
    
    const employeeNames = employees.slice(0, 2).map(employeeId => {
        const employee = ObjectQuery.search(employeeId, DB.employees, 'id')?.[0]
        return employee?.name || 'Funcionário não encontrado'
    })
    
    if (employees.length <= 2) {
        return employeeNames.join(', ')
    }
    
    const remainingCount = employees.length - 2
    return `${employeeNames.join(', ')} e +${remainingCount}`
}

const Table: React.FC = () => {
    
    const [searchTerm, setSearchTerm] = useState('')

    // Process services data with memoization for performance
    const processedServices = useMemo((): ProcessedService[] => {
        return DB.services
            .map((job) => {
                const client = ObjectQuery.search(job.clientID, DB.clients, 'id')?.[0]
                const service = ObjectQuery.search(job.wedoID, DB.weDo, 'id')?.[0]
                
                // Skip if client or service not found
                if (!client || !service) return null
                
                const { hours, minutes } = TwoDatesCalculator(job.start, job.end)
                
                return {
                    ...job,
                    id: `${job.id}-${job.clientID}-${job.wedoID}`,
                    clientName: client.name,
                    serviceName: service.category,
                    employeesText: formatEmployeesText(job.employees),
                    timeSpent: `${hours}h e ${minutes}min`
                } as ProcessedService
            })
            .filter((service): service is ProcessedService => service !== null)
    }, [])

    // Filter services based on search term
    const filteredServices = useMemo(() => {
        if (!searchTerm.trim()) return processedServices
        
        const search = searchTerm.toLowerCase()
        return processedServices.filter(service => 
            service.clientName.toLowerCase().includes(search) ||
            service.serviceName.toLowerCase().includes(search) ||
            service.employeesText.toLowerCase().includes(search)
        )
    }, [processedServices, searchTerm])

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
                <div style={{ position: 'relative', display: 'inline-block' }}>
                    <input 
                        className='Domini' 
                        type="search" 
                        style={{
                            background: 'white',
                            color: 'black',
                            width: '300px',
                            paddingLeft: '35px'
                        }} 
                        placeholder='Pesquise por aqui...'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <SearchIcon 
                        width={18} 
                        height={18} 
                        fill='#999'
                        style={{
                            position: 'absolute',
                            left: '10px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            pointerEvents: 'none'
                        }}
                    />
                </div>

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
                <ActionButton />            
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
                        {filteredServices.map((service) => (
                            <tr key={service.id}>
                                <td>{service.clientName}</td>
                                <td>{service.serviceName}</td>
                                <td>{service.scheduled ? 'Sim' : 'Não'}</td>
                                <td>{service.employeesText}</td>
                                <td>{SimpleDate(service.start)}</td>
                                <td>{SimpleDate(service.end)}</td>
                                <td>{service.timeSpent}</td>
                                <td>
                                    <span style={{
                                        color: 'white',
                                        backgroundColor: STATUS_MAP.progress[service.status].color,
                                        borderRadius: '15px',
                                        padding: '4px 15px'
                                    }}>{STATUS_MAP.progress[service.status].glossary}</span>
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
                                            <PrinterIcon width={17} height={17} fill='#697983'/>
                                        </button>
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )

}

export default Table