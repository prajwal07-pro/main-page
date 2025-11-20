import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import companyIllustration from "@/assets/company-illustration.jpg";

const CompanyLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo login
    if (email && password) {
      toast({
        title: "Login Successful",
        description: "Redirecting to registration...",
      });
      setTimeout(() => navigate("/company-register"), 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 grid lg:grid-cols-2">
      {/* Left Side - Image */}
      <div className="hidden lg:flex items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10" />
        <div className="relative z-10 animate-fade-in">
          <img 
            src={companyIllustration} 
            alt="Professional team collaboration" 
            className="rounded-2xl shadow-hover w-full max-w-lg"
          />
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-full blur-3xl animate-pulse" />
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex items-center justify-center p-4">
        <div className="w-full max-w-md animate-fade-in">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="mb-6 hover:scale-105 transition-smooth"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>

          <Card className="glass-card p-8 hover:shadow-hover transition-smooth">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
                <Building2 className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Company Login</h1>
              <p className="text-muted-foreground">Access your employer dashboard</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="email">Company Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="company@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 transition-smooth focus:scale-[1.02]"
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1 transition-smooth focus:scale-[1.02]"
                />
              </div>

              <Button type="submit" className="w-full hover:scale-105 transition-smooth" size="lg">
                Sign In
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              New company? <span className="text-primary font-medium cursor-pointer hover:underline">Register here</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CompanyLogin;
