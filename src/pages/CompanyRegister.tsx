import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Camera, CheckCircle2, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const CompanyRegister = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [faceVerified, setFaceVerified] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const handleFaceVerification = () => {
    setVerifying(true);
    // Simulate face verification
    setTimeout(() => {
      setVerifying(false);
      setFaceVerified(true);
      toast({
        title: "Verification Successful",
        description: "Your identity has been verified",
      });
      setTimeout(() => setStep(2), 1500);
    }, 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Registration Complete",
      description: "Welcome to your dashboard",
    });
    setTimeout(() => navigate("/company-dashboard"), 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 p-4">
      <div className="container mx-auto max-w-2xl py-12 animate-fade-in">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">Company Registration</h1>
            <div className="trust-badge">
              Step {step} of 2
            </div>
          </div>
          <div className="h-2 bg-muted rounded-full">
            <div 
              className="h-full bg-primary rounded-full transition-smooth"
              style={{ width: `${(step / 2) * 100}%` }}
            />
          </div>
        </div>

        {step === 1 ? (
          <Card className="glass-card p-8">
            <div className="text-center">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
                {faceVerified ? (
                  <CheckCircle2 className="h-12 w-12 text-primary" />
                ) : (
                  <Camera className="h-12 w-12 text-primary" />
                )}
              </div>
              <h2 className="text-2xl font-bold mb-4">
                {faceVerified ? "Verified!" : "Identity Verification"}
              </h2>
              <p className="text-muted-foreground mb-8">
                {faceVerified 
                  ? "Your identity has been successfully verified. Proceeding to registration..."
                  : "For security and trust, we need to verify your identity using face authentication"
                }
              </p>
              
              {!faceVerified && (
                <Button 
                  size="lg" 
                  onClick={handleFaceVerification}
                  disabled={verifying}
                  className="min-w-[200px]"
                >
                  {verifying ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      <Camera className="mr-2 h-4 w-4" />
                      Start Verification
                    </>
                  )}
                </Button>
              )}
            </div>
          </Card>
        ) : (
          <Card className="glass-card p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input id="companyName" required className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="industry">Industry</Label>
                  <Input id="industry" required className="mt-1" />
                </div>
              </div>

              <div>
                <Label htmlFor="website">Website</Label>
                <Input id="website" type="url" className="mt-1" />
              </div>

              <div>
                <Label htmlFor="description">Company Description</Label>
                <Textarea 
                  id="description" 
                  rows={4} 
                  className="mt-1"
                  placeholder="Tell us about your company..."
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input id="city" required className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="size">Company Size</Label>
                  <Input id="size" placeholder="e.g., 50-100 employees" className="mt-1" />
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg">
                Complete Registration
              </Button>
            </form>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CompanyRegister;
