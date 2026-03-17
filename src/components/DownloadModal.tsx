import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StoreBadges from "./StoreBadges";

interface DownloadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultTab?: "learners" | "instructors";
}

export default function DownloadModal({ open, onOpenChange, defaultTab = "learners" }: DownloadModalProps) {
  const [tab, setTab] = useState(defaultTab);

  useEffect(() => {
    if (open) setTab(defaultTab);
  }, [open, defaultTab]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-[300px] sm:max-w-[340px] rounded-2xl border-border/40 bg-background/95 backdrop-blur-xl shadow-[0_24px_80px_-16px_hsl(var(--foreground)/0.15),0_0_0_1px_hsl(var(--border)/0.5)] p-0 overflow-hidden"
      >
        {/* Accent gradient line */}
        <div className="h-[3px] w-full bg-gradient-to-r from-primary via-primary/60 to-primary/20" />

        <div className="px-6 pt-5 pb-6">
          <DialogHeader className="space-y-1">
            <DialogTitle className="text-lg font-bold tracking-tight">Download Instructra</DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">Choose the app that's right for you.</DialogDescription>
          </DialogHeader>

          <Tabs value={tab} onValueChange={(v) => setTab(v as "learners" | "instructors")} className="mt-4">
            <TabsList className="w-full h-9 rounded-xl bg-muted/60 p-0.5">
              <TabsTrigger value="learners" className="flex-1 rounded-lg text-xs font-medium data-[state=active]:shadow-sm">Learners</TabsTrigger>
              <TabsTrigger value="instructors" className="flex-1 rounded-lg text-xs font-medium data-[state=active]:shadow-sm">Instructors</TabsTrigger>
            </TabsList>

            <TabsContent value="learners" className="mt-5 flex flex-col items-center gap-3">
              <p className="text-xs text-muted-foreground text-center leading-relaxed">
                Find and book driving lessons near you.
              </p>
              <StoreBadges audience="learner" variant="glass" />
            </TabsContent>

            <TabsContent value="instructors" className="mt-5 flex flex-col items-center gap-3">
              <p className="text-xs text-muted-foreground text-center leading-relaxed">
                Manage your diary, bookings and students.
              </p>
              <StoreBadges audience="business" variant="glass" />
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
