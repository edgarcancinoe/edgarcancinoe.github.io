## Regression models for estimating semi-trailer truck loading duration

**Project description:** 
<div style="text-align: justify">
Application of machine learning models to estimate the duration of semi-trailer truck loading maneuvers for a tissue paper distribution plant, for both bulk and pallet operations, given product quantity, physical dimensions,and number of active operators.
</div>
<br>

### Abstract
<div style="text-align: justify">
This project consistes in the application of machine learning regression models for estimating the loading times of trailers carrying tissue paper products.<br><br>
The models are based on various factors, including product quantity, weight and spatial dimensions of the products, and the number of operators involved in the loading process.<br><br>
Three machine learning methods, Ridge and Support Vector Regression, and a Multi-Layer Perceptron Neural Network, were applied and compared. Furthermore, individual models were developed for both bulk and pallet loading maneuvers, taking into account the unique characteristics and requirements of each loading scenario.<br><br>
</div>

#### Keywords:
Regression, Ridge, Support Vector Regression, Machine Learning, Neural Network, Multi-Layer Perceptron

<br>

### 1. Background
<div style="text-align: justify">
In the quest to streamline trailer loading operations and the overall performance of
distribution plants, it is crucial to ascertain the amount of a plant’s maximum capacity
being utilized. 
<br>
The goal of these models is to provide a solid standart-time estimating tool for scheduled operations,
which can provide valuable insights into the performance of a distribution
plant and its workers, allowing for informed decision-making and improved logistical planning.
<br>

This project was completed as a freelancing job. 
</div>


### 3. Approach

#### Data
<div style="text-align: justify">
A manually collected dataset consisting in more than 27,000 operations was utilized, gathered from a specific distribution plant where these take place. Data held high variation and recording noise, and most features had low correlation to the target variable.

Three regression models were applied and compared to try to estimate the maneuver durations:
* Ridge Regression
* Support Vector Regression (SVR)
* Multi-Layer Perceptron (MLP)
  
Type of recurrent neural network, highly effective for the analysis of sequential data and capturing long-term dependencies in time-series.

### 4. Approach
<div style="text-align: justify">
Both methods are applied in a training subset consisting on 42 of the 48 months of data, and evaluated on the remaining test subset. In the ultimate deliverable for stakeholders, the user is provided with the option to choose their preferred forecasting approach (SARIMA or LSTM), or employing a train-test methodology to determine the most suitable method for each individual brand.
</div>


