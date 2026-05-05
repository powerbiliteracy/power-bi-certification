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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Shield, Users, Settings, Lock, Unlock, Crown, BarChart3, Eye, EyeOff, UserPlus, Tag, Megaphone, AlertTriangle, Pause, XCircle, Flag, Star, MessageSquare, CheckCircle2, FileSearch, GitCompare, FileImage } from "lucide-react";
import { Navigate, Link } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import SortableSectionsTable from "@/components/SortableSectionsTable";
import ConceptComparisonsAdmin from "@/components/ConceptComparisonsAdmin";
import PageSummariesAdmin from "@/components/PageSummariesAdmin";

interface SectionRow {
  id: string;
  section_key: string;
  section_label: string;
  required_tier: "explorer" | "pro" | "premium";
  is_locked: boolean;
  admin_only: boolean;
  sort_order: number;
}

interface ProfileRow {
  id: string;
  user_id: string;
  display_name: string | null;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  subscription_tier: "explorer" | "pro" | "premium";
  status: string;
  flag_reason: string | null;
  created_at: string;
}

interface RoleRow {
  user_id: string;
  role: "admin" | "moderator" | "user";
}

interface PromoCode {
  id: string;
  code: string;
  discount_percent: number;
  expires_at: string;
  max_uses: number | null;
  times_used: number;
  is_active: boolean;
  created_at: string;
}

interface Announcement {
  id: string;
  title: string;
  message: string;
  type: string;
  is_active: boolean;
  expires_at: string | null;
  created_at: string;
}

