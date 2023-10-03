## Predictive Analysis for product demand forecast

**Project description:** 
<div style="text-align: justify"> Using times-series forecasting models to estimate
product demand on lens frames for a distributor company. </div><br>

### Abstract
<div style="text-align: justify"> 
This document presents the application of statistical and machine learning methods for predicting the sales of lens frames of a distributor company in Mexico. The project’s goal was to generate product demand forecasts two years into the future by grouping products by brand and using the information as input for an future Supply Chain Management strategy (SCM). Time-series forecasting models, specifically SARIMA and LSTM neural networks, were employed and their performance capture the sales trends and patterns was evaluated and compared.
This report provides a comprehensive documentation of the entire development and decision-making processes involved in the project.
</div>
<br>
<b>Keywords:</b><br>
times-series, forecasting, SARIMA, LSTM, neural networks, machine learning, data science


### 1. User story
<div style="text-align: justify"> 
This project was completed as a freelancing job. The team in charge of acquiring stock for the distributor company, required an accurate demand forecast, necessary to determine the appropriate amount of product to purchase in order to meet customer demand and ensure that their stock would not run out at any time.
</div>
<br>
### 2. Background
<div style="text-align: justify"> 
Predictive analysis has huge potential on Supply Chain Management, as it allows companies to make informed decisions on inventory management and efficiently plan their re-stocking strategies.
As the goal is to produce an accurate and robust forecast, two powerful forecasting methods are applied and compared: SARIMA and LSTM.
</div>
* SARIMA
Seasonal Autorregresive Integrated Moving Average is a time-series statistical method, particularly effective in describin clear periodic patterns.
* LSTM
Type of recurrent neural network, highly effective for the analysis of sequential data and capturing long-term dependencies in time-series.

### 3. Approach
<div style="text-align: justify"> 
Both methods are applied in a training subset consisting on 42 of the 48 months of data, and evaluated on the remaining test subset. In the ultimate deliverable for stakeholders, the user is provided with the option to choose their preferred forecasting approach (SARIMA or LSTM), or employing a train-test methodology to determine the most suitable method for each individual brand.</div>
