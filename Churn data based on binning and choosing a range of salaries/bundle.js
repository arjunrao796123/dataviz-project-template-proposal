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

  const viz = vl.vconcat(plot,salary_range).spacing(5);

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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbImNvbmZpZy5qcyIsImdldERhdGEuanMiLCJ2aXouanMiLCJpbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBBcHBlYXJhbmNlIGN1c3RvbWl6YXRpb24gdG8gaW1wcm92ZSByZWFkYWJpbGl0eS5cbi8vIFNlZSBodHRwczovL3ZlZ2EuZ2l0aHViLmlvL3ZlZ2EtbGl0ZS9kb2NzL1xuY29uc3QgZGFyayA9ICcjM2UzYzM4JztcbmV4cG9ydCBjb25zdCBjb25maWcgPSB7XG4gIGF4aXM6IHtcbiAgICBkb21haW46IGZhbHNlLFxuICAgIHRpY2tDb2xvcjogJ2xpZ2h0R3JheSdcbiAgfSxcbiAgc3R5bGU6IHtcbiAgICBcImd1aWRlLWxhYmVsXCI6IHtcbiAgICAgIGZvbnRTaXplOiAyMCxcbiAgICAgIGZpbGw6IGRhcmtcbiAgICB9LFxuICAgIFwiZ3VpZGUtdGl0bGVcIjoge1xuICAgICAgZm9udFNpemU6IDMwLFxuICAgICAgZmlsbDogZGFya1xuICAgIH1cbiAgfVxufTsiLCJpbXBvcnQgeyBjc3YgfSBmcm9tICdkMyc7XG5cbmNvbnN0IGNzdlVybCA9ICdodHRwczovL2dpc3QuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2FyanVucmFvNzk2MTIzLzdjMzBmMmI2ZDRhM2EzNzQ2YjAxNTQyNjBhN2Y0NmU4L3Jhdy8wZGEwNmU1ZDJlNTk4NTYxNTJlZTdkNjk2OTRiYmQ5YTc0MTA4MjRlL0NodXJuX2RhdGEuY3N2JztcblxuZXhwb3J0IGNvbnN0IGdldERhdGEgPSBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IGRhdGEgPSBhd2FpdCBjc3YoY3N2VXJsKTtcbiAgXG4gIC8vIEhhdmUgYSBsb29rIGF0IHRoZSBhdHRyaWJ1dGVzIGF2YWlsYWJsZSBpbiB0aGUgY29uc29sZSFcbiAgY29uc29sZS5sb2coZGF0YVswXSk7XG5cbiAgcmV0dXJuIGRhdGE7XG59OyIsImltcG9ydCB2bCBmcm9tICd2ZWdhLWxpdGUtYXBpJztcblxuY29uc3QgYnJ1c2ggPSB2bC5zZWxlY3RJbnRlcnZhbCgpLmVuY29kaW5ncygneCcpO1xuXG5jb25zdCBzYWxhcnlfcmFuZ2UgPSB2bC5tYXJrQmFyKHt3aWR0aDogMn0pXG4gICAgLnNlbGVjdChicnVzaClcbiAgICAuZW5jb2RlKFxuICAgICAgdmwueCgpLmZpZWxkUSgnRXN0aW1hdGVkU2FsYXJ5Jykuc2NhbGUoe1wiemVyb1wiOiB0cnVlfSkudGl0bGUoJ1NlbGVjdCBzYWxhcnkgcmFuZ2UgeW91IHdhbnQgdG8gc2VlJyksXG4gICAgXHR2bC50b29sdGlwKCkuZmllbGRRKCdFc3RpbWF0ZWRTYWxhcnknKVxuICAgIClcbiAgICAud2lkdGgoNzAwKVxuICAgIC5oZWlnaHQoNTApO1xuXG5jb25zdCBwbG90ID0gdmxcblx0XG4gIC5tYXJrUG9pbnQoeyBmaWxsOiB0cnVlLCBzdHJva2U6IGZhbHNlLCBzaXplOjEwIH0pXG4gIC5lbmNvZGUoXG4gICAgdmwueCgpLmZpZWxkUSgnRXN0aW1hdGVkU2FsYXJ5JykuYmluKHsgbWF4YmluczogNTAgfSksXG4gICAgdmwueSgpLmZpZWxkUSgnQ3JlZGl0U2NvcmUnKS5zY2FsZSh7IHplcm86IGZhbHNlIH0pLFxuICAgIHZsLmNvbG9yKCkuZmllbGROKCdFeGl0ZWQnKSxcbiAgICB2bC50b29sdGlwKFsnRXN0aW1hdGVkU2FsYXJ5JywnQ3JlZGl0U2NvcmUnXSksXG4gICAgdmwub3BhY2l0eSgpLmlmKGJydXNoLCB2bC52YWx1ZSgwLjc1KSkudmFsdWUoMC4wNSlcbiAgKS53aWR0aCg3MDApXG4gICAgLmhlaWdodCgzMDApO1xuXG5leHBvcnQgY29uc3Qgdml6ID0gdmwudmNvbmNhdChwbG90LHNhbGFyeV9yYW5nZSkuc3BhY2luZyg1KTsiLCJpbXBvcnQgdmVnYSBmcm9tICd2ZWdhJztcbmltcG9ydCB2ZWdhTGl0ZSBmcm9tICd2ZWdhLWxpdGUnO1xuaW1wb3J0IHZsIGZyb20gJ3ZlZ2EtbGl0ZS1hcGknO1xuaW1wb3J0IHsgSGFuZGxlciB9IGZyb20gJ3ZlZ2EtdG9vbHRpcCc7XG5pbXBvcnQgeyBjb25maWcgfSBmcm9tICcuL2NvbmZpZyc7XG5pbXBvcnQgeyBnZXREYXRhIH0gZnJvbSAnLi9nZXREYXRhJztcbmltcG9ydCB7IHZpeiB9IGZyb20gJy4vdml6JztcblxudmwucmVnaXN0ZXIodmVnYSwgdmVnYUxpdGUsIHtcbiAgdmlldzogeyByZW5kZXJlcjogJ3N2ZycgfSxcbiAgaW5pdDogdmlldyA9PiB7IHZpZXcudG9vbHRpcChuZXcgSGFuZGxlcigpLmNhbGwpOyB9XG59KTtcblxuY29uc3QgcnVuID0gYXN5bmMgKCkgPT4ge1xuICBjb25zdCBtYXJrcyA9IHZpelxuICAgIC5kYXRhKGF3YWl0IGdldERhdGEoKSlcbiAgICAuYXV0b3NpemUoeyB0eXBlOiAnZml0JywgY29udGFpbnM6ICdwYWRkaW5nJyB9KVxuICAgIC5jb25maWcoY29uZmlnKTtcbiAgXG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoYXdhaXQgbWFya3MucmVuZGVyKCkpO1xufTtcbnJ1bigpOyJdLCJuYW1lcyI6WyJjc3YiLCJIYW5kbGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0VBQUE7RUFDQTtFQUNBLE1BQU0sSUFBSSxHQUFHLFNBQVMsQ0FBQztFQUNoQixNQUFNLE1BQU0sR0FBRztFQUN0QixFQUFFLElBQUksRUFBRTtFQUNSLElBQUksTUFBTSxFQUFFLEtBQUs7RUFDakIsSUFBSSxTQUFTLEVBQUUsV0FBVztFQUMxQixHQUFHO0VBQ0gsRUFBRSxLQUFLLEVBQUU7RUFDVCxJQUFJLGFBQWEsRUFBRTtFQUNuQixNQUFNLFFBQVEsRUFBRSxFQUFFO0VBQ2xCLE1BQU0sSUFBSSxFQUFFLElBQUk7RUFDaEIsS0FBSztFQUNMLElBQUksYUFBYSxFQUFFO0VBQ25CLE1BQU0sUUFBUSxFQUFFLEVBQUU7RUFDbEIsTUFBTSxJQUFJLEVBQUUsSUFBSTtFQUNoQixLQUFLO0VBQ0wsR0FBRztFQUNILENBQUM7O0VDaEJELE1BQU0sTUFBTSxHQUFHLGdKQUFnSixDQUFDO0FBQ2hLO0VB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