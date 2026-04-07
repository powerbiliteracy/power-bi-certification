import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Shield, Users, Settings, Lock, Unlock, Crown, BarChart3 } from "lucide-react";
import { Navigate } from "react-router-dom";

interface SectionRow {
  id: string;
  section_key: string;
  section_label: string;
  required_tier: "explorer" | "pro" | "premium";
  is_locked: boolean;
  admin_only: boolean;
}

interface ProfileRow {
  id: string;
  user_id: string;
  display_name: string | null;
  email: string | null;
  subscription_tier: "explorer" | "pro" | "premium";
  created_at: string;
}

interface RoleRow {
  user_id: string;
  role: "admin" | "moderator" | "user";
}

export default function Admin() {
  const { isAdmin, loading } = useAuth();
  const { toast } = useToast();
  const [sections, setSections] = useState<SectionRow[]>([]);
  const [users, setUsers] = useState<ProfileRow[]>([]);
  const [roles, setRoles] = useState<RoleRow[]>([]);
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    if (isAdmin) {
      fetchSections();
      fetchUsers();
      fetchRoles();
    }
  }, [isAdmin]);

  const fetchSections = async () => {
    const { data } = await supabase.from("section_access").select("*").order("section_label");
    if (data) setSections(data);
  };

  const fetchUsers = async () => {
    const { data } = await supabase.from("profiles").select("*").order("created_at", { ascending: false });
    if (data) setUsers(data);
  };

  const fetchRoles = async () => {
    const { data } = await supabase.from("user_roles").select("user_id, role");
    if (data) setRoles(data);
  };

  const updateSectionTier = async (id: string, tier: "explorer" | "pro" | "premium") => {
    setSaving(id);
    const { error } = await supabase.from("section_access").update({ required_tier: tier }).eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setSections((prev) => prev.map((s) => (s.id === id ? { ...s, required_tier: tier } : s)));
      toast({ title: "Updated", description: "Section tier updated." });
    }
    setSaving(null);
  };

  const toggleSectionLock = async (id: string, locked: boolean) => {
    setSaving(id);
    const { error } = await supabase.from("section_access").update({ is_locked: locked }).eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setSections((prev) => prev.map((s) => (s.id === id ? { ...s, is_locked: locked } : s)));
    }
    setSaving(null);
  };

  const toggleAdminOnly = async (id: string, adminOnly: boolean) => {
    setSaving(id);
    const { error } = await supabase.from("section_access").update({ admin_only: adminOnly } as any).eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setSections((prev) => prev.map((s) => (s.id === id ? { ...s, admin_only: adminOnly } : s)));
      toast({ title: "Updated", description: adminOnly ? "Section set to admin-only." : "Section visible to all." });
    }
    setSaving(null);
  };

  const updateUserTier = async (userId: string, tier: "explorer" | "pro" | "premium") => {
    setSaving(userId);
    const { error } = await supabase.from("profiles").update({ subscription_tier: tier }).eq("user_id", userId);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setUsers((prev) => prev.map((u) => (u.user_id === userId ? { ...u, subscription_tier: tier } : u)));
      toast({ title: "Updated", description: "User tier updated." });
    }
    setSaving(null);
  };

  const toggleAdminRole = async (userId: string, makeAdmin: boolean) => {
    if (makeAdmin) {
      const { error } = await supabase.from("user_roles").insert({ user_id: userId, role: "admin" as const });
      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        setRoles((prev) => [...prev, { user_id: userId, role: "admin" }]);
        toast({ title: "Admin granted" });
      }
    } else {
      const { error } = await supabase.from("user_roles").delete().eq("user_id", userId).eq("role", "admin");
      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        setRoles((prev) => prev.filter((r) => !(r.user_id === userId && r.role === "admin")));
        toast({ title: "Admin revoked" });
      }
    }
  };

  if (loading) return <div className="p-10 text-center text-muted-foreground">Loading...</div>;
  if (!isAdmin) return <Navigate to="/Dashboard" replace />;

  const tierColor = (tier: string) => {
    switch (tier) {
      case "explorer": return "secondary";
      case "pro": return "default";
      case "premium": return "destructive";
      default: return "secondary";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
          <Shield className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Admin Panel</h1>
          <p className="text-sm text-muted-foreground">Manage sections, users, and platform settings</p>
        </div>
      </div>

      <Tabs defaultValue="sections">
        <TabsList>
          <TabsTrigger value="sections" className="gap-2"><Settings className="w-4 h-4" /> Section Gating</TabsTrigger>
          <TabsTrigger value="users" className="gap-2"><Users className="w-4 h-4" /> Users</TabsTrigger>
          <TabsTrigger value="analytics" className="gap-2"><BarChart3 className="w-4 h-4" /> Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="sections" className="mt-6 space-y-6">
          {/* Top-level sections */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Settings className="w-5 h-5" /> Page Access Control</CardTitle>
              <CardDescription>Set which subscription tier is required for each page, or lock pages entirely.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Section</TableHead>
                    <TableHead>Required Tier</TableHead>
                    <TableHead>Admin Only</TableHead>
                    <TableHead>Locked</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sections.filter(s => !s.section_key.includes(".")).map((section) => (
                    <TableRow key={section.id}>
                      <TableCell className="font-medium">{section.section_label}</TableCell>
                      <TableCell>
                        <Select
                          value={section.required_tier}
                          onValueChange={(val) => updateSectionTier(section.id, val as "explorer" | "pro" | "premium")}
                          disabled={saving === section.id}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="explorer">Explorer</SelectItem>
                            <SelectItem value="pro">Pro</SelectItem>
                            <SelectItem value="premium">Premium</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Switch
                          checked={section.admin_only}
                          onCheckedChange={(checked) => toggleAdminOnly(section.id, checked)}
                          disabled={saving === section.id}
                        />
                      </TableCell>
                      <TableCell>
                        <Switch
                          checked={section.is_locked}
                          onCheckedChange={(checked) => toggleSectionLock(section.id, checked)}
                          disabled={saving === section.id}
                        />
                      </TableCell>
                      <TableCell>
                        {section.admin_only ? (
                          <Badge variant="destructive" className="gap-1"><Shield className="w-3 h-3" /> Admin Only</Badge>
                        ) : section.is_locked ? (
                          <Badge variant="destructive" className="gap-1"><Lock className="w-3 h-3" /> Locked</Badge>
                        ) : (
                          <Badge variant={tierColor(section.required_tier) as any} className="gap-1">
                            <Unlock className="w-3 h-3" /> {section.required_tier}
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Domain sub-sections grouped by parent */}
          {(() => {
            const subSections = sections.filter(s => s.section_key.includes("."));
            const groups: Record<string, SectionRow[]> = {};
            subSections.forEach(s => {
              const parent = s.section_key.split(".")[0];
              if (!groups[parent]) groups[parent] = [];
              groups[parent].push(s);
            });
            const parentLabels: Record<string, string> = {
              syllabus: "Exam Syllabus — Domain Access",
              assessment: "Topic Assessments — Domain Access",
              "exam-scenarios": "Exam Scenarios — Domain Access",
              troubleshooting: "Troubleshooting — Domain Access",
            };
            return Object.entries(groups).map(([parent, subs]) => (
              <Card key={parent}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Lock className="w-4 h-4" /> {parentLabels[parent] || parent}
                  </CardTitle>
                  <CardDescription>Control access to individual domains within this section.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Domain</TableHead>
                        <TableHead>Required Tier</TableHead>
                        <TableHead>Admin Only</TableHead>
                        <TableHead>Locked</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {subs.map((section) => (
                        <TableRow key={section.id}>
                          <TableCell className="font-medium">{section.section_label.split(" → ")[1]}</TableCell>
                          <TableCell>
                            <Select
                              value={section.required_tier}
                              onValueChange={(val) => updateSectionTier(section.id, val as "explorer" | "pro" | "premium")}
                              disabled={saving === section.id}
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="explorer">Explorer</SelectItem>
                                <SelectItem value="pro">Pro</SelectItem>
                                <SelectItem value="premium">Premium</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell>
                            <Switch
                              checked={section.admin_only}
                              onCheckedChange={(checked) => toggleAdminOnly(section.id, checked)}
                              disabled={saving === section.id}
                            />
                          </TableCell>
                          <TableCell>
                            <Switch
                              checked={section.is_locked}
                              onCheckedChange={(checked) => toggleSectionLock(section.id, checked)}
                              disabled={saving === section.id}
                            />
                          </TableCell>
                          <TableCell>
                            {section.admin_only ? (
                              <Badge variant="destructive" className="gap-1"><Shield className="w-3 h-3" /> Admin Only</Badge>
                            ) : section.is_locked ? (
                              <Badge variant="destructive" className="gap-1"><Lock className="w-3 h-3" /> Locked</Badge>
                            ) : (
                              <Badge variant={tierColor(section.required_tier) as any} className="gap-1">
                                <Unlock className="w-3 h-3" /> {section.required_tier}
                              </Badge>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            ));
          })()}
        </TabsContent>

        <TabsContent value="users" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Users className="w-5 h-5" /> User Management</CardTitle>
              <CardDescription>View all users, manage their subscription tiers, and assign admin roles.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Tier</TableHead>
                    <TableHead>Admin</TableHead>
                    <TableHead>Joined</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => {
                    const userIsAdmin = roles.some((r) => r.user_id === user.user_id && r.role === "admin");
                    return (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium flex items-center gap-2">
                          {userIsAdmin && <Crown className="w-4 h-4 text-amber-500" />}
                          {user.display_name || "—"}
                        </TableCell>
                        <TableCell className="text-muted-foreground">{user.email}</TableCell>
                        <TableCell>
                          <Select
                            value={user.subscription_tier}
                            onValueChange={(val) => updateUserTier(user.user_id, val as "explorer" | "pro" | "premium")}
                            disabled={saving === user.user_id}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="explorer">Explorer</SelectItem>
                              <SelectItem value="pro">Pro</SelectItem>
                              <SelectItem value="premium">Premium</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Switch
                            checked={userIsAdmin}
                            onCheckedChange={(checked) => toggleAdminRole(user.user_id, checked)}
                          />
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {new Date(user.created_at).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {users.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-muted-foreground py-8">No users yet</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Total Users</CardDescription>
                <CardTitle className="text-3xl">{users.length}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Pro Users</CardDescription>
                <CardTitle className="text-3xl">{users.filter((u) => u.subscription_tier === "pro").length}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Premium Users</CardDescription>
                <CardTitle className="text-3xl">{users.filter((u) => u.subscription_tier === "premium").length}</CardTitle>
              </CardHeader>
            </Card>
          </div>
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>User Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {["explorer", "pro", "premium"].map((tier) => {
                  const count = users.filter((u) => u.subscription_tier === tier).length;
                  const pct = users.length > 0 ? (count / users.length) * 100 : 0;
                  return (
                    <div key={tier} className="flex items-center gap-3">
                      <span className="w-20 text-sm font-medium capitalize">{tier}</span>
                      <div className="flex-1 h-3 rounded-full bg-secondary overflow-hidden">
                        <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="text-sm text-muted-foreground w-12 text-right">{count}</span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
