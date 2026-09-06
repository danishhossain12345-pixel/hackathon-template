"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Activity, LayoutDashboard, Terminal } from "lucide-react";
import { AnalyticsChart } from "@/components/dashboard/analytics-chart";

export default function DashboardPage() {
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const runInference = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setOutput(data.output || data.error || "No response received.");
    } catch {
      setOutput("Error connecting to /api/ai route.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-background text-foreground">
      {/* Sidebar Shell */}
      <aside className="hidden md:flex w-64 flex-col border-r border-border p-6 gap-6">
        <div className="flex items-center gap-2 font-bold text-xl">
          <Activity className="h-6 w-6 text-primary" />
          <span>HackOS</span>
        </div>
        <nav className="flex flex-col gap-2">
          <Button variant="secondary" className="justify-start gap-2">
            <LayoutDashboard className="h-4 w-4" /> Overview
          </Button>
          <Button variant="ghost" className="justify-start gap-2">
            <Terminal className="h-4 w-4" /> Playground
          </Button>
        </nav>
      </aside>

      {/* Main Panel */}
      <main className="flex-1 p-8 space-y-6">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Hackathon Prototype</h1>
            <p className="text-muted-foreground">Pre-configured with Next.js, Supabase, and Gemini 2.5 Flash.</p>
          </div>
          <Badge variant="outline" className="px-3 py-1">Ready for Build</Badge>
        </header>

        {/* Bklit-style Visuals Card */}
        <AnalyticsChart />

        {/* Gemini Prompt & Output Interface */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-amber-500" />
                Prompt Gemini
              </CardTitle>
              <CardDescription>Direct interface to your Next.js AI API route.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Type your prompt here..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && runInference()}
              />
              <Button onClick={runInference} disabled={loading} className="w-full">
                {loading ? "Generating..." : "Run Pipeline"}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Inference Output</CardTitle>
              <CardDescription>Live model response payload.</CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="min-h-[140px] rounded-md bg-muted p-4 text-xs font-mono whitespace-pre-wrap overflow-auto">
                {output || "Awaiting prompt trigger..."}
              </pre>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
