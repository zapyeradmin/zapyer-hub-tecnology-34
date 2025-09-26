import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Settings, Zap, Mail, MessageSquare, Globe, Edit, Trash2 } from 'lucide-react';

interface Integration {
  id: string;
  name: string;
  type: string;
  is_active: boolean;
  config: any;
  created_at: string;
  updated_at: string;
}

const integrationTypes = [
  { value: 'zapier', label: 'Zapier', icon: Zap },
  { value: 'email', label: 'Email Marketing', icon: Mail },
  { value: 'whatsapp', label: 'WhatsApp', icon: MessageSquare },
  { value: 'webhook', label: 'Webhook', icon: Globe },
];

const Integrations = () => {
  const { toast } = useToast();
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    is_active: true,
    config: {}
  });

  useEffect(() => {
    fetchIntegrations();
  }, []);

  const fetchIntegrations = async () => {
    try {
      const { data, error } = await supabase
        .from('integrations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setIntegrations(data || []);
    } catch (error) {
      console.error('Error fetching integrations:', error);
      toast({
        title: "Erro",
        description: "Falha ao carregar integrações",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const integrationData = {
        name: formData.name,
        type: formData.type,
        is_active: formData.is_active,
        config: formData.config
      };

      if (selectedIntegration) {
        const { error } = await supabase
          .from('integrations')
          .update(integrationData)
          .eq('id', selectedIntegration.id);
        
        if (error) throw error;
        
        toast({
          title: "Sucesso",
          description: "Integração atualizada com sucesso",
        });
      } else {
        const { error } = await supabase
          .from('integrations')
          .insert([integrationData]);
        
        if (error) throw error;
        
        toast({
          title: "Sucesso",
          description: "Integração criada com sucesso",
        });
      }

      setIsDialogOpen(false);
      setSelectedIntegration(null);
      setFormData({
        name: '',
        type: '',
        is_active: true,
        config: {}
      });
      fetchIntegrations();
    } catch (error) {
      console.error('Error saving integration:', error);
      toast({
        title: "Erro",
        description: "Falha ao salvar integração",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (integration: Integration) => {
    setSelectedIntegration(integration);
    setFormData({
      name: integration.name,
      type: integration.type,
      is_active: integration.is_active,
      config: integration.config || {}
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta integração?')) return;

    try {
      const { error } = await supabase
        .from('integrations')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Integração excluída com sucesso",
      });
      
      fetchIntegrations();
    } catch (error) {
      console.error('Error deleting integration:', error);
      toast({
        title: "Erro",
        description: "Falha ao excluir integração",
        variant: "destructive",
      });
    }
  };

  const toggleIntegration = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('integrations')
        .update({ is_active: !currentStatus })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: `Integração ${!currentStatus ? 'ativada' : 'desativada'} com sucesso`,
      });
      
      fetchIntegrations();
    } catch (error) {
      console.error('Error toggling integration:', error);
      toast({
        title: "Erro",
        description: "Falha ao alterar status da integração",
        variant: "destructive",
      });
    }
  };

  const getIntegrationIcon = (type: string) => {
    const integration = integrationTypes.find(i => i.value === type);
    const Icon = integration?.icon || Settings;
    return <Icon className="h-5 w-5" />;
  };

  const renderConfigFields = () => {
    switch (formData.type) {
      case 'zapier':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="webhook_url">URL do Webhook</Label>
              <Input
                id="webhook_url"
                value={(formData.config as any)?.webhook_url || ''}
                onChange={(e) => setFormData({
                  ...formData,
                  config: { ...formData.config, webhook_url: e.target.value }
                })}
                placeholder="https://hooks.zapier.com/hooks/catch/..."
              />
            </div>
          </div>
        );
      
      case 'email':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="api_key">Chave da API</Label>
              <Input
                id="api_key"
                type="password"
                value={(formData.config as any)?.api_key || ''}
                onChange={(e) => setFormData({
                  ...formData,
                  config: { ...formData.config, api_key: e.target.value }
                })}
                placeholder="Sua chave da API do provedor de email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="from_email">Email Remetente</Label>
              <Input
                id="from_email"
                type="email"
                value={(formData.config as any)?.from_email || ''}
                onChange={(e) => setFormData({
                  ...formData,
                  config: { ...formData.config, from_email: e.target.value }
                })}
                placeholder="noreply@seudominio.com"
              />
            </div>
          </div>
        );
      
      case 'whatsapp':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone_number">Número do Telefone</Label>
              <Input
                id="phone_number"
                value={(formData.config as any)?.phone_number || ''}
                onChange={(e) => setFormData({
                  ...formData,
                  config: { ...formData.config, phone_number: e.target.value }
                })}
                placeholder="+5511999999999"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="api_token">Token da API</Label>
              <Input
                id="api_token"
                type="password"
                value={(formData.config as any)?.api_token || ''}
                onChange={(e) => setFormData({
                  ...formData,
                  config: { ...formData.config, api_token: e.target.value }
                })}
                placeholder="Seu token da API do WhatsApp"
              />
            </div>
          </div>
        );
      
      case 'webhook':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="url">URL do Webhook</Label>
              <Input
                id="url"
                value={(formData.config as any)?.url || ''}
                onChange={(e) => setFormData({
                  ...formData,
                  config: { ...formData.config, url: e.target.value }
                })}
                placeholder="https://api.exemplo.com/webhook"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="secret">Chave Secreta (Opcional)</Label>
              <Input
                id="secret"
                type="password"
                value={(formData.config as any)?.secret || ''}
                onChange={(e) => setFormData({
                  ...formData,
                  config: { ...formData.config, secret: e.target.value }
                })}
                placeholder="Chave para validação do webhook"
              />
            </div>
          </div>
        );
      
      default:
        return (
          <div className="space-y-2">
            <Label htmlFor="config_json">Configuração (JSON)</Label>
            <Textarea
              id="config_json"
              value={JSON.stringify(formData.config, null, 2)}
              onChange={(e) => {
                try {
                  const config = JSON.parse(e.target.value);
                  setFormData({ ...formData, config });
                } catch (error) {
                  // Ignore invalid JSON while typing
                }
              }}
              placeholder='{"key": "value"}'
              rows={4}
            />
          </div>
        );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Integrações</h1>
          <p className="text-muted-foreground">Gerencie suas integrações externas</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setSelectedIntegration(null);
              setFormData({
                name: '',
                type: '',
                is_active: true,
                config: {}
              });
            }}>
              <Plus className="h-4 w-4 mr-2" />
              Nova Integração
            </Button>
          </DialogTrigger>
          
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>
                {selectedIntegration ? 'Editar Integração' : 'Nova Integração'}
              </DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Nome da integração"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Tipo</Label>
                <Select 
                  value={formData.type} 
                  onValueChange={(value) => setFormData({ ...formData, type: value, config: {} })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {integrationTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex items-center gap-2">
                          <type.icon className="h-4 w-4" />
                          {type.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="is_active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                />
                <Label htmlFor="is_active">Ativar integração</Label>
              </div>

              {formData.type && renderConfigFields()}

              <div className="flex justify-end gap-2 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancelar
                </Button>
                <Button type="submit">
                  {selectedIntegration ? 'Atualizar' : 'Criar'} Integração
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {integrations.length === 0 ? (
          <Card className="col-span-full">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Settings className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-4">Nenhuma integração configurada</p>
              <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Criar primeira integração
              </Button>
            </CardContent>
          </Card>
        ) : (
          integrations.map((integration) => (
            <Card key={integration.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="flex items-center gap-2">
                  {getIntegrationIcon(integration.type)}
                  <CardTitle className="text-base">{integration.name}</CardTitle>
                </div>
                <Badge variant={integration.is_active ? 'default' : 'secondary'}>
                  {integration.is_active ? 'Ativo' : 'Inativo'}
                </Badge>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground capitalize">
                    {integrationTypes.find(t => t.value === integration.type)?.label || integration.type}
                  </p>
                  
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={integration.is_active}
                      onCheckedChange={() => toggleIntegration(integration.id, integration.is_active)}
                    />
                    <span className="text-sm">
                      {integration.is_active ? 'Ativado' : 'Desativado'}
                    </span>
                  </div>
                  
                  <div className="flex justify-end gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(integration)}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Editar
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(integration.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Excluir
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Integrations;