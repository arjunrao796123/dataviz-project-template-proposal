# Data Visualization Project

## Data

The data I propose to visualize for my project is the churn dataset found in [https://www.kaggle.com/shubh0799/churn-modelling]. I have createdd a gist of this dataset at
[https://gist.github.com/arjunrao796123/7c30f2b6d4a3a3746b0154260a7f46e8]. The dataset consists of 10000 data points which represent customers for a company. Each data point consists of details of the customer like CreditScore, Geography, Age,  Gender etc.. 


## Prototypes

I’ve created a proof of concept visualization of this data.

![Image](Churn_sample.PNG)

The image shows a compariosn between Age and Creditscore. The orange color indicates the customer has churned and the blue dot indicates that the customer has not churned.


## Questions & Tasks

The following tasks and questions will drive the visualization and interaction decisions for this project:

 * Which factors most influence churning of a customer?
 * Which country is responsible for less churning? Is there a specific reason for this?
 * Does the gender and salry affect churning of a customer?

## Sketches
Here are a couple of sketeches
* This image is a depiction of the credit score vs salary.
* We can study how churn is affected here and how these factors influence each other.
  - Since there are 10000 data points, I plan to bin the salaries based on a $10000 increments. 
* Usually low salary can lead to churn and I am hoping to see if the assumption is correct.
* A low credit score can also lead to churn as the customer is a regualr defaulter when it comes to payments and this can be a reason to churn.
* I plan to have a drop dorwn menu where we can view a range of salaries and credit scores.
![Image](Credit_score_salary.jpeg)

* This image is a depiction of gender vs salary. 
* We can check if the customers are paid equally and on what basis a cusotmer of a certain gender churns.
  - The salary should be similar since salary should not be based on gender. There are a lot of issues these days regarding salary and I am hoping to see if this company is not     biased to a particular gender.
* I plan to have a drop down menu from where we can select a range of salaries. Binning will be done in order to reduce the number of data points.

![Image](Gender_Salary.jpeg)

* Since the dataset contains geographical data as well, it will be interesting to see how the company is performing all over the globe.
* I will have a drop down menu which will allow a choice of country
  - Once that is done, there will be a choice of features to display to understand how the feature is for that country.
* This can be used by the company to see where it is not performing well and can narrow down the features to pin point the problem.

## Schedule of Deliverables

* October 10
  - Bin the salaries and have the salaires part of the data ready to plot
  - October 13: Set the range of salaries in the graph for the drop down menu
* October 17
  - Plot the first visualization
  - October 19: Complete inclusion of the drop down menu
  - October 21: Ensure no erros in the code
* October 24
  - Plot the second visualization without any errors
  - October 26: Include the drop down menus and ensure no errors in the code
* October 30
  - Plot the third visualization
  - October 31: Have the drop down of countries ready for display
  - November 1: Include the features in the drop down menu and have no errors 
* November 4
  - Finalize and implement any inputs provided to make the visualization appealing.
