import { csv } from 'd3';

const csvUrl = 'https://gist.githubusercontent.com/arjunrao796123/7c30f2b6d4a3a3746b0154260a7f46e8/raw/0da06e5d2e59856152ee7d69694bbd9a7410824e/Churn_data.csv';

export const getData = async () => {
  const data = await csv(csvUrl);
  
  // Have a look at the attributes available in the console!
  console.log(data[0]);

  return data;
};