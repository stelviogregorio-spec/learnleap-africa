import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { useAdmin, AdminStats } from "@/hooks/useAdmin";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, GraduationCap, FolderOpen, TrendingUp, Clock } from "lucide-react";

const StatCard = ({ title, value, description, icon: Icon, trend }: {
  title: string;
  value: number;
  description: string;
  icon: any;
  trend?: string;
}) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{description}</p>
      {trend && (
        <div className="flex items-center text-xs text-green-600 mt-1">
          <TrendingUp className="h-3 w-3 mr-1" />
          {trend}
        </div>
      )}
    </CardContent>
  </Card>
);

export default function Admin() {
  const { isAdmin, loading, getAdminStats } = useAdmin();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      if (!isAdmin) return;
      
      try {
        const adminStats = await getAdminStats();
        setStats(adminStats);
      } catch (error) {
        console.error('Error loading admin stats:', error);
      } finally {
        setStatsLoading(false);
      }
    };

    loadStats();
  }, [isAdmin, getAdminStats]);

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
              <h1 className="text-3xl font-bold tracking-tight">Dashboard Administrativo</h1>
              <p className="text-muted-foreground">
                Visão geral da plataforma de ensino
              </p>
            </div>
            <SidebarTrigger />
          </div>

          {statsLoading ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {[...Array(6)].map((_, i) => (
                <Card key={i}>
                  <CardHeader className="animate-pulse">
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-4 bg-muted rounded w-1/2"></div>
                  </CardHeader>
                  <CardContent className="animate-pulse">
                    <div className="h-8 bg-muted rounded w-1/3 mb-2"></div>
                    <div className="h-3 bg-muted rounded w-full"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : stats ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <StatCard
                title="Total de Usuários"
                value={stats.totalUsers}
                description="Usuários registrados na plataforma"
                icon={Users}
                trend="+12% este mês"
              />
              <StatCard
                title="Total de Cursos"
                value={stats.totalCourses}
                description="Cursos criados na plataforma"
                icon={BookOpen}
                trend="+5% esta semana"
              />
              <StatCard
                title="Matrículas"
                value={stats.totalEnrollments}
                description="Total de matrículas realizadas"
                icon={GraduationCap}
                trend="+23% este mês"
              />
              <StatCard
                title="Categorias"
                value={stats.totalCategories}
                description="Categorias de cursos disponíveis"
                icon={FolderOpen}
              />
              <StatCard
                title="Cursos Publicados"
                value={stats.publishedCourses}
                description="Cursos aprovados e visíveis"
                icon={TrendingUp}
                trend="85% de aprovação"
              />
              <StatCard
                title="Aguardando Aprovação"
                value={stats.pendingCourses}
                description="Cursos pendentes de revisão"
                icon={Clock}
              />
            </div>
          ) : (
            <div className="text-center text-muted-foreground">
              Erro ao carregar estatísticas
            </div>
          )}

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Ações Rápidas</CardTitle>
                <CardDescription>
                  Acesso rápido às principais funcionalidades
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex flex-col space-y-2">
                  <a 
                    href="/admin/users" 
                    className="text-primary hover:underline"
                  >
                    → Gerenciar Usuários
                  </a>
                  <a 
                    href="/admin/courses" 
                    className="text-primary hover:underline"
                  >
                    → Revisar Cursos
                  </a>
                  <a 
                    href="/admin/categories" 
                    className="text-primary hover:underline"
                  >
                    → Gerenciar Categorias
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Atividade Recente</CardTitle>
                <CardDescription>
                  Últimas atividades na plataforma
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Novo usuário cadastrado</span>
                    <span className="text-muted-foreground">há 2h</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Curso enviado para aprovação</span>
                    <span className="text-muted-foreground">há 4h</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Nova categoria criada</span>
                    <span className="text-muted-foreground">há 1d</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}