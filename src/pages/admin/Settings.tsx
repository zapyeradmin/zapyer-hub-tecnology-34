import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Save, Globe, Mail, Bell, Shield, Palette } from 'lucide-react';

interface SiteSetting {
  id: string;
  key: string;
  value: any;
  description: string;
  updated_at: string;
}

const Settings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*');

      if (error) throw error;

      const settingsMap = (data || []).reduce((acc, setting) => {
        acc[setting.key] = setting.value;
        return acc;
      }, {});

      setSettings(settingsMap);
    } catch (error) {
      console.error('Error fetching settings:', error);
      toast({
        title: "Erro",
        description: "Falha ao carregar configurações",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateSetting = async (key: string, value: any, description?: string) => {
    try {
      const { error } = await supabase
        .from('site_settings')
        .upsert({
          key,
          value,
          description: description || `Configuração ${key}`,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;

      setSettings(prev => ({ ...prev, [key]: value }));
    } catch (error) {
      console.error('Error updating setting:', error);
      throw error;
    }
  };

  const handleSaveSection = async (sectionSettings: Array<{key: string, value: any, description?: string}>) => {
    setSaving(true);
    
    try {
      for (const setting of sectionSettings) {
        await updateSetting(setting.key, setting.value, setting.description);
      }

      toast({
        title: "Sucesso",
        description: "Configurações salvas com sucesso",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao salvar configurações",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleGeneralSave = () => {
    const sectionSettings = [
      { key: 'site_name', value: settings.site_name, description: 'Nome do site' },
      { key: 'site_description', value: settings.site_description, description: 'Descrição do site' },
      { key: 'site_url', value: settings.site_url, description: 'URL do site' },
      { key: 'contact_email', value: settings.contact_email, description: 'Email de contato' },
      { key: 'contact_phone', value: settings.contact_phone, description: 'Telefone de contato' },
      { key: 'maintenance_mode', value: settings.maintenance_mode, description: 'Modo de manutenção' },
    ];
    handleSaveSection(sectionSettings);
  };

  const handleEmailSave = () => {
    const sectionSettings = [
      { key: 'smtp_host', value: settings.smtp_host, description: 'Servidor SMTP' },
      { key: 'smtp_port', value: settings.smtp_port, description: 'Porta SMTP' },
      { key: 'smtp_username', value: settings.smtp_username, description: 'Usuário SMTP' },
      { key: 'smtp_password', value: settings.smtp_password, description: 'Senha SMTP' },
      { key: 'smtp_encryption', value: settings.smtp_encryption, description: 'Criptografia SMTP' },
      { key: 'email_from_name', value: settings.email_from_name, description: 'Nome remetente' },
      { key: 'email_from_address', value: settings.email_from_address, description: 'Email remetente' },
    ];
    handleSaveSection(sectionSettings);
  };

  const handleNotificationSave = () => {
    const sectionSettings = [
      { key: 'notifications_enabled', value: settings.notifications_enabled, description: 'Notificações habilitadas' },
      { key: 'email_notifications', value: settings.email_notifications, description: 'Notificações por email' },
      { key: 'sms_notifications', value: settings.sms_notifications, description: 'Notificações por SMS' },
      { key: 'push_notifications', value: settings.push_notifications, description: 'Notificações push' },
      { key: 'notification_frequency', value: settings.notification_frequency, description: 'Frequência de notificações' },
    ];
    handleSaveSection(sectionSettings);
  };

  const handleSecuritySave = () => {
    const sectionSettings = [
      { key: 'two_factor_auth', value: settings.two_factor_auth, description: 'Autenticação de dois fatores' },
      { key: 'password_min_length', value: settings.password_min_length, description: 'Tamanho mínimo da senha' },
      { key: 'session_timeout', value: settings.session_timeout, description: 'Tempo limite da sessão (minutos)' },
      { key: 'login_attempts', value: settings.login_attempts, description: 'Tentativas máximas de login' },
      { key: 'captcha_enabled', value: settings.captcha_enabled, description: 'CAPTCHA habilitado' },
    ];
    handleSaveSection(sectionSettings);
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
      <div>
        <h1 className="text-2xl font-bold text-foreground">Configurações do Sistema</h1>
        <p className="text-muted-foreground">Gerencie as configurações globais da aplicação</p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Geral
          </TabsTrigger>
          <TabsTrigger value="email" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Email
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notificações
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Segurança
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Aparência
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Configurações Gerais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="site_name">Nome do Site</Label>
                  <Input
                    id="site_name"
                    value={settings.site_name || ''}
                    onChange={(e) => setSettings({...settings, site_name: e.target.value})}
                    placeholder="Zapyer Hub"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="site_url">URL do Site</Label>
                  <Input
                    id="site_url"
                    value={settings.site_url || ''}
                    onChange={(e) => setSettings({...settings, site_url: e.target.value})}
                    placeholder="https://zapyerhub.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="site_description">Descrição do Site</Label>
                <Textarea
                  id="site_description"
                  value={settings.site_description || ''}
                  onChange={(e) => setSettings({...settings, site_description: e.target.value})}
                  placeholder="Descrição do seu site"
                  rows={3}
                />
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contact_email">Email de Contato</Label>
                  <Input
                    id="contact_email"
                    type="email"
                    value={settings.contact_email || ''}
                    onChange={(e) => setSettings({...settings, contact_email: e.target.value})}
                    placeholder="contato@zapyerhub.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact_phone">Telefone de Contato</Label>
                  <Input
                    id="contact_phone"
                    value={settings.contact_phone || ''}
                    onChange={(e) => setSettings({...settings, contact_phone: e.target.value})}
                    placeholder="+55 11 99999-9999"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="maintenance_mode"
                  checked={settings.maintenance_mode || false}
                  onCheckedChange={(checked) => setSettings({...settings, maintenance_mode: checked})}
                />
                <Label htmlFor="maintenance_mode">Modo de Manutenção</Label>
              </div>

              <div className="flex justify-end pt-4">
                <Button onClick={handleGeneralSave} disabled={saving}>
                  <Save className="h-4 w-4 mr-2" />
                  Salvar Configurações Gerais
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Email</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="smtp_host">Servidor SMTP</Label>
                  <Input
                    id="smtp_host"
                    value={settings.smtp_host || ''}
                    onChange={(e) => setSettings({...settings, smtp_host: e.target.value})}
                    placeholder="smtp.gmail.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtp_port">Porta</Label>
                  <Input
                    id="smtp_port"
                    type="number"
                    value={settings.smtp_port || ''}
                    onChange={(e) => setSettings({...settings, smtp_port: e.target.value})}
                    placeholder="587"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="smtp_username">Usuário</Label>
                  <Input
                    id="smtp_username"
                    value={settings.smtp_username || ''}
                    onChange={(e) => setSettings({...settings, smtp_username: e.target.value})}
                    placeholder="usuario@gmail.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtp_password">Senha</Label>
                  <Input
                    id="smtp_password"
                    type="password"
                    value={settings.smtp_password || ''}
                    onChange={(e) => setSettings({...settings, smtp_password: e.target.value})}
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="smtp_encryption">Criptografia</Label>
                <Input
                  id="smtp_encryption"
                  value={settings.smtp_encryption || ''}
                  onChange={(e) => setSettings({...settings, smtp_encryption: e.target.value})}
                  placeholder="tls"
                />
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email_from_name">Nome do Remetente</Label>
                  <Input
                    id="email_from_name"
                    value={settings.email_from_name || ''}
                    onChange={(e) => setSettings({...settings, email_from_name: e.target.value})}
                    placeholder="Zapyer Hub"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email_from_address">Email Remetente</Label>
                  <Input
                    id="email_from_address"
                    type="email"
                    value={settings.email_from_address || ''}
                    onChange={(e) => setSettings({...settings, email_from_address: e.target.value})}
                    placeholder="noreply@zapyerhub.com"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button onClick={handleEmailSave} disabled={saving}>
                  <Save className="h-4 w-4 mr-2" />
                  Salvar Configurações de Email
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Notificações</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="notifications_enabled"
                    checked={settings.notifications_enabled || false}
                    onCheckedChange={(checked) => setSettings({...settings, notifications_enabled: checked})}
                  />
                  <Label htmlFor="notifications_enabled">Habilitar Notificações</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="email_notifications"
                    checked={settings.email_notifications || false}
                    onCheckedChange={(checked) => setSettings({...settings, email_notifications: checked})}
                  />
                  <Label htmlFor="email_notifications">Notificações por Email</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="sms_notifications"
                    checked={settings.sms_notifications || false}
                    onCheckedChange={(checked) => setSettings({...settings, sms_notifications: checked})}
                  />
                  <Label htmlFor="sms_notifications">Notificações por SMS</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="push_notifications"
                    checked={settings.push_notifications || false}
                    onCheckedChange={(checked) => setSettings({...settings, push_notifications: checked})}
                  />
                  <Label htmlFor="push_notifications">Notificações Push</Label>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notification_frequency">Frequência de Notificações</Label>
                <Input
                  id="notification_frequency"
                  value={settings.notification_frequency || ''}
                  onChange={(e) => setSettings({...settings, notification_frequency: e.target.value})}
                  placeholder="daily, weekly, monthly"
                />
              </div>

              <div className="flex justify-end pt-4">
                <Button onClick={handleNotificationSave} disabled={saving}>
                  <Save className="h-4 w-4 mr-2" />
                  Salvar Configurações de Notificações
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Segurança</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="two_factor_auth"
                  checked={settings.two_factor_auth || false}
                  onCheckedChange={(checked) => setSettings({...settings, two_factor_auth: checked})}
                />
                <Label htmlFor="two_factor_auth">Autenticação de Dois Fatores</Label>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password_min_length">Tamanho Mínimo da Senha</Label>
                  <Input
                    id="password_min_length"
                    type="number"
                    value={settings.password_min_length || ''}
                    onChange={(e) => setSettings({...settings, password_min_length: parseInt(e.target.value)})}
                    placeholder="8"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="session_timeout">Tempo Limite da Sessão (min)</Label>
                  <Input
                    id="session_timeout"
                    type="number"
                    value={settings.session_timeout || ''}
                    onChange={(e) => setSettings({...settings, session_timeout: parseInt(e.target.value)})}
                    placeholder="60"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="login_attempts">Máximo de Tentativas de Login</Label>
                  <Input
                    id="login_attempts"
                    type="number"
                    value={settings.login_attempts || ''}
                    onChange={(e) => setSettings({...settings, login_attempts: parseInt(e.target.value)})}
                    placeholder="5"
                  />
                </div>
                <div className="flex items-center space-x-2 pt-8">
                  <Switch
                    id="captcha_enabled"
                    checked={settings.captcha_enabled || false}
                    onCheckedChange={(checked) => setSettings({...settings, captcha_enabled: checked})}
                  />
                  <Label htmlFor="captcha_enabled">CAPTCHA Habilitado</Label>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button onClick={handleSecuritySave} disabled={saving}>
                  <Save className="h-4 w-4 mr-2" />
                  Salvar Configurações de Segurança
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Aparência</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                As configurações de aparência serão implementadas em uma versão futura.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;