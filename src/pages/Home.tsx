import { useEffect, useMemo } from 'react';
import Table from '../components/Table'
import { Speedometer, CoinIcon, UserIcon } from '../icons'
import DB from '../util/DB'
import ObjectQuery from '../util/ObjectQuery'
import SimpleDate from '../util/SimpleDate'
import TwoDatesCalculator from '../util/TwoDatesCalculator'
import { Color } from '../themes/Themes'

function HomeScreen() {

  // Calcular métricas da dashboard
  const dashboardMetrics = useMemo(() => {
    const services = DB.services;
    
    // Total de serviços
    const totalServices = services.length;
    
    // Serviços por status
    const servicesFinished = services.filter(s => s.status === 'finished').length;
    const servicesInProgress = services.filter(s => s.status === 'inProgress' || s.status === 'started').length;
    const servicesCancelled = services.filter(s => s.status === 'cancelled').length;
    
    // Receita total estimada (baseado nos serviços finalizados)
    const totalRevenue = services
      .filter(s => s.status === 'finished')
      .reduce((acc, service) => {
        const serviceType = ObjectQuery.search(service.wedoID, DB.weDo, 'id')?.[0];
        if (serviceType) {
          const { hours } = TwoDatesCalculator(service.start, service.end);
          return acc + (serviceType.basePrice * hours);
        }
        return acc;
      }, 0);
    
    // Funcionários ativos
    const activeEmployees = DB.employees.length;
    
    // Clientes ativos
    const activeClients = DB.clients.length;
    
    return {
      totalServices,
      servicesFinished,
      servicesInProgress,
      servicesCancelled,
      totalRevenue,
      activeEmployees,
      activeClients
    };
  }, []);

  // Serviços recentes
  const recentServices = useMemo(() => {
    return DB.services
      .map(service => {
        const client = ObjectQuery.search(service.clientID, DB.clients, 'id')?.[0];
        const serviceType = ObjectQuery.search(service.wedoID, DB.weDo, 'id')?.[0];
        return {
          ...service,
          clientName: client?.name || 'Cliente não encontrado',
          serviceName: serviceType?.category || 'Serviço não encontrado'
        };
      })
      .sort((a, b) => new Date(b.start).getTime() - new Date(a.start).getTime())
      .slice(0, 5);
  }, []);

  useEffect(() => {

  }, []);

  const MetricCard = ({ title, value, icon, color }: { title: string, value: string | number, icon: React.ReactNode, color: string }) => (
    <div style={{
      background: 'white',
      borderRadius: '10px',
      padding: '20px',
      border: '1px solid #e5e7eb',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      minHeight: '100px'
    }}>
      <div>
        <h3 style={{ 
          margin: '0 0 8px 0', 
          fontSize: '14px', 
          color: '#6b7280',
          fontWeight: '500'
        }}>
          {title}
        </h3>
        <p style={{ 
          margin: 0, 
          fontSize: '24px', 
          fontWeight: 'bold', 
          color: Color.gunMetal 
        }}>
          {value}
        </p>
      </div>
      <div style={{
        background: color,
        borderRadius: '8px',
        padding: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {icon}
      </div>
    </div>
  );

  const StatusBadge = ({ status }: { status: string }) => {
    const statusColors = {
      finished: '#10b981',
      inProgress: '#3b82f6', 
      started: '#3b82f6',
      cancelled: '#ef4444'
    };
    
    const statusLabels = {
      finished: 'Finalizado',
      inProgress: 'Em Andamento',
      started: 'Iniciado', 
      cancelled: 'Cancelado'
    };

    return (
      <span style={{
        background: statusColors[status as keyof typeof statusColors] || '#6b7280',
        color: 'white',
        padding: '4px 8px',
        borderRadius: '4px',
        fontSize: '12px',
        fontWeight: '500'
      }}>
        {statusLabels[status as keyof typeof statusLabels] || status}
      </span>
    );
  };

  return (
    <div style={{
      padding: '24px',
      background: '#f9fafb',
      minHeight: '100vh'
    }}>
      <div style={{
        marginBottom: '32px'
      }}>
        <h1 style={{
          fontSize: '28px',
          fontWeight: 'bold',
          color: Color.gunMetal,
          margin: '0 0 8px 0'
        }}>
          Dashboard
        </h1>
        <p style={{
          color: '#6b7280',
          margin: 0
        }}>
          Visão geral dos serviços e métricas
        </p>
      </div>

      {/* Cards de Métricas */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '32px'
      }}>
        <MetricCard 
          title="Total de Serviços"
          value={dashboardMetrics.totalServices}
          icon={<Speedometer width={24} height={24} fill="white" />}
          color="#3b82f6"
        />
        
        <MetricCard 
          title="Receita Total"
          value={`R$ ${dashboardMetrics.totalRevenue.toFixed(2)}`}
          icon={<CoinIcon width={24} height={24} fill="white" />}
          color="#10b981"
        />
        
        <MetricCard 
          title="Funcionários Ativos"
          value={dashboardMetrics.activeEmployees}
          icon={<UserIcon width={24} height={24} fill="white" />}
          color="#8b5cf6"
        />
        
        <MetricCard 
          title="Clientes Ativos"
          value={dashboardMetrics.activeClients}
          icon={<UserIcon width={24} height={24} fill="white" />}
          color="#f59e0b"
        />
      </div>

      {/* Resumo por Status */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
        marginBottom: '32px'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '8px',
          padding: '16px',
          border: '1px solid #e5e7eb',
          textAlign: 'center'
        }}>
          <div style={{ 
            color: '#10b981', 
            fontSize: '20px', 
            fontWeight: 'bold',
            marginBottom: '4px'
          }}>
            {dashboardMetrics.servicesFinished}
          </div>
          <div style={{ color: '#6b7280', fontSize: '14px' }}>
            Finalizados
          </div>
        </div>
        
        <div style={{
          background: 'white',
          borderRadius: '8px',
          padding: '16px',
          border: '1px solid #e5e7eb',
          textAlign: 'center'
        }}>
          <div style={{ 
            color: '#3b82f6', 
            fontSize: '20px', 
            fontWeight: 'bold',
            marginBottom: '4px'
          }}>
            {dashboardMetrics.servicesInProgress}
          </div>
          <div style={{ color: '#6b7280', fontSize: '14px' }}>
            Em Andamento
          </div>
        </div>
        
        <div style={{
          background: 'white',
          borderRadius: '8px',
          padding: '16px',
          border: '1px solid #e5e7eb',
          textAlign: 'center'
        }}>
          <div style={{ 
            color: '#ef4444', 
            fontSize: '20px', 
            fontWeight: 'bold',
            marginBottom: '4px'
          }}>
            {dashboardMetrics.servicesCancelled}
          </div>
          <div style={{ color: '#6b7280', fontSize: '14px' }}>
            Cancelados
          </div>
        </div>
      </div>

      {/* Atividades Recentes */}
      <div style={{
        background: 'white',
        borderRadius: '10px',
        border: '1px solid #e5e7eb',
        marginBottom: '32px'
      }}>
        <div style={{
          padding: '20px',
          borderBottom: '1px solid #e5e7eb'
        }}>
          <h2 style={{
            fontSize: '18px',
            fontWeight: 'bold',
            color: Color.gunMetal,
            margin: 0
          }}>
            Atividades Recentes
          </h2>
        </div>
        
        <div style={{ padding: '16px' }}>
          {recentServices.map((service, index) => (
            <div key={service.id} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px 0',
              borderBottom: index < recentServices.length - 1 ? '1px solid #f3f4f6' : 'none'
            }}>
              <div>
                <div style={{
                  fontWeight: '500',
                  color: Color.gunMetal,
                  marginBottom: '4px'
                }}>
                  {service.clientName} - {service.serviceName}
                </div>
                <div style={{
                  fontSize: '14px',
                  color: '#6b7280'
                }}>
                  Iniciado em {SimpleDate(service.start)}
                </div>
              </div>
              <StatusBadge status={service.status} />
            </div>
          ))}
        </div>
      </div>

      {/* Tabela Completa */}
      <div style={{
        background: 'white',
        borderRadius: '10px',
        border: '1px solid #e5e7eb',
        padding: '20px'
      }}>
        <h2 style={{
          fontSize: '18px',
          fontWeight: 'bold',
          color: Color.gunMetal,
          margin: '0 0 20px 0'
        }}>
          Todos os Serviços
        </h2>
        <Table />
      </div>
    </div>
  )
}

export default HomeScreen;
