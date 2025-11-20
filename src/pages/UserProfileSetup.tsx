import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const UserProfileSetup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [skills, setSkills] = useState<string[]>([]);
  const [currentSkill, setCurrentSkill] = useState("");

  const addSkill = () => {
    if (currentSkill.trim() && !skills.includes(currentSkill.trim())) {
      setSkills([...skills, currentSkill.trim()]);
      setCurrentSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter(s => s !== skill));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile Complete!",
      description: "Finding personalized opportunities...",
    });
    setTimeout(() => navigate("/user-dashboard"), 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 p-4">
      <div className="container mx-auto max-w-3xl py-12 animate-fade-in">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Complete Your Profile</h1>
          <p className="text-muted-foreground">Help us find the perfect opportunities for you</p>
        </div>

        <Card className="glass-card p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" required className="mt-1" />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" required className="mt-1" />
              </div>
            </div>

            <div>
              <Label htmlFor="experience">Years of Experience</Label>
              <Input id="experience" type="number" min="0" className="mt-1" />
            </div>

            <div>
              <Label htmlFor="skills">Skills</Label>
              <div className="flex gap-2 mt-1">
                <Input
                  id="skills"
                  value={currentSkill}
                  onChange={(e) => setCurrentSkill(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                  placeholder="e.g., JavaScript, Marketing, Design"
                />
                <Button type="button" onClick={addSkill} variant="outline">
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="gap-1">
                    {skill}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => removeSkill(skill)}
                    />
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="interests">Career Interests</Label>
              <Textarea 
                id="interests" 
                rows={3} 
                className="mt-1"
                placeholder="What type of work are you looking for?"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="minSalary">Expected Minimum Salary</Label>
                <Input 
                  id="minSalary" 
                  type="number" 
                  placeholder="₹25,000"
                  className="mt-1" 
                />
              </div>
              <div>
                <Label htmlFor="location">Preferred Location</Label>
                <Input 
                  id="location" 
                  placeholder="City or Region"
                  className="mt-1" 
                />
              </div>
            </div>

            <div>
              <Label htmlFor="availability">Availability</Label>
              <Input 
                id="availability" 
                placeholder="e.g., Immediate, 2 weeks notice"
                className="mt-1" 
              />
            </div>

            <Button type="submit" className="w-full" size="lg" variant="secondary">
              Complete Profile & Discover Jobs
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default UserProfileSetup;
