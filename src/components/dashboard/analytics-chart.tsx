"use client";

import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp } from "lucide-react";

const chartData = [
  { time: "00:00", tokens: 120, requests: 14 },
  { time: "04:00", tokens: 340, requests: 28 },
  { time: "08:00", tokens: 820, requests: 64 },
  { time: "12:00", tokens: 1450, requests: 110 },
  { time: "16:00", tokens: 2100, requests: 175 },
  { time: "20:00", tokens: 2980, requests: 240 },
  { time: "24:00", tokens: 3840, requests: 310 },
];

export function AnalyticsChart() {
  return (
    <Card className="col-span-full border-border bg-card/60 backdrop-blur">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-base font-semibold">Live Pipeline Throughput</CardTitle>
          <CardDescription>Real-time token generation and API query volume</CardDescription>
        </div>
        <Badge variant="secondary" className="flex items-center gap-1 text-xs font-normal">
          <TrendingUp className="h-3.5 w-3.5 text-emerald-500" /> +34.8% vs last sprint
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="tokenGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="time" stroke="#71717a" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#71717a" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#09090b",
                  borderColor: "#27272a",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Area
                type="monotone"
                dataKey="tokens"
                stroke="#3b82f6"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#tokenGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
