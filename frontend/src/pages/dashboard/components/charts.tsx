import { type ChartConfig, ChartContainer } from "@/components/ui/chart";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

const barChartConfig = {
  desktop: {
    label: "Desktop",
    color: "oklch(76.8% 0.233 130.85)",
  },
  mobile: {
    label: "Mobile",
    color: "oklch(53.2% 0.157 131.589)",
  },
} satisfies ChartConfig;

export const DashboardCharts = () => {
  return (
    <div className="grid grid-cols-12 gap-3 h-[20rem]">
      <div className="border rounded-md p-2 col-span-7">
        <DashboardBarChart />
      </div>

      <div className="border rounded-md p-2 col-span-5">
        {/* <DashboardSideChart /> */}
      </div>
    </div>
  );
};

const DashboardBarChart = () => {
  const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
  ];

  return (
    <div>
      <ChartContainer config={barChartConfig} className="min-h-[200px] w-full">
        <BarChart accessibilityLayer data={chartData}>
          <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
          <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  );
};

const sideChartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "oklch(89.7% 0.196 126.665)",
  },
  safari: {
    label: "Safari",
    color: "oklch(84.1% 0.238 128.85)",
  },
  firefox: {
    label: "Firefox",
    color: "oklch(76.8% 0.233 130.85)",
  },
  edge: {
    label: "Edge",
    color: "oklch(64.8% 0.2 131.684)",
  },
  other: {
    label: "Other",
    color: "oklch(53.2% 0.157 131.589)",
  },
} satisfies ChartConfig;

const DashboardSideChart = () => {
  const chartData = [
    { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
    { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
    { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
    { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
    { browser: "other", visitors: 90, fill: "var(--color-other)" },
  ];

  return (
    <div>
      <ChartContainer config={sideChartConfig}>
        <BarChart
          accessibilityLayer
          data={chartData}
          layout="vertical"
          margin={{
            left: 0,
          }}
        >
          <YAxis
            dataKey="browser"
            type="category"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) =>
              sideChartConfig[value as keyof typeof sideChartConfig]?.label
            }
          />
          <XAxis dataKey="visitors" type="number" hide />

          <Bar dataKey="visitors" layout="vertical" radius={5} />
        </BarChart>
      </ChartContainer>
    </div>
  );
};
