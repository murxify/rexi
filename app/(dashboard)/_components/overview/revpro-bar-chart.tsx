import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { Database } from '@/lib/database.types';
import { formatCurrency } from '@/app/(dashboard)/_utils/format-currency';

import { Card } from '@/components/ui/card';

import CustomToolTip from './custom-tooltip';

interface RevProBarChartProps {
  data: Database['public']['Tables']['profits']['Row'][];
}

const RevProBarChart = ({ data }: RevProBarChartProps) => {
  const modifiedData = data.map((item) => ({
    ...item,
    day: `${new Date(item.date).getMonth() + 1}-${new Date(
      item.date
    ).getDate()}`,
  }));

  return (
    <Card className='sm:col-span-2 p-2 lg:col-span-3'>
      <ResponsiveContainer height={400}>
        <BarChart data={modifiedData} margin={{ left: -10, bottom: -15 }}>
          <CartesianGrid stroke='hsl(var(--chart-grid))' />
          <XAxis
            dataKey='day'
            height={40}
            angle={90}
            // stroke='hsl(var(--muted-foreground))'
            stroke='transparent'
            tick={<CustomXAxisTick />}
          />
          <YAxis
            tick={<CustomYAxisTick />}
            // stroke='hsl(var(--muted-foreground))'
            stroke='transparent'
          />
          <Tooltip
            content={<CustomToolTip />}
            cursor={{ fill: 'hsl(var(--accent))' }}
          />
          <Legend
            formatter={(value) => <span className='text-xs'>{value}</span>}
          />
          <Bar dataKey='revenue' fill='var(--chart-primary)' />
          <Bar dataKey='profit' fill='var(--chart-secondary)' />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default RevProBarChart;

const CustomXAxisTick = ({ x, y, payload }: any) => {
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={3}
        y={-3}
        dy={16}
        textAnchor='end'
        fill='hsl(var(--muted-foreground))'
        // transform='rotate(-35)'
        className='text-xs font-medium -rotate-45'
      >
        {payload.value}
      </text>
    </g>
  );
};

const CustomYAxisTick = ({ x, y, payload }: any) => {
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        textAnchor='end'
        fill='hsl(var(--muted-foreground))'
        className='text-xs font-medium -rotate-45'
      >
        {formatCurrency(payload.value, 'compact')}
      </text>
    </g>
  );
};
