
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export interface AdminStats {
  totalUsers: number;
  totalCourses: number;
  totalEnrollments: number;
  totalCategories: number;
  publishedCourses: number;
  pendingCourses: number;
}

export const useAdmin = () => {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user) {
        console.log("🔍 useAdmin - Usuário não logado");
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      console.log("🔍 useAdmin - Verificando status admin para usuário:", user.email);

      try {
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('is_admin')
          .eq('user_id', user.id)
          .single();

        if (error) {
          console.error('❌ useAdmin - Erro ao buscar perfil:', error);
          setIsAdmin(false);
        } else {
          console.log("🔍 useAdmin - Dados do perfil:", profile);
          console.log("🔍 useAdmin - is_admin:", profile?.is_admin);
          setIsAdmin(profile?.is_admin || false);
        }
      } catch (error) {
        console.error('❌ useAdmin - Erro na verificação:', error);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    checkAdminStatus();
  }, [user]);

  // Debug log final
  console.log("🔍 useAdmin - Estado final:", { isAdmin, loading, userEmail: user?.email });

  const getAdminStats = async (): Promise<AdminStats> => {
    const [
      usersResponse,
      coursesResponse,
      enrollmentsResponse,
      categoriesResponse
    ] = await Promise.all([
      supabase.from('profiles').select('id', { count: 'exact' }),
      supabase.from('courses').select('id, is_published', { count: 'exact' }),
      supabase.from('enrollments').select('id', { count: 'exact' }),
      supabase.from('categories').select('id', { count: 'exact' })
    ]);

    const publishedCourses = coursesResponse.data?.filter(course => course.is_published).length || 0;
    const pendingCourses = coursesResponse.data?.filter(course => !course.is_published).length || 0;

    return {
      totalUsers: usersResponse.count || 0,
      totalCourses: coursesResponse.count || 0,
      totalEnrollments: enrollmentsResponse.count || 0,
      totalCategories: categoriesResponse.count || 0,
      publishedCourses,
      pendingCourses
    };
  };

  return { isAdmin, loading, getAdminStats };
};
