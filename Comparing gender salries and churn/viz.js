import vl from 'vega-lite-api';

const brush = vl.selectInterval().encodings('x').resolve('intersect');

const salary_range = vl
  .markBar({ width: 5 })
  .select(brush)
  .encode(
    vl.x().fieldQ('EstimatedSalary').title(null),
    vl.tooltip().fieldQ('EstimatedSalary')
  )
  .width(700)
  .height(12);

const plot = vl
  .markPoint({ fill: true, size: 25 })
 
  .encode(
    vl.x().fieldN('Gender'),
    vl.y().fieldQ('EstimatedSalary').scale({domain: brush}),
    vl.color().fieldN('Exited'),
    vl.tooltip().fieldQ('Exited')
  )
  .width(700)
  .height(300);
export const viz = vl.vconcat(plot, salary_range).spacing(10);
