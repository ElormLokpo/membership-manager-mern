import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,  
  RadialBarChart,
  PolarRadiusAxis,
  Label,
  RadialBar,
} from "recharts";

export const DashboardBarChart = () => {
  const data = [
    { day: "S", value: 40 },
    { day: "M", value: 60 },
    { day: "T", value: 74 },
    { day: "W", value: 90 },

    { day: "T", value: 50 },
    { day: "F", value: 70 },
    { day: "S", value: 30 },
    { day: "T", value: 50 },
    { day: "F", value: 70 },
    { day: "S", value: 30 },
    { day: "T", value: 50 },
    { day: "F", value: 70 },
    { day: "S", value: 30 },
  ];

  const highlightedDays = ["W", "F"];

  return (
    <div className="h-50 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} barSize={50} barGap={8}>
          <defs>
            {/* Striped pattern */}
            <pattern
              id="striped"
              patternUnits="userSpaceOnUse"
              width={8}
              height={8}
            >
              <path d="M0,0 l8,8" stroke="#4CAF50" strokeWidth={2} />
            </pattern>
          </defs>

          <XAxis dataKey="day" axisLine={false} tickLine={false} />
          <YAxis hide />
          <Tooltip cursor={{ fill: "transparent" }} />

          <Bar dataKey="value" radius={[25, 25, 25, 25]}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  highlightedDays.includes(entry.day)
                    ? "url(#striped)"
                    : "#4CAF50"
                }
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const DashboardDoChart = () => {
  const chartData = [{ month: "january", desktop: 1260, mobile: 570 }];
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          data={chartData}
          endAngle={180}
          innerRadius={80}
          outerRadius={150}
          
        >
          <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) - 16}
                        className="fill-foreground text-2xl font-bold "
                      >
                        41%
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 4}
                        className="fill-muted-foreground"
                      >
                        Increase
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </PolarRadiusAxis>
          <RadialBar
            dataKey="desktop"
            stackId="a"
            cornerRadius={5}
            fill="#4CAF50"
            className="stroke-transparent stroke-2"
          />
          <RadialBar
            dataKey="mobile"
            fill="#295e2b"
            stackId="a"
            cornerRadius={5}
            className="stroke-transparent stroke-2"
          />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
};
