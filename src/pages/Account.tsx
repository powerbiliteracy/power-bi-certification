import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { User, Lock, CreditCard, ExternalLink, XCircle } from "lucide-react";

export default function Account() {
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const [_currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [portalLoading, setPortalLoading] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);

  const handleCancelSubscription = async () => {
    if (!confirm("Cancel your subscription? You'll keep access until the end of your current billing period.")) return;
    setCancelLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("cancel-subscription");
      if (error) throw error;
      toast({
        title: "Subscription cancelled",
        description: data?.period_end
          ? `Access continues until ${new Date(data.period_end).toLocaleDateString()}.`
          : "You will retain access until your renewal date.",
      });
    } catch (err: any) {
      toast({ title: "Could not cancel", description: err?.message || "Try again later.", variant: "destructive" });
    } finally {
      setCancelLoading(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast({ title: "Passwords don't match", variant: "destructive" });
      return;
    }
    if (newPassword.length < 6) {
      toast({ title: "Password must be at least 6 characters", variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setLoading(false);
    if (error) {
      toast({ title: "Error updating password", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Password updated successfully" });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  const handleManageBilling = async () => {
    setPortalLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("customer-portal");
      if (error) throw error;
      if (data?.url) {
        window.open(data.url, "_blank");
      } else {
        toast({ title: "No billing account found", description: "You don't have an active subscription yet.", variant: "destructive" });
      }
    } catch (err: any) {
      toast({ title: "Could not open billing portal", description: err?.message || "Please try again later.", variant: "destructive" });
    } finally {
      setPortalLoading(false);
    }
  };

  const tierColors: Record<string, string> = {
    explorer: "bg-emerald-500/10 text-emerald-400 border-emerald-400/30",
    pro: "bg-primary/10 text-primary border-primary/30",
    premium: "bg-amber-500/10 text-amber-400 border-amber-400/30",
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">Account</h1>
        <p className="text-muted-foreground mt-1">Manage your profile, password, and billing</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile" className="gap-2"><User className="w-4 h-4" /> Profile</TabsTrigger>
          <TabsTrigger value="password" className="gap-2"><Lock className="w-4 h-4" /> Password</TabsTrigger>
          <TabsTrigger value="billing" className="gap-2"><CreditCard className="w-4 h-4" /> Billing</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Your account details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                  <p className="text-foreground mt-1">{user?.email || "—"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Display Name</label>
                  <p className="text-foreground mt-1">{profile?.display_name || "—"}</p>
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-muted-foreground">Subscription</label>
                  <Badge variant="outline" className={`capitalize ${tierColors[profile?.subscription_tier || "explorer"]}`}>
                    {profile?.subscription_tier || "explorer"}
                  </Badge>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Name</label>
                  <p className="text-foreground mt-1">
                    {[profile?.first_name, profile?.last_name].filter(Boolean).join(" ") || "—"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Last signed in</label>
                  <p className="text-foreground mt-1">
                    {user?.last_sign_in_at
                      ? new Date(user.last_sign_in_at).toLocaleString()
                      : "—"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Password Tab */}
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>Update your account password</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">New Password</label>
                  <Input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="mt-1"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Confirm New Password</label>
                  <Input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    className="mt-1"
                    required
                  />
                </div>
                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? "Updating…" : "Update Password"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing Tab */}
        <TabsContent value="billing">
          <Card>
            <CardHeader>
              <CardTitle>Billing & Subscription</CardTitle>
              <CardDescription>View your plan and manage payments</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/50">
                <div>
                  <p className="text-sm text-muted-foreground">Current Plan</p>
                  <p className="text-lg font-bold text-foreground capitalize">{profile?.subscription_tier || "Explorer"}</p>
                </div>
                <Badge variant="outline" className={`capitalize ${tierColors[profile?.subscription_tier || "explorer"]}`}>
                  Active
                </Badge>
              </div>

              <Button
                onClick={handleManageBilling}
                disabled={portalLoading}
                variant="outline"
                className="w-full gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                {portalLoading ? "Opening…" : "Manage Billing & Payment History"}
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                View invoices, update payment method, and manage your subscription in the billing portal.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
