import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
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
import { Label } from '@/components/ui/label';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';

interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
  status: string;
  featured_image: string;
  published_at: string;
  created_at: string;
  updated_at: string;
  author_id: string;
}

const News = () => {
  const { toast } = useToast();
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: 'geral',
    status: 'draft',
    featured_image: ''
  });

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const { data, error } = await supabase
        .from('news_admin')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setArticles(data || []);
    } catch (error) {
      console.error('Error fetching articles:', error);
      toast({
        title: "Erro",
        description: "Falha ao carregar notícias",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const slug = generateSlug(formData.title);
      const articleData = {
        ...formData,
        slug,
        published_at: formData.status === 'published' ? new Date().toISOString() : null
      };

      if (selectedArticle) {
        const { error } = await supabase
          .from('news_admin')
          .update(articleData)
          .eq('id', selectedArticle.id);
        
        if (error) throw error;
        
        toast({
          title: "Sucesso",
          description: "Notícia atualizada com sucesso",
        });
      } else {
        const { error } = await supabase
          .from('news_admin')
          .insert([articleData]);
        
        if (error) throw error;
        
        toast({
          title: "Sucesso",
          description: "Notícia criada com sucesso",
        });
      }

      setIsDialogOpen(false);
      setSelectedArticle(null);
      setFormData({
        title: '',
        content: '',
        excerpt: '',
        category: 'geral',
        status: 'draft',
        featured_image: ''
      });
      fetchArticles();
    } catch (error) {
      console.error('Error saving article:', error);
      toast({
        title: "Erro",
        description: "Falha ao salvar notícia",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (article: NewsArticle) => {
    setSelectedArticle(article);
    setFormData({
      title: article.title,
      content: article.content,
      excerpt: article.excerpt || '',
      category: article.category,
      status: article.status,
      featured_image: article.featured_image || ''
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta notícia?')) return;

    try {
      const { error } = await supabase
        .from('news_admin')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Notícia excluída com sucesso",
      });
      
      fetchArticles();
    } catch (error) {
      console.error('Error deleting article:', error);
      toast({
        title: "Erro",
        description: "Falha ao excluir notícia",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "destructive" | "outline" | "secondary"> = {
      draft: 'secondary',
      published: 'default',
      archived: 'outline'
    };
    
    return (
      <Badge variant={variants[status] || 'secondary'}>
        {status === 'draft' ? 'Rascunho' : 
         status === 'published' ? 'Publicado' : 'Arquivado'}
      </Badge>
    );
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
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-xl -z-10"></div>
          <div className="p-6 rounded-xl">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent mb-2">
              Gerenciamento de Notícias
            </h1>
            <p className="text-muted-foreground text-lg">Gerencie artigos e notícias do site</p>
          </div>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setSelectedArticle(null);
              setFormData({
                title: '',
                content: '',
                excerpt: '',
                category: 'geral',
                status: 'draft',
                featured_image: ''
              });
            }} className="bg-gradient-to-r from-primary to-primary/90 hover:opacity-90 shadow-lg">
              <Plus className="h-4 w-4 mr-2" />
              Nova Notícia
            </Button>
          </DialogTrigger>
          
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-gradient-to-br from-card via-card/95 to-card/90 border border-primary/20">
            <DialogHeader>
              <DialogTitle className="text-xl bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                {selectedArticle ? 'Editar Notícia' : 'Nova Notícia'}
              </DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Título da notícia"
                  required
                  className="bg-background/50 border-primary/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Categoria</Label>
                  <Select 
                    value={formData.category} 
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger className="bg-background/50 border-primary/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="geral">Geral</SelectItem>
                      <SelectItem value="tecnologia">Tecnologia</SelectItem>
                      <SelectItem value="negocios">Negócios</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="inovacao">Inovação</SelectItem>
                      <SelectItem value="automacao">Automação</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select 
                    value={formData.status} 
                    onValueChange={(value) => setFormData({ ...formData, status: value })}
                  >
                    <SelectTrigger className="bg-background/50 border-primary/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Rascunho</SelectItem>
                      <SelectItem value="published">Publicado</SelectItem>
                      <SelectItem value="archived">Arquivado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="featured_image">URL da Imagem Destacada</Label>
                <Input
                  id="featured_image"
                  value={formData.featured_image}
                  onChange={(e) => setFormData({ ...formData, featured_image: e.target.value })}
                  placeholder="https://exemplo.com/imagem.jpg"
                  className="bg-background/50 border-primary/20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt">Resumo</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="Breve descrição da notícia"
                  rows={3}
                  className="bg-background/50 border-primary/20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Conteúdo</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Conteúdo completo da notícia"
                  rows={12}
                  required
                  className="bg-background/50 border-primary/20"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancelar
                </Button>
                <Button type="submit" className="bg-gradient-to-r from-primary to-primary/90 hover:opacity-90">
                  {selectedArticle ? 'Atualizar' : 'Criar'} Notícia
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6">
        {articles.length === 0 ? (
          <Card className="bg-gradient-to-br from-card via-card/95 to-card/90 border border-primary/20 shadow-lg">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="p-4 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 mb-4">
                <Plus className="h-8 w-8 text-primary" />
              </div>
              <p className="text-muted-foreground mb-4 text-lg">Nenhuma notícia encontrada</p>
              <Button onClick={() => setIsDialogOpen(true)} className="bg-gradient-to-r from-primary to-primary/90 hover:opacity-90">
                <Plus className="h-4 w-4 mr-2" />
                Criar primeira notícia
              </Button>
            </CardContent>
          </Card>
        ) : (
          articles.map((article) => (
            <Card key={article.id} className="bg-gradient-to-br from-card via-card/95 to-card/90 border border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <CardTitle className="text-xl text-foreground hover:text-primary transition-colors">
                      {article.title}
                    </CardTitle>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <span>Categoria:</span>
                        <Badge variant="outline" className="capitalize bg-primary/10 text-primary border-primary/30">
                          {article.category}
                        </Badge>
                      </div>
                      <span>•</span>
                      <span>{new Date(article.created_at).toLocaleDateString('pt-BR')}</span>
                      {article.published_at && (
                        <>
                          <span>•</span>
                          <span>Publicado: {new Date(article.published_at).toLocaleDateString('pt-BR')}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(article.status)}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="flex gap-4">
                  {article.featured_image && (
                    <div className="flex-shrink-0">
                      <img 
                        src={article.featured_image} 
                        alt={article.title}
                        className="w-24 h-24 object-cover rounded-lg border border-primary/20"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                  
                  <div className="flex-1 space-y-4">
                    {article.excerpt && (
                      <p className="text-muted-foreground leading-relaxed">{article.excerpt}</p>
                    )}
                    
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(`/noticias/${article.slug}`, '_blank')}
                        className="border-primary/30 hover:bg-primary/10"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Visualizar
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(article)}
                        className="border-primary/30 hover:bg-primary/10"
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Editar
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(article.id)}
                        className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Excluir
                      </Button>
                    </div>
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

export default News;