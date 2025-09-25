import { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuthState } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarTrigger,
  useSidebar 
} from '@/components/ui/sidebar';
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  CheckSquare, 
  Newspaper, 
  Settings, 
  Plug, 
  LogOut,
  Menu
} from 'lucide-react';
import zapyerLogo from '@/assets/zapyer-hub-logo.png';
import { NavLink } from 'react-router-dom';

const sidebarItems = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Clientes', href: '/admin/clients', icon: Users },
  { name: 'Negócios', href: '/admin/deals', icon: Briefcase },
  { name: 'Tarefas', href: '/admin/tasks', icon: CheckSquare },
  { name: 'Notícias', href: '/admin/news', icon: Newspaper },
  { name: 'Integrações', href: '/admin/integrations', icon: Plug },
  { name: 'Configurações', href: '/admin/settings', icon: Settings },
];

const AdminSidebar = () => {
  const { collapsed } = useSidebar();
  const location = useLocation();
  const { signOut } = useAuthState();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <Sidebar className={`transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'}`}>
      <SidebarContent className="flex flex-col h-full bg-card border-r">
        {/* Logo */}
        <div className="p-4 border-b">
          <div className="flex items-center gap-3">
            <img 
              src={zapyerLogo} 
              alt="Zapyer Hub" 
              className="h-8 w-auto flex-shrink-0"
            />
            {!collapsed && (
              <h1 className="font-bold text-lg text-foreground">
                Zapyer Hub
              </h1>
            )}
          </div>
        </div>

        {/* Navigation */}
        <SidebarGroup className="flex-1">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1 p-2">
              {sidebarItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.href}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                        isActive(item.href)
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      }`}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!collapsed && (
                        <span className="font-medium">{item.name}</span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Logout Button */}
        <div className="p-2 border-t">
          <Button
            variant="ghost"
            onClick={handleLogout}
            className={`w-full justify-start gap-3 text-muted-foreground hover:text-foreground hover:bg-muted ${
              collapsed ? 'px-2' : 'px-3'
            }`}
          >
            <LogOut className="h-5 w-5 flex-shrink-0" />
            {!collapsed && <span>Logout</span>}
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
};

const AdminLayout = () => {
  const { user, loading } = useAuthState();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/admin/login');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-background">
        <AdminSidebar />
        
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="h-16 bg-card border-b flex items-center px-6 gap-4">
            <SidebarTrigger className="md:hidden">
              <Menu className="h-5 w-5" />
            </SidebarTrigger>
            
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-foreground">
                Painel Administrativo
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {user.email}
              </span>
            </div>
          </header>

          {/* Content */}
          <div className="flex-1 overflow-auto p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;