export default function Admin() {
  const { isAdmin, loading, user, viewingAsUser, setViewingAsUser, simulatedTier, setSimulatedTier } = useAuth();
  const { toast } = useToast();
  const [sections, setSections] = useState<SectionRow[]>([]);
  const [users, setUsers] = useState<ProfileRow[]>([]);
  const [roles, setRoles] = useState<RoleRow[]>([]);
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [saving, setSaving] = useState<string | null>(null);
  const [studentProgress, setStudentProgress] = useState<Record<string, { type: string; count: number }[]>>({});

  // Invite form
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteFirst, setInviteFirst] = useState("");
  const [inviteLast, setInviteLast] = useState("");
  const [inviteLoading, setInviteLoading] = useState(false);

  // Promo form
  const [promoCode, setPromoCode] = useState("");
  const [promoDiscount, setPromoDiscount] = useState(10);
  const [promoExpiry, setPromoExpiry] = useState(7);
  const [promoMaxUses, setPromoMaxUses] = useState<string>("");

  // Announcement form
  const [annTitle, setAnnTitle] = useState("");
  const [annMessage, setAnnMessage] = useState("");
  const [annType, setAnnType] = useState("info");

  // Flag dialog
  const [flagUserId, setFlagUserId] = useState<string | null>(null);
  const [flagReason, setFlagReason] = useState("");

  // Reviews moderation
  const [pendingReviews, setPendingReviews] = useState<any[]>([]);

  const fetchReviews = async () => {
    const { data } = await supabase.from("reviews").select("*").order("created_at", { ascending: false });
    if (data) setPendingReviews(data);
  };

  const toggleReviewApproval = async (id: string, approved: boolean) => {
    const { error } = await supabase.from("reviews").update({ is_approved: approved }).eq("id", id);
    if (!error) {
      setPendingReviews((prev) => prev.map((r) => (r.id === id ? { ...r, is_approved: approved } : r)));
      toast({ title: approved ? "Review approved" : "Review hidden" });
    }
  };

  // We need the real admin status (not the viewingAsUser override)
  // Since viewingAsUser makes isAdmin false, we check if the user has admin role directly
  const realIsAdmin = !loading && (isAdmin || viewingAsUser);

  useEffect(() => {
    if (realIsAdmin) {
      fetchSections();
      fetchUsers();
      fetchRoles();
      fetchPromoCodes();
      fetchAnnouncements();
      fetchStudentProgress();
      fetchReviews();
    }
  }, [realIsAdmin]);

  const fetchSections = async () => {
    const { data } = await supabase.from("section_access").select("*").order("sort_order");
    if (data) setSections(data as SectionRow[]);
  };

  const fetchUsers = async () => {
    const { data } = await supabase.from("profiles").select("*").order("created_at", { ascending: false });
    if (data) setUsers(data as ProfileRow[]);
  };

  const fetchRoles = async () => {
    const { data } = await supabase.from("user_roles").select("user_id, role");
    if (data) setRoles(data);
  };

  const fetchPromoCodes = async () => {
    const { data } = await supabase.from("promo_codes").select("*").order("created_at", { ascending: false });
    if (data) setPromoCodes(data as PromoCode[]);
  };

  const fetchAnnouncements = async () => {
    const { data } = await supabase.from("announcements").select("*").order("created_at", { ascending: false });
    if (data) setAnnouncements(data as Announcement[]);
  };

  const fetchStudentProgress = async () => {
    const { data } = await supabase.from("user_progress").select("user_id, item_type, item_id") as { data: { user_id: string; item_type: string; item_id: string }[] | null };
    if (!data) return;
    const grouped: Record<string, { type: string; count: number }[]> = {};
    const counts: Record<string, Record<string, number>> = {};
    data.forEach((row) => {
      if (!counts[row.user_id]) counts[row.user_id] = {};
      counts[row.user_id][row.item_type] = (counts[row.user_id][row.item_type] || 0) + 1;
    });
    for (const [uid, types] of Object.entries(counts)) {
      grouped[uid] = Object.entries(types).map(([type, count]) => ({ type, count }));
    }
    setStudentProgress(grouped);
  };

  const notifySectionUpdate = () => window.dispatchEvent(new Event("section-access-updated"));

  const updateSectionTier = async (id: string, tier: "explorer" | "pro" | "premium") => {
    setSaving(id);
    const { error } = await supabase.from("section_access").update({ required_tier: tier }).eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setSections((prev) => prev.map((s) => (s.id === id ? { ...s, required_tier: tier } : s)));
      toast({ title: "Updated", description: "Section tier updated." });
      notifySectionUpdate();
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
      notifySectionUpdate();
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
      notifySectionUpdate();
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

  const updateUserStatus = async (userId: string, status: string) => {
    const { error } = await supabase.from("profiles").update({ status } as any).eq("user_id", userId);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setUsers((prev) => prev.map((u) => (u.user_id === userId ? { ...u, status } : u)));
      toast({ title: "Updated", description: `User status set to ${status}.` });
    }
  };

  const flagUser = async () => {
    if (!flagUserId) return;
    const { error } = await supabase.from("profiles").update({ status: "flagged", flag_reason: flagReason } as any).eq("user_id", flagUserId);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setUsers((prev) => prev.map((u) => (u.user_id === flagUserId ? { ...u, status: "flagged", flag_reason: flagReason } : u)));
      toast({ title: "User flagged" });
    }
    setFlagUserId(null);
    setFlagReason("");
  };

  const handleInvite = async () => {
    if (!inviteEmail) return;
    setInviteLoading(true);
    // Generate a random temp password for the invited user
    const tempPassword = crypto.randomUUID().slice(0, 12);
    const { error } = await supabase.auth.signUp({
      email: inviteEmail,
      password: tempPassword,
      options: {
        data: { display_name: `${inviteFirst} ${inviteLast}`.trim(), first_name: inviteFirst, last_name: inviteLast },
        emailRedirectTo: window.location.origin,
      },
    });
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Invite sent!", description: `Confirmation email sent to ${inviteEmail}. They'll need to verify and reset their password.` });
      setInviteEmail("");
      setInviteFirst("");
      setInviteLast("");
      setTimeout(fetchUsers, 2000);
    }
    setInviteLoading(false);
  };

  const createPromoCode = async () => {
    if (!promoCode || !user) return;
    const expiresAt = new Date(Date.now() + promoExpiry * 24 * 60 * 60 * 1000).toISOString();
    const { error } = await supabase.from("promo_codes").insert({
      code: promoCode.toUpperCase(),
      discount_percent: promoDiscount,
      expires_at: expiresAt,
      max_uses: promoMaxUses ? parseInt(promoMaxUses) : null,
      created_by: user.id,
    } as any);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Promo code created!", description: `Code: ${promoCode.toUpperCase()}` });
      setPromoCode("");
      setPromoDiscount(10);
      setPromoExpiry(7);
      setPromoMaxUses("");
      fetchPromoCodes();
    }
  };

  const togglePromoActive = async (id: string, active: boolean) => {
    const { error } = await supabase.from("promo_codes").update({ is_active: active } as any).eq("id", id);
    if (!error) {
      setPromoCodes((prev) => prev.map((p) => (p.id === id ? { ...p, is_active: active } : p)));
    }
  };

  const createAnnouncement = async () => {
    if (!annTitle || !annMessage || !user) return;
    const { error } = await supabase.from("announcements").insert({
      title: annTitle,
      message: annMessage,
      type: annType,
      created_by: user.id,
    } as any);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Announcement posted!" });
      setAnnTitle("");
      setAnnMessage("");
      setAnnType("info");
      fetchAnnouncements();
    }
  };

  const toggleAnnouncementActive = async (id: string, active: boolean) => {
    const { error } = await supabase.from("announcements").update({ is_active: active } as any).eq("id", id);
    if (!error) {
      setAnnouncements((prev) => prev.map((a) => (a.id === id ? { ...a, is_active: active } : a)));
    }
  };

  if (loading) return <div className="p-10 text-center text-muted-foreground">Loading...</div>;
  if (!realIsAdmin) return <Navigate to="/Dashboard" replace />;

  const tierColor = (tier: string) => {
    switch (tier) {
      case "explorer": return "secondary";
      case "pro": return "default";
      case "premium": return "destructive";
      default: return "secondary";
    }
  };

  const statusBadge = (status: string) => {
    switch (status) {
      case "active": return <Badge variant="default" className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">Active</Badge>;
      case "on_hold": return <Badge variant="outline" className="text-amber-400 border-amber-500/30"><Pause className="w-3 h-3 mr-1" />On Hold</Badge>;
      case "cancelled": return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />Cancelled</Badge>;
      case "flagged": return <Badge variant="destructive" className="bg-red-500/20 text-red-400 border-red-500/30"><Flag className="w-3 h-3 mr-1" />Flagged</Badge>;
      default: return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Admin Panel</h1>
            <p className="text-sm text-muted-foreground">Manage sections, users, and platform settings</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline" className="gap-2">
            <Link to="/SyllabusAudit"><FileSearch className="w-4 h-4" /> Syllabus Audit</Link>
          </Button>
          <Button
            variant={viewingAsUser ? "default" : "outline"}
            className="gap-2"
            onClick={() => {
              if (viewingAsUser) {
                setViewingAsUser(false);
                setSimulatedTier(null);
              } else {
                setViewingAsUser(true);
                setSimulatedTier("explorer");
              }
            }}
          >
            {viewingAsUser ? <><EyeOff className="w-4 h-4" /> Exit User View</> : <><Eye className="w-4 h-4" /> Show as User</>}
          </Button>
          {viewingAsUser && (
            <Select value={simulatedTier || "explorer"} onValueChange={(v) => {
              if (v === "admin") {
                setViewingAsUser(false);
                setSimulatedTier(null);
              } else {
                setSimulatedTier(v as "explorer" | "pro" | "premium");
              }
            }}>
              <SelectTrigger className="w-36">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="explorer">Explorer (Free)</SelectItem>
                <SelectItem value="pro">Pro</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>
      </div>

      {viewingAsUser && (
        <Card className="border-amber-500/50 bg-amber-500/5">
          <CardContent className="py-3 flex items-center gap-2 text-amber-400">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-sm font-medium">
              Viewing as <strong className="capitalize">{simulatedTier || "explorer"}</strong> tier user. Navigate to other pages to see their experience. Admin features are hidden.
            </span>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="sections">
        <TabsList className="flex-wrap h-auto gap-1">
          <TabsTrigger value="sections" className="gap-2"><Settings className="w-4 h-4" /> Sections</TabsTrigger>
          <TabsTrigger value="users" className="gap-2"><Users className="w-4 h-4" /> Users</TabsTrigger>
          <TabsTrigger value="promos" className="gap-2"><Tag className="w-4 h-4" /> Promo Codes</TabsTrigger>
          <TabsTrigger value="announcements" className="gap-2"><Megaphone className="w-4 h-4" /> Announcements</TabsTrigger>
          <TabsTrigger value="analytics" className="gap-2"><BarChart3 className="w-4 h-4" /> Analytics</TabsTrigger>
          <TabsTrigger value="reviews" className="gap-2"><MessageSquare className="w-4 h-4" /> Reviews</TabsTrigger>
          <TabsTrigger value="comparisons" className="gap-2"><GitCompare className="w-4 h-4" /> Comparisons</TabsTrigger>
          <TabsTrigger value="summaries" className="gap-2"><FileImage className="w-4 h-4" /> Page Summaries</TabsTrigger>
        </TabsList>

        {/* SECTIONS TAB - same as before */}
        <TabsContent value="sections" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Settings className="w-5 h-5" /> Page Access Control</CardTitle>
              <CardDescription>Drag and drop rows to reorder sections in the navigation. Changes save automatically.</CardDescription>
            </CardHeader>
            <CardContent>
              <SortableSectionsTable
                sections={sections.filter(s => !s.section_key.includes("."))}
                saving={saving}
                onReorder={async (reordered) => {
                  setSections((prev) => {
                    const subSections = prev.filter(s => s.section_key.includes("."));
                    return [...reordered, ...subSections];
                  });
                  // Save all new sort orders
                  for (let i = 0; i < reordered.length; i++) {
                    await supabase.from("section_access").update({ sort_order: i + 1 } as any).eq("id", reordered[i].id);
                  }
                  notifySectionUpdate();
                  toast({ title: "Order updated" });
                }}
                onTierChange={updateSectionTier}
                onAdminOnlyChange={toggleAdminOnly}
                onLockChange={toggleSectionLock}
                tierColor={tierColor}
              />
            </CardContent>
          </Card>

          {(() => {
            const subSections = sections.filter(s => s.section_key.includes("."));
            const groups: Record<string, SectionRow[]> = {};
            subSections.forEach(s => { const p = s.section_key.split(".")[0]; if (!groups[p]) groups[p] = []; groups[p].push(s); });
            const parentLabels: Record<string, string> = { syllabus: "Exam Syllabus — Domain Access", assessment: "Topic Assessments — Domain Access", "exam-scenarios": "Exam Scenarios — Domain Access", troubleshooting: "Troubleshooting — Domain Access" };
            return Object.entries(groups).map(([parent, subs]) => (
              <Card key={parent}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg"><Lock className="w-4 h-4" /> {parentLabels[parent] || parent}</CardTitle>
                  <CardDescription>Control access to individual domains within this section.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader><TableRow><TableHead>Domain</TableHead><TableHead>Required Tier</TableHead><TableHead>Admin Only</TableHead><TableHead>Locked</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
                    <TableBody>
                      {subs.map((section) => (
                        <TableRow key={section.id}>
                          <TableCell className="font-medium">{section.section_label.split(" → ")[1]}</TableCell>
                          <TableCell><Select value={section.required_tier} onValueChange={(val) => updateSectionTier(section.id, val as any)} disabled={saving === section.id}><SelectTrigger className="w-32"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="explorer">Explorer</SelectItem><SelectItem value="pro">Pro</SelectItem><SelectItem value="premium">Premium</SelectItem></SelectContent></Select></TableCell>
                          <TableCell><Switch checked={section.admin_only} onCheckedChange={(c) => toggleAdminOnly(section.id, c)} disabled={saving === section.id} /></TableCell>
                          <TableCell><Switch checked={section.is_locked} onCheckedChange={(c) => toggleSectionLock(section.id, c)} disabled={saving === section.id} /></TableCell>
                          <TableCell>
                            {section.admin_only ? <Badge variant="destructive" className="gap-1"><Shield className="w-3 h-3" /> Admin Only</Badge>
                              : section.is_locked ? <Badge variant="destructive" className="gap-1"><Lock className="w-3 h-3" /> Locked</Badge>
                              : <Badge variant={tierColor(section.required_tier) as any} className="gap-1"><Unlock className="w-3 h-3" /> {section.required_tier}</Badge>}
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

        {/* USERS TAB */}
        <TabsContent value="users" className="mt-6 space-y-4">
          {/* Invite / Add User */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><UserPlus className="w-5 h-5" /> Invite / Add User</CardTitle>
              <CardDescription>Send an invite email or manually add a user to the platform.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-4 gap-3">
                <Input placeholder="First Name" value={inviteFirst} onChange={(e) => setInviteFirst(e.target.value)} />
                <Input placeholder="Last Name" value={inviteLast} onChange={(e) => setInviteLast(e.target.value)} />
                <Input placeholder="Email" type="email" value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)} />
                <Button onClick={handleInvite} disabled={inviteLoading || !inviteEmail} className="gap-2">
                  <UserPlus className="w-4 h-4" /> {inviteLoading ? "Sending..." : "Send Invite"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* User List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Users className="w-5 h-5" /> User Management</CardTitle>
              <CardDescription>Manage tiers, roles, and member status.</CardDescription>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Tier</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                    <TableHead>Joined</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((u) => {
                    const userIsAdmin = roles.some((r) => r.user_id === u.user_id && r.role === "admin");
                    const name = [u.first_name, u.last_name].filter(Boolean).join(" ") || u.display_name || "—";
                    return (
                      <TableRow key={u.id}>
                        <TableCell className="font-medium flex items-center gap-2">
                          {userIsAdmin && <Crown className="w-4 h-4 text-amber-500" />}
                          {name}
                        </TableCell>
                        <TableCell className="text-muted-foreground">{u.email}</TableCell>
                        <TableCell>
                          <Select value={u.subscription_tier} onValueChange={(val) => updateUserTier(u.user_id, val as any)} disabled={saving === u.user_id}>
                            <SelectTrigger className="w-28"><SelectValue /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="explorer">Explorer</SelectItem>
                              <SelectItem value="pro">Pro</SelectItem>
                              <SelectItem value="premium">Premium</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Switch checked={userIsAdmin} onCheckedChange={(c) => toggleAdminRole(u.user_id, c)} />
                        </TableCell>
                        <TableCell>{statusBadge(u.status)}</TableCell>
                        <TableCell>
                          <div className="flex gap-1 flex-wrap">
                            {u.status !== "on_hold" && (
                              <Button size="sm" variant="outline" className="h-7 text-xs gap-1" onClick={() => updateUserStatus(u.user_id, "on_hold")}>
                                <Pause className="w-3 h-3" /> Hold
                              </Button>
                            )}
                            {u.status !== "cancelled" && (
                              <Button size="sm" variant="outline" className="h-7 text-xs gap-1 text-destructive" onClick={() => updateUserStatus(u.user_id, "cancelled")}>
                                <XCircle className="w-3 h-3" /> Cancel
                              </Button>
                            )}
                            {u.status !== "active" && (
                              <Button size="sm" variant="outline" className="h-7 text-xs gap-1 text-emerald-400" onClick={() => updateUserStatus(u.user_id, "active")}>
                                Activate
                              </Button>
                            )}
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button size="sm" variant="outline" className="h-7 text-xs gap-1 text-amber-400" onClick={() => { setFlagUserId(u.user_id); setFlagReason(u.flag_reason || ""); }}>
                                  <Flag className="w-3 h-3" /> Flag
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader><DialogTitle>Flag User: {name}</DialogTitle></DialogHeader>
                                <Textarea placeholder="Reason for flagging..." value={flagReason} onChange={(e) => setFlagReason(e.target.value)} />
                                <DialogFooter>
                                  <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
                                  <DialogClose asChild><Button variant="destructive" onClick={flagUser}>Flag User</Button></DialogClose>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">{new Date(u.created_at).toLocaleDateString()}</TableCell>
                      </TableRow>
                    );
                  })}
                  {users.length === 0 && (
                    <TableRow><TableCell colSpan={7} className="text-center text-muted-foreground py-8">No users yet</TableCell></TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* PROMO CODES TAB */}
        <TabsContent value="promos" className="mt-6 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Tag className="w-5 h-5" /> Create Promo Code</CardTitle>
              <CardDescription>Create a discount code with a 7-day expiry by default.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
                <Input placeholder="CODE" value={promoCode} onChange={(e) => setPromoCode(e.target.value.toUpperCase())} />
                <div>
                  <label className="text-xs text-muted-foreground">Discount %</label>
                  <Input type="number" min={1} max={100} value={promoDiscount} onChange={(e) => setPromoDiscount(Number(e.target.value))} />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Expiry (days)</label>
                  <Input type="number" min={1} value={promoExpiry} onChange={(e) => setPromoExpiry(Number(e.target.value))} />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Max Uses (blank = unlimited)</label>
                  <Input type="number" min={1} value={promoMaxUses} onChange={(e) => setPromoMaxUses(e.target.value)} />
                </div>
                <Button onClick={createPromoCode} disabled={!promoCode} className="self-end gap-2">
                  <Tag className="w-4 h-4" /> Create Code
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Active Promo Codes</CardTitle></CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Code</TableHead>
                    <TableHead>Discount</TableHead>
                    <TableHead>Expires</TableHead>
                    <TableHead>Uses</TableHead>
                    <TableHead>Active</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {promoCodes.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell className="font-mono font-bold">{p.code}</TableCell>
                      <TableCell>{p.discount_percent}%</TableCell>
                      <TableCell className={new Date(p.expires_at) < new Date() ? "text-destructive" : ""}>
                        {new Date(p.expires_at).toLocaleDateString()} {new Date(p.expires_at) < new Date() && "(Expired)"}
                      </TableCell>
                      <TableCell>{p.times_used}{p.max_uses ? `/${p.max_uses}` : ""}</TableCell>
                      <TableCell><Switch checked={p.is_active} onCheckedChange={(c) => togglePromoActive(p.id, c)} /></TableCell>
                    </TableRow>
                  ))}
                  {promoCodes.length === 0 && (
                    <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-8">No promo codes yet</TableCell></TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ANNOUNCEMENTS TAB */}
        <TabsContent value="announcements" className="mt-6 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Megaphone className="w-5 h-5" /> Post Announcement</CardTitle>
              <CardDescription>Post a message that all users will see on their Dashboard.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Input placeholder="Title" value={annTitle} onChange={(e) => setAnnTitle(e.target.value)} />
              <Textarea placeholder="Message content..." value={annMessage} onChange={(e) => setAnnMessage(e.target.value)} />
              <div className="flex gap-3 items-end">
                <div>
                  <label className="text-xs text-muted-foreground">Type</label>
                  <Select value={annType} onValueChange={setAnnType}>
                    <SelectTrigger className="w-36"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="info">ℹ️ Info</SelectItem>
                      <SelectItem value="promo">🎉 Promo</SelectItem>
                      <SelectItem value="warning">⚠️ Warning</SelectItem>
                      <SelectItem value="update">🚀 Update</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={createAnnouncement} disabled={!annTitle || !annMessage} className="gap-2">
                  <Megaphone className="w-4 h-4" /> Post
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>All Announcements</CardTitle></CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Active</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {announcements.map((a) => (
                    <TableRow key={a.id}>
                      <TableCell className="font-medium">{a.title}</TableCell>
                      <TableCell className="max-w-xs truncate text-muted-foreground">{a.message}</TableCell>
                      <TableCell><Badge variant="outline" className="capitalize">{a.type}</Badge></TableCell>
                      <TableCell className="text-sm text-muted-foreground">{new Date(a.created_at).toLocaleDateString()}</TableCell>
                      <TableCell><Switch checked={a.is_active} onCheckedChange={(c) => toggleAnnouncementActive(a.id, c)} /></TableCell>
                    </TableRow>
                  ))}
                  {announcements.length === 0 && (
                    <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-8">No announcements yet</TableCell></TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ANALYTICS TAB */}
        <TabsContent value="analytics" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card><CardHeader className="pb-2"><CardDescription>Total Users</CardDescription><CardTitle className="text-3xl">{users.length}</CardTitle></CardHeader></Card>
            <Card><CardHeader className="pb-2"><CardDescription>Pro Users</CardDescription><CardTitle className="text-3xl">{users.filter((u) => u.subscription_tier === "pro").length}</CardTitle></CardHeader></Card>
            <Card><CardHeader className="pb-2"><CardDescription>Premium Users</CardDescription><CardTitle className="text-3xl">{users.filter((u) => u.subscription_tier === "premium").length}</CardTitle></CardHeader></Card>
          </div>
          <Card className="mt-4">
            <CardHeader><CardTitle>User Distribution</CardTitle></CardHeader>
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

          {/* Student Progress */}
          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><BarChart3 className="w-5 h-5" /> Student Progress</CardTitle>
              <CardDescription>Completion data synced from student activity</CardDescription>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Syllabus Topics</TableHead>
                    <TableHead>Scenarios</TableHead>
                    <TableHead>Practice Sets</TableHead>
                    <TableHead>Troubleshooting</TableHead>
                    <TableHead>Total Items</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((u) => {
                    const progress = studentProgress[u.user_id] || [];
                    const getCount = (type: string) => progress.find((p) => p.type === type)?.count || 0;
                    const total = progress.reduce((sum, p) => sum + p.count, 0);
                    const name = [u.first_name, u.last_name].filter(Boolean).join(" ") || u.display_name || u.email || "—";
                    return (
                      <TableRow key={u.user_id}>
                        <TableCell className="font-medium">{name}</TableCell>
                        <TableCell>{getCount("syllabus_topic")}</TableCell>
                        <TableCell>{getCount("scenario")}</TableCell>
                        <TableCell>{getCount("practice_set")}</TableCell>
                        <TableCell>{getCount("troubleshooting")}</TableCell>
                        <TableCell><Badge variant={total > 0 ? "default" : "secondary"}>{total}</Badge></TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* REVIEWS TAB */}
        <TabsContent value="reviews" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><MessageSquare className="w-5 h-5" /> Review Moderation</CardTitle>
              <CardDescription>Approve or hide student reviews. Only approved reviews are visible publicly.</CardDescription>
            </CardHeader>
            <CardContent>
              {pendingReviews.length === 0 ? (
                <p className="text-center text-muted-foreground py-6">No reviews submitted yet.</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Review</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingReviews.map((r) => (
                      <TableRow key={r.id}>
                        <TableCell className="font-medium">{r.display_name || "Anonymous"}</TableCell>
                        <TableCell>
                          <div className="flex gap-0.5">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star key={s} className={`w-3.5 h-3.5 ${r.rating >= s ? "fill-amber-400 text-amber-400" : "text-muted-foreground/20"}`} />
                            ))}
                          </div>
                        </TableCell>
                        <TableCell className="max-w-xs truncate text-sm">{r.review_text}</TableCell>
                        <TableCell className="text-xs text-muted-foreground">{new Date(r.created_at).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Badge variant={r.is_approved ? "default" : "secondary"}>
                            {r.is_approved ? "Approved" : "Pending"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            variant={r.is_approved ? "outline" : "default"}
                            onClick={() => toggleReviewApproval(r.id, !r.is_approved)}
                            className="gap-1"
                          >
                            {r.is_approved ? <><EyeOff className="w-3 h-3" /> Hide</> : <><CheckCircle2 className="w-3 h-3" /> Approve</>}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* COMPARISONS TAB */}
        <TabsContent value="comparisons" className="mt-6 space-y-6">
          <ConceptComparisonsAdmin />
        </TabsContent>

        <TabsContent value="summaries" className="mt-6 space-y-6">
          <PageSummariesAdmin />
        </TabsContent>
      </Tabs>
    </div>
  );
}
