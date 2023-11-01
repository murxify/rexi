import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { formatCurrency, getShiftDuration } from '@/lib/utils';

const CustomToolTip = ({ payload, active }: any) => {
  if (active) {
    return (
      <Card>
        <CardHeader className='p-2 pb-1 px-4 space-y-0'>
          <CardTitle className='text-sm'>{payload[0].payload.date}</CardTitle>
        </CardHeader>
        <CardContent className='p-2 px-4 pt-0'>
          {payload.map((item: any) => (
            <div className='mb-2 last:mb-0' key={item.name}>
              <p className='text-sm text-muted-foreground'>
                {item.name === 'shift_duration' ? 'shift duration' : item.name}:
              </p>
              <p
                className='text-base font-semibold'
                style={{ color: item.color }}
              >
                {item.name === 'shift_duration'
                  ? getShiftDuration(item.value)
                  : formatCurrency(item.value)}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }
};

export default CustomToolTip;
