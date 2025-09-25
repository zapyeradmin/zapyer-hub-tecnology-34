import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Briefcase, CheckSquare, TrendingUp, DollarSign, Calendar, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { supabase } from '@/integrations/supabase/client';

interface DashboardMetrics {
  totalClients: number;
  activeDeals: number;
  pendingTasks: number;
  monthlyRevenue: number;
}

const mockSalesData = [
  { month: 'Jan', vendas: 4000, receita: 2400 },
  { month: 'Fev', vendas: 3000, receita: 1398 },
  { month: 'Mar', vendas: 5000, receita: 9800 },
  { month: 'Abr', vendas: 2780, receita: 3908 },
  { month: 'Mai', vendas: 1890, receita: 4800 },
  { month: 'Jun', vendas: 2390, receita: 3800 },
];

const mockDealStages = [
  { name: 'Leads', value: 35, color: '#8884d8' },
  { name: 'Propostas', value: 25, color: '#82ca9d' },
  { name: 'Negociação', value: 20, color: '#ffc658' },
  { name: 'Fechados', value: 20, color: '#ff7300' },
];

const Dashboard = () => {
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    totalClients: 0,
    activeDeals: 0,
    pendingTasks: 0,
    monthlyRevenue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch clients count
      const { count: clientsCount } = await supabase
        .from('clients')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'active');

      // Fetch active deals count
      const { count: dealsCount } = await supabase
        .from('deals')
        .select('*', { count: 'exact', head: true })
        .in('stage', ['lead', 'proposal', 'negotiation']);

      // Fetch pending tasks count
      const { count: tasksCount } = await supabase
        .from('tasks')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending');

      // Calculate monthly revenue (mock for now)
      const { data: closedDeals } = await supabase
        .from('deals')
        .select('value')
        .eq('stage', 'closed_won')
        .gte('updated_at', new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString());

      const monthlyRevenue = closedDeals?.reduce((sum, deal) => sum + (deal.value || 0), 0) || 0;

      setMetrics({
        totalClients: clientsCount || 0,
        activeDeals: dealsCount || 0,
        pendingTasks: tasksCount || 0,
        monthlyRevenue,
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const MetricCard = ({ title, value, description, icon: Icon, trend }: any) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{loading ? '...' : value}</div>
        <p className="text-xs text-muted-foreground flex items-center gap-1">
          {trend && (
            <Badge variant={trend > 0 ? "default" : "secondary"} className="text-xs">
              {trend > 0 ? '+' : ''}{trend}%
            </Badge>
          )}
          {description}
        </p>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">
          Visão geral do seu negócio e métricas importantes
        </p>
      </div>

      {/* Metrics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total de Clientes"
          value={metrics.totalClients}
          description="clientes ativos"
          icon={Users}
          trend={12}
        />
        <MetricCard
          title="Negócios Ativos"
          value={metrics.activeDeals}
          description="em andamento"
          icon={Briefcase}
          trend={5}
        />
        <MetricCard
          title="Tarefas Pendentes"
          value={metrics.pendingTasks}
          description="para hoje"
          icon={CheckSquare}
          trend={-2}
        />
        <MetricCard
          title="Receita Mensal"
          value={`R$ ${metrics.monthlyRevenue.toLocaleString('pt-BR')}`}
          description="este mês"
          icon={DollarSign}
          trend={18}
        />
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Sales Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Vendas e Receita
            </CardTitle>
            <CardDescription>
              Evolução mensal das vendas e receita
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockSalesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="vendas" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  name="Vendas"
                />
                <Line 
                  type="monotone" 
                  dataKey="receita" 
                  stroke="hsl(var(--secondary))" 
                  strokeWidth={2}
                  name="Receita"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pipeline Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Pipeline de Negócios
            </CardTitle>
            <CardDescription>
              Distribuição dos negócios por estágio
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={mockDealStages}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {mockDealStages.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Atividade Recente
          </CardTitle>
          <CardDescription>
            Últimas ações realizadas no sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
              <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Novo cliente cadastrado</p>
                <p className="text-xs text-muted-foreground">João Silva - há 2 horas</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
              <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Negócio atualizado</p>
                <p className="text-xs text-muted-foreground">Proposta TechCorp - há 4 horas</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
              <div className="h-2 w-2 bg-orange-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Tarefa venceu</p>
                <p className="text-xs text-muted-foreground">Ligar para cliente ABC - há 6 horas</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;