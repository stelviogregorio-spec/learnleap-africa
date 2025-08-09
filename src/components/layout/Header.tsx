import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, BookOpen, User, ShoppingCart, Search, LogOut, Shield } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const { user, signOut, loading } = useAuth();

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user) {
        setIsAdmin(false);
        return;
      }

      try {
        const { data: profile } = await supabase
          .from('profiles')
          .select('is_admin')
          .eq('user_id', user.id)
          .single();

        setIsAdmin(profile?.is_admin || false);
      } catch (error) {
        console.error('Error checking admin status:', error);
        setIsAdmin(false);
      }
    };

    checkAdminStatus();
  }, [user]);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-hero">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-foreground">EduFlow</h1>
              <p className="text-xs text-muted-foreground">Learn, Grow, Succeed</p>
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search courses..."
                className="pl-10 bg-secondary/50 border-0 focus:bg-background transition-colors"
              />
            </div>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden lg:flex items-center space-x-6">
            <a href="/" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Home
            </a>
            <a href="/courses" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Courses
            </a>
            <a href="/become-instructor" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Teach
            </a>
            <a href="/about" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              About
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="hidden md:flex">
              <ShoppingCart className="h-4 w-4" />
            </Button>
            
            {!loading && (
              <>
                {user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="hidden md:flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs">
                            {user.email?.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{user.email?.split('@')[0]}</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {isAdmin && (
                        <DropdownMenuItem asChild>
                          <Link to="/admin">
                            <Shield className="h-4 w-4 mr-2" />
                            Administração
                          </Link>
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem onClick={signOut}>
                        <LogOut className="h-4 w-4 mr-2" />
                        Sair
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <div className="hidden md:flex items-center space-x-2">
                    <Button variant="ghost" size="sm" asChild>
                      <Link to="/auth">Entrar</Link>
                    </Button>
                    <Button size="sm" className="bg-gradient-button shadow-button" asChild>
                      <Link to="/auth">Cadastrar</Link>
                    </Button>
                  </div>
                )}
              </>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t bg-background">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* Search Bar - Mobile */}
              <div className="px-3 py-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search courses..."
                    className="pl-10 bg-secondary/50 border-0"
                  />
                </div>
              </div>
              
              <a href="/" className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-secondary/50 rounded-md">
                Home
              </a>
              <a href="/courses" className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-secondary/50 rounded-md">
                Courses
              </a>
              <a href="/become-instructor" className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-secondary/50 rounded-md">
                Teach
              </a>
              <a href="/about" className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-secondary/50 rounded-md">
                About
              </a>
              
              <div className="px-3 py-2 space-y-2">
                <Button variant="ghost" className="w-full justify-start">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Cart
                </Button>
                {!loading && (
                  <>
                    {user ? (
                      <>
                        {isAdmin && (
                          <Button variant="ghost" className="w-full justify-start" asChild>
                            <Link to="/admin">
                              <Shield className="h-4 w-4 mr-2" />
                              Administração
                            </Link>
                          </Button>
                        )}
                        <Button 
                          variant="ghost" 
                          className="w-full justify-start" 
                          onClick={signOut}
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          Sair
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button variant="ghost" className="w-full justify-start" asChild>
                          <Link to="/auth">Entrar</Link>
                        </Button>
                        <Button className="w-full bg-gradient-button" asChild>
                          <Link to="/auth">Cadastrar</Link>
                        </Button>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;