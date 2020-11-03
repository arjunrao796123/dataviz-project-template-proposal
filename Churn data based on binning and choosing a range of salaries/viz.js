import vl from 'vega-lite-api';

const brush = vl.selectInterval().encodings('x');

const salary_range = vl.markBar({width: 2})
    .select(brush)
    .encode(
      vl.x().fieldQ('EstimatedSalary').scale({"zero": true}).title('Select salary range you want to see'),
    	vl.tooltip().fieldQ('EstimatedSalary')
    )
    .width(700)
    .height(50);

const plot = vl
	
  .markPoint({ fill: true, stroke: false, size:10 })
  .encode(
    vl.x().fieldQ('EstimatedSalary').bin({ maxbins: 50 }),
    vl.y().fieldQ('CreditScore').scale({ zero: false }),
    vl.color().fieldN('Exited'),
    vl.tooltip(['EstimatedSalary','CreditScore']),
    vl.opacity().if(brush, vl.value(0.75)).value(0.05)
  ).width(700)
    .height(300);

export const viz = vl.vconcat(plot,salary_range).spacing(5);