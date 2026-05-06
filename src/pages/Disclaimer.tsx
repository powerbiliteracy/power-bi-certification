import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldAlert } from "lucide-react";

export default function Disclaimer() {
  return (
    <div className="space-y-6 animate-fade-in max-w-3xl">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <ShieldAlert className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">Disclaimer</h1>
          <p className="text-muted-foreground mt-1">Please read carefully before using this service.</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Not affiliated with Microsoft</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-3">
          <p>
            PL-300 Coach is an independent study platform. It is <strong>not</strong> endorsed,
            sponsored, or affiliated with Microsoft Corporation. <em>Microsoft</em>, <em>Power BI</em>,
            <em> PL-300</em>, and related marks are trademarks of Microsoft Corporation.
          </p>
          <p>
            All study materials, summaries, exam scenarios and practice questions are produced
            independently for educational purposes only and do not represent official Microsoft exam content.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Cancel anytime</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-3">
          <p>
            You can cancel your subscription at any time from your <strong>Account → Billing</strong> page.
            When you cancel, your access continues until the end of your current paid billing period
            (the remaining days of your 30-day cycle from the last payment date). You will not be billed again.
          </p>
          <p>
            Trial users can cancel before the trial ends to avoid being charged.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>No guarantee of exam outcome</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-3">
          <p>
            While our content is designed to align with the official PL-300 syllabus, we cannot guarantee
            a passing score. Exam results depend on individual study, experience, and effort.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Data & privacy</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-3">
          <p>
            We store only the data necessary to operate the platform (account info, progress, favorites).
            Payments are processed securely via Stripe — we never see or store your full card details.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
