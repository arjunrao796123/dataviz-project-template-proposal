(function (vega, vegaLite, vl, vegaTooltip, d3) {
  'use strict';

  vega = vega && Object.prototype.hasOwnProperty.call(vega, 'default') ? vega['default'] : vega;
  vegaLite = vegaLite && Object.prototype.hasOwnProperty.call(vegaLite, 'default') ? vegaLite['default'] : vegaLite;
  vl = vl && Object.prototype.hasOwnProperty.call(vl, 'default') ? vl['default'] : vl;

  // Appearance customization to improve readability.
  // See https://vega.github.io/vega-lite/docs/
  const dark = '#3e3c38';
  const config = {
    axis: {
      domain: false,
      tickColor: 'lightGray'
    },
    style: {
      "guide-label": {
        fontSize: 15,
        fill: dark
      },
      "guide-title": {
        fontSize: 15,
        fill: dark
      }
    }
  };

  const csvUrl = 'https://gist.githubusercontent.com/arjunrao796123/7c30f2b6d4a3a3746b0154260a7f46e8/raw/0da06e5d2e59856152ee7d69694bbd9a7410824e/Churn_data.csv';

  const getData = async () => {
    const data = await d3.csv(csvUrl);
    
    // Have a look at the attributes available in the console!
    console.log(data[0]);

    return data;
  };

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

  const viz = vl.vconcat(plot, salary_range).spacing(10);

  vl.register(vega, vegaLite, {
    view: { renderer: 'svg' },
    init: view => { view.tooltip(new vegaTooltip.Handler().call); }
  });

  const run = async () => {
    const marks = viz
      .data(await getData())
      .autosize({ type: 'fit', contains: 'padding' })
      .config(config);
    
    document.body.appendChild(await marks.render());
  };
  run();

}(vega, vegaLite, vl, vegaTooltip, d3));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbImNvbmZpZy5qcyIsImdldERhdGEuanMiLCJ2aXouanMiLCJpbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBBcHBlYXJhbmNlIGN1c3RvbWl6YXRpb24gdG8gaW1wcm92ZSByZWFkYWJpbGl0eS5cbi8vIFNlZSBodHRwczovL3ZlZ2EuZ2l0aHViLmlvL3ZlZ2EtbGl0ZS9kb2NzL1xuY29uc3QgZGFyayA9ICcjM2UzYzM4JztcbmV4cG9ydCBjb25zdCBjb25maWcgPSB7XG4gIGF4aXM6IHtcbiAgICBkb21haW46IGZhbHNlLFxuICAgIHRpY2tDb2xvcjogJ2xpZ2h0R3JheSdcbiAgfSxcbiAgc3R5bGU6IHtcbiAgICBcImd1aWRlLWxhYmVsXCI6IHtcbiAgICAgIGZvbnRTaXplOiAxNSxcbiAgICAgIGZpbGw6IGRhcmtcbiAgICB9LFxuICAgIFwiZ3VpZGUtdGl0bGVcIjoge1xuICAgICAgZm9udFNpemU6IDE1LFxuICAgICAgZmlsbDogZGFya1xuICAgIH1cbiAgfVxufTsiLCJpbXBvcnQgeyBjc3YgfSBmcm9tICdkMyc7XG5cbmNvbnN0IGNzdlVybCA9ICdodHRwczovL2dpc3QuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2FyanVucmFvNzk2MTIzLzdjMzBmMmI2ZDRhM2EzNzQ2YjAxNTQyNjBhN2Y0NmU4L3Jhdy8wZGEwNmU1ZDJlNTk4NTYxNTJlZTdkNjk2OTRiYmQ5YTc0MTA4MjRlL0NodXJuX2RhdGEuY3N2JztcblxuZXhwb3J0IGNvbnN0IGdldERhdGEgPSBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IGRhdGEgPSBhd2FpdCBjc3YoY3N2VXJsKTtcbiAgXG4gIC8vIEhhdmUgYSBsb29rIGF0IHRoZSBhdHRyaWJ1dGVzIGF2YWlsYWJsZSBpbiB0aGUgY29uc29sZSFcbiAgY29uc29sZS5sb2coZGF0YVswXSk7XG5cbiAgcmV0dXJuIGRhdGE7XG59OyIsImltcG9ydCB2bCBmcm9tICd2ZWdhLWxpdGUtYXBpJztcbmNvbnN0IGJydXNoID0gdmwuc2VsZWN0SW50ZXJ2YWwoKS5lbmNvZGluZ3MoJ3gnKTtcblxuY29uc3QgY291bnRyeSA9IFsnRnJhbmNlJywgJ1NwYWluJywgJ0dlcm1hbnknXTtcbmNvbnN0IGdlbmRlciA9IFsnTWFsZScsICdGZW1hbGUnXTtcblxuY29uc3Qgc2FsYXJ5X3JhbmdlID0gdmxcbiAgLm1hcmtCYXIoeyB3aWR0aDogNSB9KVxuICAuc2VsZWN0KGJydXNoKVxuICAuZW5jb2RlKFxuICAgIHZsLngoKS5maWVsZFEoJ0VzdGltYXRlZFNhbGFyeScpLnRpdGxlKG51bGwpLFxuICAgIHZsLnRvb2x0aXAoKS5maWVsZFEoJ0VzdGltYXRlZFNhbGFyeScpXG4gIClcbiAgLndpZHRoKDgwMClcbiAgLmhlaWdodCgxMik7XG5cbmNvbnN0IHNlbGVjdGlvbiA9IHZsXG4gIC5zZWxlY3RTaW5nbGUoJ1NlbGVjdCcpXG4gIC5maWVsZHMoJ0dlb2dyYXBoeScsICdHZW5kZXInKVxuICAuaW5pdCh7IEdlb2dyYXBoeTogY291bnRyeVswXSwgR2VuZGVyOiBnZW5kZXJbMF0gfSlcbiAgLmJpbmQoeyBHZW9ncmFwaHk6IHZsLm1lbnUoY291bnRyeSksIEdlbmRlcjogdmwucmFkaW8oZ2VuZGVyKSB9KTtcblxuLy8gc2NhdHRlciBwbG90LCBtb2RpZnkgb3BhY2l0eSBiYXNlZCBvbiBzZWxlY3Rpb25cbmNvbnN0IHBsb3QgPSB2bFxuICAubWFya1BvaW50KHsgZmlsbDogdHJ1ZSwgc3Ryb2tlOiBmYWxzZSwgc2l6ZTogMTAgfSlcblxuICAuc2VsZWN0KHNlbGVjdGlvbilcbiAgLmVuY29kZShcbiAgICB2bFxuICAgICAgLngoKVxuICAgICAgLmZpZWxkUSgnRXN0aW1hdGVkU2FsYXJ5JylcbiAgICAgIC5iaW4oeyBtYXhiaW5zOiAxNTAgfSlcbiAgICAgIC5zY2FsZSh7IGRvbWFpbjogYnJ1c2ggfSksXG4gICAgdmwueSgpLmZpZWxkUSgnQ3JlZGl0U2NvcmUnKS5zY2FsZSh7IHplcm86IGZhbHNlIH0pLFxuXG4gICAgdmwuY29sb3IoKS5maWVsZE4oJ0V4aXRlZCcpLFxuICAgIHZsLnRvb2x0aXAoW1xuICAgICAgJ0VzdGltYXRlZFNhbGFyeScsXG4gICAgICAnQ3JlZGl0U2NvcmUnLFxuICAgICAgJ0dlbmRlcicsXG4gICAgICAnR2VvZ3JhcGh5JyxcbiAgICAgICdFeGl0ZWQnLFxuICAgIF0pLFxuICAgIHZsLm9wYWNpdHkoKS5pZihzZWxlY3Rpb24sIHZsLnZhbHVlKDAuNzUpKS52YWx1ZSgwLjA1KVxuICApXG4gIC53aWR0aCg4MDApXG4gIC5oZWlnaHQoMzI1KTtcblxuZXhwb3J0IGNvbnN0IHZpeiA9IHZsLnZjb25jYXQocGxvdCwgc2FsYXJ5X3JhbmdlKS5zcGFjaW5nKDEwKTtcbiIsImltcG9ydCB2ZWdhIGZyb20gJ3ZlZ2EnO1xuaW1wb3J0IHZlZ2FMaXRlIGZyb20gJ3ZlZ2EtbGl0ZSc7XG5pbXBvcnQgdmwgZnJvbSAndmVnYS1saXRlLWFwaSc7XG5pbXBvcnQgeyBIYW5kbGVyIH0gZnJvbSAndmVnYS10b29sdGlwJztcbmltcG9ydCB7IGNvbmZpZyB9IGZyb20gJy4vY29uZmlnJztcbmltcG9ydCB7IGdldERhdGEgfSBmcm9tICcuL2dldERhdGEnO1xuaW1wb3J0IHsgdml6IH0gZnJvbSAnLi92aXonO1xuXG52bC5yZWdpc3Rlcih2ZWdhLCB2ZWdhTGl0ZSwge1xuICB2aWV3OiB7IHJlbmRlcmVyOiAnc3ZnJyB9LFxuICBpbml0OiB2aWV3ID0+IHsgdmlldy50b29sdGlwKG5ldyBIYW5kbGVyKCkuY2FsbCk7IH1cbn0pO1xuXG5jb25zdCBydW4gPSBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IG1hcmtzID0gdml6XG4gICAgLmRhdGEoYXdhaXQgZ2V0RGF0YSgpKVxuICAgIC5hdXRvc2l6ZSh7IHR5cGU6ICdmaXQnLCBjb250YWluczogJ3BhZGRpbmcnIH0pXG4gICAgLmNvbmZpZyhjb25maWcpO1xuICBcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChhd2FpdCBtYXJrcy5yZW5kZXIoKSk7XG59O1xucnVuKCk7Il0sIm5hbWVzIjpbImNzdiIsIkhhbmRsZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7RUFBQTtFQUNBO0VBQ0EsTUFBTSxJQUFJLEdBQUcsU0FBUyxDQUFDO0VBQ2hCLE1BQU0sTUFBTSxHQUFHO0VBQ3RCLEVBQUUsSUFBSSxFQUFFO0VBQ1IsSUFBSSxNQUFNLEVBQUUsS0FBSztFQUNqQixJQUFJLFNBQVMsRUFBRSxXQUFXO0VBQzFCLEdBQUc7RUFDSCxFQUFFLEtBQUssRUFBRTtFQUNULElBQUksYUFBYSxFQUFFO0VBQ25CLE1BQU0sUUFBUSxFQUFFLEVBQUU7RUFDbEIsTUFBTSxJQUFJLEVBQUUsSUFBSTtFQUNoQixLQUFLO0VBQ0wsSUFBSSxhQUFhLEVBQUU7RUFDbkIsTUFBTSxRQUFRLEVBQUUsRUFBRTtFQUNsQixNQUFNLElBQUksRUFBRSxJQUFJO0VBQ2hCLEtBQUs7RUFDTCxHQUFHO0VBQ0gsQ0FBQzs7RUNoQkQsTUFBTSxNQUFNLEdBQUcsZ0pBQWdKLENBQUM7QUFDaEs7RUFDTyxNQUFNLE9BQU8sR0FBRyxZQUFZO0VBQ25DLEVBQUUsTUFBTSxJQUFJLEdBQUcsTUFBTUEsTUFBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0VBQ2pDO0VBQ0E7RUFDQSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDdkI7RUFDQSxFQUFFLE9BQU8sSUFBSSxDQUFDO0VBQ2QsQ0FBQzs7RUNWRCxNQUFNLEtBQUssR0FBRyxFQUFFLENBQUMsY0FBYyxFQUFFLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2pEO0VBQ0EsTUFBTSxPQUFPLEdBQUcsQ0FBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0VBQy9DLE1BQU0sTUFBTSxHQUFHLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQ2xDO0VBQ0EsTUFBTSxZQUFZLEdBQUcsRUFBRTtFQUN2QixHQUFHLE9BQU8sQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQztFQUN4QixHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7RUFDaEIsR0FBRyxNQUFNO0VBQ1QsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztFQUNoRCxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUM7RUFDMUMsR0FBRztFQUNILEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQztFQUNiLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ2Q7RUFDQSxNQUFNLFNBQVMsR0FBRyxFQUFFO0VBQ3BCLEdBQUcsWUFBWSxDQUFDLFFBQVEsQ0FBQztFQUN6QixHQUFHLE1BQU0sQ0FBQyxXQUFXLEVBQUUsUUFBUSxDQUFDO0VBQ2hDLEdBQUcsSUFBSSxDQUFDLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7RUFDckQsR0FBRyxJQUFJLENBQUMsRUFBRSxTQUFTLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxNQUFNLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDbkU7RUFDQTtFQUNBLE1BQU0sSUFBSSxHQUFHLEVBQUU7RUFDZixHQUFHLFNBQVMsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLENBQUM7QUFDckQ7RUFDQSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUM7RUFDcEIsR0FBRyxNQUFNO0VBQ1QsSUFBSSxFQUFFO0VBQ04sT0FBTyxDQUFDLEVBQUU7RUFDVixPQUFPLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQztFQUNoQyxPQUFPLEdBQUcsQ0FBQyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQztFQUM1QixPQUFPLEtBQUssQ0FBQyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQztFQUMvQixJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDO0FBQ3ZEO0VBQ0EsSUFBSSxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztFQUMvQixJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUM7RUFDZixNQUFNLGlCQUFpQjtFQUN2QixNQUFNLGFBQWE7RUFDbkIsTUFBTSxRQUFRO0VBQ2QsTUFBTSxXQUFXO0VBQ2pCLE1BQU0sUUFBUTtFQUNkLEtBQUssQ0FBQztFQUNOLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7RUFDMUQsR0FBRztFQUNILEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQztFQUNiLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2Y7RUFDTyxNQUFNLEdBQUcsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxZQUFZLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDOztFQ3hDN0QsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFO0VBQzVCLEVBQUUsSUFBSSxFQUFFLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRTtFQUMzQixFQUFFLElBQUksRUFBRSxJQUFJLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUlDLG1CQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFO0VBQ3JELENBQUMsQ0FBQyxDQUFDO0FBQ0g7RUFDQSxNQUFNLEdBQUcsR0FBRyxZQUFZO0VBQ3hCLEVBQUUsTUFBTSxLQUFLLEdBQUcsR0FBRztFQUNuQixLQUFLLElBQUksQ0FBQyxNQUFNLE9BQU8sRUFBRSxDQUFDO0VBQzFCLEtBQUssUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLENBQUM7RUFDbkQsS0FBSyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7RUFDcEI7RUFDQSxFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7RUFDbEQsQ0FBQyxDQUFDO0VBQ0YsR0FBRyxFQUFFOzs7OyJ9