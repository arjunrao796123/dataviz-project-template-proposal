import vl from 'vega-lite-api';

const brush = vl.selectInterval().encodings('x');

const brush_age = vl.selectInterval().encodings('x');

const age_range = vl
  .markBar({ width: 2,tooltip: true })
  .select(brush_age)
  .encode(
    vl.x().fieldQ('Age').scale({ zero: true }).title('Age'),
    vl.y().count().title(null)
  )
  .width(600)
  .height(45);

const panAndZoom = vl.selectInterval().bind('scales');
const salary_range = vl
  .markBar({ width: 2 })
  .select(brush)
  .encode(
    vl.x().fieldQ('EstimatedSalary').title(null),
    vl.tooltip().fieldQ('EstimatedSalary')
  )
  .width(700)
  .height(10);

const plot = vl
  .markPoint({ fill: true, size: 25 })
  .select(panAndZoom)
  .encode(
    vl.x().fieldN('Gender').title(null),
    vl.y().fieldQ('EstimatedSalary'),
    vl.color().if(brush_age, vl.fieldN('Exited')).value('grey'),
    vl.opacity().if(brush, vl.value(0.75)).value(0.001),
    vl.tooltip(['EstimatedSalary', 'CreditScore', 'Age', 'Geography', 'Exited'])
  )
  .width(700)
  .height(250);
export const viz = vl.vconcat(plot, salary_range, age_range).spacing(10);
