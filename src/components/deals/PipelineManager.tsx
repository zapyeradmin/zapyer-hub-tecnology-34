import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Settings, Plus, Edit, Trash2, Palette } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Stage {
  id: string;
  name: string;
  color: string;
  order: number;
}

interface PipelineManagerProps {
  stages: Stage[];
  onStagesUpdate: (stages: Stage[]) => void;
}

const colorOptions = [
  { name: 'Azul', value: 'bg-blue-500/10 border-blue-500/20', color: '#3b82f6' },
  { name: 'Verde', value: 'bg-green-500/10 border-green-500/20', color: '#22c55e' },
  { name: 'Amarelo', value: 'bg-yellow-500/10 border-yellow-500/20', color: '#eab308' },
  { name: 'Laranja', value: 'bg-orange-500/10 border-orange-500/20', color: '#f97316' },
  { name: 'Vermelho', value: 'bg-red-500/10 border-red-500/20', color: '#ef4444' },
  { name: 'Roxo', value: 'bg-purple-500/10 border-purple-500/20', color: '#a855f7' },
  { name: 'Rosa', value: 'bg-pink-500/10 border-pink-500/20', color: '#ec4899' },
  { name: 'Cinza', value: 'bg-gray-500/10 border-gray-500/20', color: '#6b7280' },
];

export const PipelineManager = ({ stages, onStagesUpdate }: PipelineManagerProps) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [editingStage, setEditingStage] = useState<Stage | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    color: colorOptions[0].value
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingStage) {
      // Edit existing stage
      const updatedStages = stages.map(stage => 
        stage.id === editingStage.id 
          ? { ...stage, name: formData.name, color: formData.color }
          : stage
      );
      onStagesUpdate(updatedStages);
      toast({
        title: "Sucesso",
        description: "Estágio atualizado com sucesso!",
      });
    } else {
      // Add new stage
      const newStage: Stage = {
        id: `stage_${Date.now()}`,
        name: formData.name,
        color: formData.color,
        order: stages.length
      };
      onStagesUpdate([...stages, newStage]);
      toast({
        title: "Sucesso",
        description: "Novo estágio adicionado com sucesso!",
      });
    }

    setFormData({ name: '', color: colorOptions[0].value });
    setEditingStage(null);
    setOpen(false);
  };

  const handleEdit = (stage: Stage) => {
    setEditingStage(stage);
    setFormData({ name: stage.name, color: stage.color });
    setOpen(true);
  };

  const handleDelete = (stageId: string) => {
    if (stages.length <= 2) {
      toast({
        title: "Erro",
        description: "Você precisa ter pelo menos 2 estágios no pipeline.",
        variant: "destructive",
      });
      return;
    }

    const updatedStages = stages.filter(stage => stage.id !== stageId);
    onStagesUpdate(updatedStages);
    toast({
      title: "Sucesso",
      description: "Estágio removido com sucesso!",
    });
  };

  const handleAddNew = () => {
    setEditingStage(null);
    setFormData({ name: '', color: colorOptions[0].value });
    setOpen(true);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Settings className="h-4 w-4" />
          Gerenciar Pipeline
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-3xl bg-gradient-to-br from-card via-card/95 to-card/90 border border-primary/20">
        <DialogHeader>
          <DialogTitle className="text-xl bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            Gerenciar Pipeline de Vendas
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Current Stages */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Estágios Atuais</h3>
              <Button onClick={handleAddNew} size="sm" className="gap-2">
                <Plus className="h-4 w-4" />
                Adicionar Estágio
              </Button>
            </div>
            
            <div className="grid gap-3">
              {stages.map((stage, index) => (
                <div 
                  key={stage.id} 
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-muted/30 to-muted/10 rounded-lg border border-primary/10"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">#{index + 1}</span>
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: colorOptions.find(c => c.value === stage.color)?.color }}
                      ></div>
                    </div>
                    <span className="font-medium">{stage.name}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(stage)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(stage.id)}
                      disabled={stages.length <= 2}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add/Edit Form */}
          {open && (
            <form onSubmit={handleSubmit} className="space-y-4 border-t pt-4">
              <h3 className="text-lg font-semibold">
                {editingStage ? 'Editar Estágio' : 'Novo Estágio'}
              </h3>
              
              <div className="space-y-2">
                <Label htmlFor="stage-name">Nome do Estágio</Label>
                <Input
                  id="stage-name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ex: Qualificação"
                  required
                  className="bg-background/50 border-primary/20"
                />
              </div>

              <div className="space-y-2">
                <Label>Cor do Estágio</Label>
                <div className="grid grid-cols-4 gap-2">
                  {colorOptions.map((color) => (
                    <button
                      key={color.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, color: color.value })}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        formData.color === color.value 
                          ? 'border-primary shadow-md' 
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: color.color }}
                        ></div>
                        <span className="text-sm">{color.name}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setFormData({ name: '', color: colorOptions[0].value });
                    setEditingStage(null);
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-primary to-primary/90 hover:opacity-90"
                >
                  {editingStage ? 'Atualizar' : 'Adicionar'} Estágio
                </Button>
              </div>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};