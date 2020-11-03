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
        fontSize: 20,
        fill: dark
      },
      "guide-title": {
        fontSize: 30,
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbImNvbmZpZy5qcyIsImdldERhdGEuanMiLCJ2aXouanMiLCJpbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBBcHBlYXJhbmNlIGN1c3RvbWl6YXRpb24gdG8gaW1wcm92ZSByZWFkYWJpbGl0eS5cbi8vIFNlZSBodHRwczovL3ZlZ2EuZ2l0aHViLmlvL3ZlZ2EtbGl0ZS9kb2NzL1xuY29uc3QgZGFyayA9ICcjM2UzYzM4JztcbmV4cG9ydCBjb25zdCBjb25maWcgPSB7XG4gIGF4aXM6IHtcbiAgICBkb21haW46IGZhbHNlLFxuICAgIHRpY2tDb2xvcjogJ2xpZ2h0R3JheSdcbiAgfSxcbiAgc3R5bGU6IHtcbiAgICBcImd1aWRlLWxhYmVsXCI6IHtcbiAgICAgIGZvbnRTaXplOiAyMCxcbiAgICAgIGZpbGw6IGRhcmtcbiAgICB9LFxuICAgIFwiZ3VpZGUtdGl0bGVcIjoge1xuICAgICAgZm9udFNpemU6IDMwLFxuICAgICAgZmlsbDogZGFya1xuICAgIH1cbiAgfVxufTsiLCJpbXBvcnQgeyBjc3YgfSBmcm9tICdkMyc7XG5cbmNvbnN0IGNzdlVybCA9ICdodHRwczovL2dpc3QuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2FyanVucmFvNzk2MTIzLzdjMzBmMmI2ZDRhM2EzNzQ2YjAxNTQyNjBhN2Y0NmU4L3Jhdy8wZGEwNmU1ZDJlNTk4NTYxNTJlZTdkNjk2OTRiYmQ5YTc0MTA4MjRlL0NodXJuX2RhdGEuY3N2JztcblxuZXhwb3J0IGNvbnN0IGdldERhdGEgPSBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IGRhdGEgPSBhd2FpdCBjc3YoY3N2VXJsKTtcbiAgXG4gIC8vIEhhdmUgYSBsb29rIGF0IHRoZSBhdHRyaWJ1dGVzIGF2YWlsYWJsZSBpbiB0aGUgY29uc29sZSFcbiAgY29uc29sZS5sb2coZGF0YVswXSk7XG5cbiAgcmV0dXJuIGRhdGE7XG59OyIsImltcG9ydCB2bCBmcm9tICd2ZWdhLWxpdGUtYXBpJztcblxuY29uc3QgYnJ1c2ggPSB2bC5zZWxlY3RJbnRlcnZhbCgpLmVuY29kaW5ncygneCcpLnJlc29sdmUoJ2ludGVyc2VjdCcpO1xuXG5jb25zdCBzYWxhcnlfcmFuZ2UgPSB2bFxuICAubWFya0Jhcih7IHdpZHRoOiA1IH0pXG4gIC5zZWxlY3QoYnJ1c2gpXG4gIC5lbmNvZGUoXG4gICAgdmwueCgpLmZpZWxkUSgnRXN0aW1hdGVkU2FsYXJ5JykudGl0bGUobnVsbCksXG4gICAgdmwudG9vbHRpcCgpLmZpZWxkUSgnRXN0aW1hdGVkU2FsYXJ5JylcbiAgKVxuICAud2lkdGgoNzAwKVxuICAuaGVpZ2h0KDEyKTtcblxuY29uc3QgcGxvdCA9IHZsXG4gIC5tYXJrUG9pbnQoeyBmaWxsOiB0cnVlLCBzaXplOiAyNSB9KVxuIFxuICAuZW5jb2RlKFxuICAgIHZsLngoKS5maWVsZE4oJ0dlbmRlcicpLFxuICAgIHZsLnkoKS5maWVsZFEoJ0VzdGltYXRlZFNhbGFyeScpLnNjYWxlKHtkb21haW46IGJydXNofSksXG4gICAgdmwuY29sb3IoKS5maWVsZE4oJ0V4aXRlZCcpLFxuICAgIHZsLnRvb2x0aXAoKS5maWVsZFEoJ0V4aXRlZCcpXG4gIClcbiAgLndpZHRoKDcwMClcbiAgLmhlaWdodCgzMDApO1xuZXhwb3J0IGNvbnN0IHZpeiA9IHZsLnZjb25jYXQocGxvdCwgc2FsYXJ5X3JhbmdlKS5zcGFjaW5nKDEwKTtcbiIsImltcG9ydCB2ZWdhIGZyb20gJ3ZlZ2EnO1xuaW1wb3J0IHZlZ2FMaXRlIGZyb20gJ3ZlZ2EtbGl0ZSc7XG5pbXBvcnQgdmwgZnJvbSAndmVnYS1saXRlLWFwaSc7XG5pbXBvcnQgeyBIYW5kbGVyIH0gZnJvbSAndmVnYS10b29sdGlwJztcbmltcG9ydCB7IGNvbmZpZyB9IGZyb20gJy4vY29uZmlnJztcbmltcG9ydCB7IGdldERhdGEgfSBmcm9tICcuL2dldERhdGEnO1xuaW1wb3J0IHsgdml6IH0gZnJvbSAnLi92aXonO1xuXG52bC5yZWdpc3Rlcih2ZWdhLCB2ZWdhTGl0ZSwge1xuICB2aWV3OiB7IHJlbmRlcmVyOiAnc3ZnJyB9LFxuICBpbml0OiB2aWV3ID0+IHsgdmlldy50b29sdGlwKG5ldyBIYW5kbGVyKCkuY2FsbCk7IH1cbn0pO1xuXG5jb25zdCBydW4gPSBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IG1hcmtzID0gdml6XG4gICAgLmRhdGEoYXdhaXQgZ2V0RGF0YSgpKVxuICAgIC5hdXRvc2l6ZSh7IHR5cGU6ICdmaXQnLCBjb250YWluczogJ3BhZGRpbmcnIH0pXG4gICAgLmNvbmZpZyhjb25maWcpO1xuICBcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChhd2FpdCBtYXJrcy5yZW5kZXIoKSk7XG59O1xucnVuKCk7Il0sIm5hbWVzIjpbImNzdiIsIkhhbmRsZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7RUFBQTtFQUNBO0VBQ0EsTUFBTSxJQUFJLEdBQUcsU0FBUyxDQUFDO0VBQ2hCLE1BQU0sTUFBTSxHQUFHO0VBQ3RCLEVBQUUsSUFBSSxFQUFFO0VBQ1IsSUFBSSxNQUFNLEVBQUUsS0FBSztFQUNqQixJQUFJLFNBQVMsRUFBRSxXQUFXO0VBQzFCLEdBQUc7RUFDSCxFQUFFLEtBQUssRUFBRTtFQUNULElBQUksYUFBYSxFQUFFO0VBQ25CLE1BQU0sUUFBUSxFQUFFLEVBQUU7RUFDbEIsTUFBTSxJQUFJLEVBQUUsSUFBSTtFQUNoQixLQUFLO0VBQ0wsSUFBSSxhQUFhLEVBQUU7RUFDbkIsTUFBTSxRQUFRLEVBQUUsRUFBRTtFQUNsQixNQUFNLElBQUksRUFBRSxJQUFJO0VBQ2hCLEtBQUs7RUFDTCxHQUFHO0VBQ0gsQ0FBQzs7RUNoQkQsTUFBTSxNQUFNLEdBQUcsZ0pBQWdKLENBQUM7QUFDaEs7RUFDTyxNQUFNLE9BQU8sR0FBRyxZQUFZO0VBQ25DLEVBQUUsTUFBTSxJQUFJLEdBQUcsTUFBTUEsTUFBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0VBQ2pDO0VBQ0E7RUFDQSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDdkI7RUFDQSxFQUFFLE9BQU8sSUFBSSxDQUFDO0VBQ2QsQ0FBQzs7RUNURCxNQUFNLEtBQUssR0FBRyxFQUFFLENBQUMsY0FBYyxFQUFFLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUN0RTtFQUNBLE1BQU0sWUFBWSxHQUFHLEVBQUU7RUFDdkIsR0FBRyxPQUFPLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUM7RUFDeEIsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO0VBQ2hCLEdBQUcsTUFBTTtFQUNULElBQUksRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7RUFDaEQsSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDO0VBQzFDLEdBQUc7RUFDSCxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUM7RUFDYixHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNkO0VBQ0EsTUFBTSxJQUFJLEdBQUcsRUFBRTtFQUNmLEdBQUcsU0FBUyxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLENBQUM7RUFDdEM7RUFDQSxHQUFHLE1BQU07RUFDVCxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO0VBQzNCLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztFQUMzRCxJQUFJLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO0VBQy9CLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7RUFDakMsR0FBRztFQUNILEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQztFQUNiLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0VBQ1IsTUFBTSxHQUFHLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsWUFBWSxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQzs7RUNqQjdELEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRTtFQUM1QixFQUFFLElBQUksRUFBRSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUU7RUFDM0IsRUFBRSxJQUFJLEVBQUUsSUFBSSxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJQyxtQkFBTyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRTtFQUNyRCxDQUFDLENBQUMsQ0FBQztBQUNIO0VBQ0EsTUFBTSxHQUFHLEdBQUcsWUFBWTtFQUN4QixFQUFFLE1BQU0sS0FBSyxHQUFHLEdBQUc7RUFDbkIsS0FBSyxJQUFJLENBQUMsTUFBTSxPQUFPLEVBQUUsQ0FBQztFQUMxQixLQUFLLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxDQUFDO0VBQ25ELEtBQUssTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0VBQ3BCO0VBQ0EsRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0VBQ2xELENBQUMsQ0FBQztFQUNGLEdBQUcsRUFBRTs7OzsifQ==