import * as React from "react";
import { ChartContainer, AreaChart, BarChart } from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  Users,
  UserPlus,
  Share2,
  Calendar,
  Target,
} from "lucide-react";

const signups = [
  { label: "W1", value: 120 },
  { label: "W2", value: 180 },
  { label: "W3", value: 160 },
  { label: "W4", value: 220 },
  { label: "W5", value: 260 },
  { label: "W6", value: 280 },
];

const referrals = [
  { label: "W1", value: 40 },
  { label: "W2", value: 55 },
  { label: "W3", value: 60 },
  { label: "W4", value: 75 },
  { label: "W5", value: 90 },
  { label: "W6", value: 95 },
];

export default function WaitlistAnalyticsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);

  // Mock analytics data
  const analyticsStats = {
    totalSignups: 1247,
    totalReferrals: 389,
    conversionRate: 23.4,
    avgReferralsPerUser: 2.1,
    growthRate: 12.5,
    topReferrer: "alice@example.com",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Analytics</h2>
          <p className="text-sm text-muted-foreground">
            Track performance and insights for your waitlist
          </p>
        </div>
        <Badge variant="secondary" className="flex items-center gap-1">
          <TrendingUp className="h-3 w-3" />
          {analyticsStats.growthRate}% growth
        </Badge>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <Users className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {analyticsStats.totalSignups.toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">Total Signups</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <UserPlus className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {analyticsStats.totalReferrals}
                </p>
                <p className="text-sm text-muted-foreground">Referrals</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Target className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {analyticsStats.conversionRate}%
                </p>
                <p className="text-sm text-muted-foreground">Conversion Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <Share2 className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {analyticsStats.avgReferralsPerUser}
                </p>
                <p className="text-sm text-muted-foreground">Avg Referrals</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Signups Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer height={300} className="mt-2">
              <AreaChart data={signups} />
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Share2 className="h-5 w-5" />
              Referrals Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer height={300} className="mt-2">
              <BarChart data={referrals} />
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Additional Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Key Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h4 className="font-medium">Top Referrer</h4>
              <p className="text-sm text-muted-foreground">
                {analyticsStats.topReferrer}
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Growth Rate</h4>
              <p className="text-sm text-muted-foreground">
                +{analyticsStats.growthRate}% this month
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
