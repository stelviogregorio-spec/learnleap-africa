import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { useAdmin } from "@/hooks/useAdmin";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Shield, User, GraduationCap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UserProfile {
  id: string;
  user_id: string;
  full_name: string;
  is_admin: boolean;
  is_instructor: boolean;
  created_at: string;
}

interface UserRole {
  role: 'admin' | 'instructor' | 'student';
}

export default function AdminUsers() {
  const { isAdmin, loading } = useAdmin();
  const { toast } = useToast();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [userRoles, setUserRoles] = useState<Record<string, UserRole[]>>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [usersLoading, setUsersLoading] = useState(true);

  const loadUsers = async () => {
    try {
      const { data: profiles, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setUsers(profiles || []);

      // Load roles for each user
      const { data: roles, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id, role');

      if (rolesError) throw rolesError;

      const rolesByUser = roles?.reduce((acc, role) => {
        if (!acc[role.user_id]) acc[role.user_id] = [];
        acc[role.user_id].push({ role: role.role });
        return acc;
      }, {} as Record<string, UserRole[]>) || {};

      setUserRoles(rolesByUser);
    } catch (error) {
      console.error('Error loading users:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os usuários",
        variant: "destructive",
      });
    } finally {
      setUsersLoading(false);
    }
  };

  const toggleRole = async (userId: string, role: 'admin' | 'instructor') => {
    try {
      const currentRoles = userRoles[userId] || [];
      const hasRole = currentRoles.some(r => r.role === role);

      if (hasRole) {
        // Remove role
        const { error } = await supabase
          .from('user_roles')
          .delete()
          .eq('user_id', userId)
          .eq('role', role);

        if (error) throw error;

        // Update is_admin in profiles if removing admin role
        if (role === 'admin') {
          const { error: profileError } = await supabase
            .from('profiles')
            .update({ is_admin: false })
            .eq('user_id', userId);

          if (profileError) throw profileError;
        }

        // Update is_instructor in profiles if removing instructor role
        if (role === 'instructor') {
          const { error: profileError } = await supabase
            .from('profiles')
            .update({ is_instructor: false })
            .eq('user_id', userId);

          if (profileError) throw profileError;
        }
      } else {
        // Add role
        const { error } = await supabase
          .from('user_roles')
          .insert({ user_id: userId, role });

        if (error) throw error;

        // Update is_admin in profiles if adding admin role
        if (role === 'admin') {
          const { error: profileError } = await supabase
            .from('profiles')
            .update({ is_admin: true })
            .eq('user_id', userId);

          if (profileError) throw profileError;
        }

        // Update is_instructor in profiles if adding instructor role
        if (role === 'instructor') {
          const { error: profileError } = await supabase
            .from('profiles')
            .update({ is_instructor: true })
            .eq('user_id', userId);

          if (profileError) throw profileError;
        }
      }

      toast({
        title: "Sucesso",
        description: `Role ${hasRole ? 'removida' : 'adicionada'} com sucesso`,
      });

      loadUsers(); // Reload users to reflect changes
    } catch (error) {
      console.error('Error toggling role:', error);
      toast({
        title: "Erro",
        description: "Não foi possível alterar o role do usuário",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (isAdmin) {
      loadUsers();
    }
  }, [isAdmin]);

  const filteredUsers = users.filter(user =>
    user.full_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <SidebarProvider defaultOpen>
      <div className="min-h-screen flex w-full">
        <AdminSidebar />
        
        <main className="flex-1 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Gerenciar Usuários</h1>
              <p className="text-muted-foreground">
                Visualize e gerencie todos os usuários da plataforma
              </p>
            </div>
            <SidebarTrigger />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Usuários Registrados</CardTitle>
              <div className="flex items-center space-x-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nome..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-sm"
                />
              </div>
            </CardHeader>
            <CardContent>
              {usersLoading ? (
                <div className="flex justify-center p-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Roles</TableHead>
                      <TableHead>Data de Cadastro</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => {
                      const roles = userRoles[user.user_id] || [];
                      const isUserAdmin = roles.some(r => r.role === 'admin');
                      const isUserInstructor = roles.some(r => r.role === 'instructor');
                      
                      return (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">
                            {user.full_name || 'Nome não informado'}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              {isUserAdmin && (
                                <Badge variant="destructive">
                                  <Shield className="h-3 w-3 mr-1" />
                                  Admin
                                </Badge>
                              )}
                              {isUserInstructor && (
                                <Badge variant="secondary">
                                  <GraduationCap className="h-3 w-3 mr-1" />
                                  Instrutor
                                </Badge>
                              )}
                              {!isUserAdmin && !isUserInstructor && (
                                <Badge variant="outline">
                                  <User className="h-3 w-3 mr-1" />
                                  Estudante
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            {new Date(user.created_at).toLocaleDateString('pt-BR')}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant={isUserAdmin ? "destructive" : "outline"}
                                onClick={() => toggleRole(user.user_id, 'admin')}
                              >
                                {isUserAdmin ? 'Remover Admin' : 'Tornar Admin'}
                              </Button>
                              <Button
                                size="sm"
                                variant={isUserInstructor ? "secondary" : "outline"}
                                onClick={() => toggleRole(user.user_id, 'instructor')}
                              >
                                {isUserInstructor ? 'Remover Instrutor' : 'Tornar Instrutor'}
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </SidebarProvider>
  );
}