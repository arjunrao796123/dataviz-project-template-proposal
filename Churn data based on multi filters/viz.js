import vl from 'vega-lite-api';
const brush = vl.selectInterval().encodings('x');

const country = ['France', 'Spain', 'Germany'];
const gender = ['Male', 'Female'];

const salary_range = vl
  .markBar({ width: 5 })
  .select(brush)
  .encode(
    vl.x().fieldQ('EstimatedSalary').title(null),
    vl.tooltip().fieldQ('EstimatedSalary')
  )
  .width(800)
  .height(12);

const selection = vl
  .selectSingle('Select')
  .fields('Geography', 'Gender')
  .init({ Geography: country[0], Gender: gender[0] })
  .bind({ Geography: vl.menu(country), Gender: vl.radio(gender) });

// scatter plot, modify opacity based on selection
const plot = vl
  .markPoint({ fill: true, stroke: false, size: 10 })

  .select(selection)
  .encode(
    vl
      .x()
      .fieldQ('EstimatedSalary')
      .bin({ maxbins: 150 })
      .scale({ domain: brush }),
    vl.y().fieldQ('CreditScore').scale({ zero: false }),

    vl.color().fieldN('Exited'),
    vl.tooltip([
      'EstimatedSalary',
      'CreditScore',
      'Gender',
      'Geography',
      'Exited',
    ]),
    vl.opacity().if(selection, vl.value(0.75)).value(0.05)
  )
  .width(800)
  .height(325);

export const viz = vl.vconcat(plot, salary_range).spacing(10);
