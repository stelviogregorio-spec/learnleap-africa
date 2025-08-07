import { BookOpen, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold">EduFlow</h3>
                <p className="text-xs text-primary-foreground/80">Learn, Grow, Succeed</p>
              </div>
            </div>
            <p className="text-sm text-primary-foreground/80 max-w-sm">
              Empowering creators, entrepreneurs, and students across Portuguese-speaking African countries with world-class digital education.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-white/10">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-white/10">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-white/10">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-white/10">
                <Linkedin className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/courses" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Browse Courses</a></li>
              <li><a href="/become-instructor" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Become Instructor</a></li>
              <li><a href="/student-dashboard" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Student Dashboard</a></li>
              <li><a href="/instructor-dashboard" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Instructor Dashboard</a></li>
              <li><a href="/certificates" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Certificates</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/help" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Help Center</a></li>
              <li><a href="/contact" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Contact Us</a></li>
              <li><a href="/faq" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">FAQ</a></li>
              <li><a href="/privacy" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Stay Updated</h4>
            <p className="text-sm text-primary-foreground/80">
              Get the latest courses, tips, and updates delivered to your inbox.
            </p>
            <div className="space-y-2">
              <Input
                placeholder="Enter your email"
                className="bg-white/10 border-white/20 text-primary-foreground placeholder:text-primary-foreground/60"
              />
              <Button className="w-full bg-white text-primary hover:bg-white/90">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-white/10 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-primary-foreground/60" />
              <span className="text-primary-foreground/80">support@eduflow.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-primary-foreground/60" />
              <span className="text-primary-foreground/80">+244 123 456 789</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-primary-foreground/60" />
              <span className="text-primary-foreground/80">Luanda, Angola</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-primary-foreground/60">
            © 2024 EduFlow. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 text-sm text-primary-foreground/60">
            <span>Available in:</span>
            <button className="hover:text-primary-foreground transition-colors">English</button>
            <span>|</span>
            <button className="hover:text-primary-foreground transition-colors">Português</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;