import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Mail, 
  Calendar, 
  Save, 
  Upload, 
  Eye, 
  EyeOff,
  Shield,
  Award,
  BookOpen,
  Clock
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

interface Profile {
  id: string;
  user_id: string;
  full_name: string;
  avatar_url: string;
  bio: string;
  is_instructor: boolean;
  is_admin: boolean;
  created_at: string;
  updated_at: string;
}

const Profile = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [formData, setFormData] = useState({
    full_name: "",
    bio: "",
    email: "",
    current_password: "",
    new_password: "",
    confirm_password: ""
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  useEffect(() => {
    if (user) {
      fetchProfile();
    } else {
      navigate("/auth");
    }
  }, [user, navigate]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setProfile(data);
        setFormData(prev => ({
          ...prev,
          full_name: data.full_name || "",
          bio: data.bio || "",
          email: user?.email || ""
        }));
      } else {
        // Create profile if it doesn't exist
        const { data: newProfile, error: createError } = await supabase
          .from('profiles')
          .insert({
            user_id: user?.id,
            full_name: "",
            bio: ""
          })
          .select()
          .single();

        if (createError) throw createError;
        setProfile(newProfile);
        setFormData(prev => ({
          ...prev,
          email: user?.email || ""
        }));
      }
    } catch (error: any) {
      toast({
        title: "Erro",
        description: "Não foi possível carregar o perfil",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: formData.full_name,
          bio: formData.bio,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user?.id);

      if (error) throw error;

      toast({
        title: "Perfil atualizado!",
        description: "Suas informações foram salvas com sucesso.",
      });

      // Refresh profile data
      fetchProfile();
    } catch (error: any) {
      toast({
        title: "Erro ao salvar",
        description: error.message || "Tente novamente",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async () => {
    if (!formData.current_password || !formData.new_password) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha a senha atual e a nova senha",
        variant: "destructive",
      });
      return;
    }

    if (formData.new_password !== formData.confirm_password) {
      toast({
        title: "Senhas não coincidem",
        description: "A nova senha e a confirmação devem ser iguais",
        variant: "destructive",
      });
      return;
    }

    if (formData.new_password.length < 6) {
      toast({
        title: "Senha muito curta",
        description: "A nova senha deve ter pelo menos 6 caracteres",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: formData.new_password
      });

      if (error) throw error;

      toast({
        title: "Senha atualizada!",
        description: "Sua senha foi alterada com sucesso.",
      });

      setFormData(prev => ({
        ...prev,
        current_password: "",
        new_password: "",
        confirm_password: ""
      }));
    } catch (error: any) {
      toast({
        title: "Erro ao alterar senha",
        description: error.message || "Tente novamente",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      toast({
        title: "Erro ao sair",
        description: "Tente novamente",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Carregando perfil...</div>
        </div>
        <Footer />
      </div>
    );
  }

  const getUserInitials = () => {
    if (profile?.full_name) {
      return profile.full_name.split(' ').map(n => n[0]).join('').toUpperCase();
    }
    return user?.email?.charAt(0).toUpperCase() || 'U';
  };

  const getMemberSince = () => {
    const date = profile?.created_at ? new Date(profile.created_at) : new Date();
    return date.toLocaleDateString('pt-BR', { 
      year: 'numeric', 
      month: 'long' 
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Meu Perfil
            </h1>
            <p className="text-muted-foreground">
              Gerencie suas informações pessoais e configurações
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Summary */}
            <Card className="lg:col-span-1">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <Avatar className="h-24 w-24 mx-auto">
                    <AvatarImage src={profile?.avatar_url} />
                    <AvatarFallback className="text-lg">
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <h3 className="text-xl font-semibold">
                      {profile?.full_name || "Nome não informado"}
                    </h3>
                    <p className="text-muted-foreground">{user?.email}</p>
                  </div>

                  <div className="flex flex-wrap gap-2 justify-center">
                    {profile?.is_admin && (
                      <Badge variant="destructive">
                        <Shield className="w-3 h-3 mr-1" />
                        Administrador
                      </Badge>
                    )}
                    {profile?.is_instructor && (
                      <Badge variant="secondary">
                        <Award className="w-3 h-3 mr-1" />
                        Instrutor
                      </Badge>
                    )}
                    <Badge variant="outline">
                      <User className="w-3 h-3 mr-1" />
                      Estudante
                    </Badge>
                  </div>

                  <div className="text-sm text-muted-foreground">
                    <div className="flex items-center justify-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Membro desde {getMemberSince()}
                    </div>
                  </div>

                  <Button variant="outline" className="w-full">
                    <Upload className="w-4 h-4 mr-2" />
                    Alterar Foto
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="general" className="space-y-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="general">Geral</TabsTrigger>
                  <TabsTrigger value="security">Segurança</TabsTrigger>
                  <TabsTrigger value="preferences">Preferências</TabsTrigger>
                </TabsList>

                <TabsContent value="general" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Informações Pessoais</CardTitle>
                      <CardDescription>
                        Atualize suas informações básicas
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="full_name">Nome Completo</Label>
                        <Input
                          id="full_name"
                          value={formData.full_name}
                          onChange={(e) => handleInputChange("full_name", e.target.value)}
                          placeholder="Seu nome completo"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          disabled
                          className="bg-muted"
                        />
                        <p className="text-xs text-muted-foreground">
                          Para alterar o email, entre em contato com o suporte
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bio">Biografia</Label>
                        <Textarea
                          id="bio"
                          value={formData.bio}
                          onChange={(e) => handleInputChange("bio", e.target.value)}
                          placeholder="Conte um pouco sobre você..."
                          rows={4}
                          maxLength={500}
                        />
                        <p className="text-xs text-muted-foreground">
                          {formData.bio.length}/500 caracteres
                        </p>
                      </div>

                      <Button onClick={handleSaveProfile} disabled={saving}>
                        <Save className="w-4 h-4 mr-2" />
                        {saving ? "Salvando..." : "Salvar Alterações"}
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="security" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Alterar Senha</CardTitle>
                      <CardDescription>
                        Mantenha sua conta segura com uma senha forte
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="current_password">Senha Atual</Label>
                        <div className="relative">
                          <Input
                            id="current_password"
                            type={showPasswords.current ? "text" : "password"}
                            value={formData.current_password}
                            onChange={(e) => handleInputChange("current_password", e.target.value)}
                            placeholder="Digite sua senha atual"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3"
                            onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                          >
                            {showPasswords.current ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="new_password">Nova Senha</Label>
                        <div className="relative">
                          <Input
                            id="new_password"
                            type={showPasswords.new ? "text" : "password"}
                            value={formData.new_password}
                            onChange={(e) => handleInputChange("new_password", e.target.value)}
                            placeholder="Digite sua nova senha"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3"
                            onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                          >
                            {showPasswords.new ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirm_password">Confirmar Nova Senha</Label>
                        <div className="relative">
                          <Input
                            id="confirm_password"
                            type={showPasswords.confirm ? "text" : "password"}
                            value={formData.confirm_password}
                            onChange={(e) => handleInputChange("confirm_password", e.target.value)}
                            placeholder="Confirme sua nova senha"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3"
                            onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                          >
                            {showPasswords.confirm ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>

                      <Button onClick={handleChangePassword} disabled={saving}>
                        <Save className="w-4 h-4 mr-2" />
                        {saving ? "Alterando..." : "Alterar Senha"}
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-destructive">Zona de Perigo</CardTitle>
                      <CardDescription>
                        Ações irreversíveis relacionadas à sua conta
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="destructive" onClick={handleSignOut}>
                        Sair da Conta
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="preferences" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Preferências de Aprendizagem</CardTitle>
                      <CardDescription>
                        Personalize sua experiência na plataforma
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Notificações por Email</p>
                            <p className="text-sm text-muted-foreground">
                              Receba atualizações sobre seus cursos
                            </p>
                          </div>
                          <Button variant="outline" size="sm">
                            Configurar
                          </Button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Idioma da Interface</p>
                            <p className="text-sm text-muted-foreground">
                              Português (Angola)
                            </p>
                          </div>
                          <Button variant="outline" size="sm">
                            Alterar
                          </Button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Fuso Horário</p>
                            <p className="text-sm text-muted-foreground">
                              GMT+1 (Luanda)
                            </p>
                          </div>
                          <Button variant="outline" size="sm">
                            Alterar
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;