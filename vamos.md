## Regression models for estimating semi-trailer truck loading duration

**Project description:** 

Application of machine learning models to estimate the duration of semi-trailer truck loading maneuvers for a tissue paper distribution plant, for both bulk and pallet operations, given product quantity, physical dimensions,and number of active operators.

### Abstract

This report describes the application of machine learning regression models for estimating the loading times of trailers carrying tissue paper products. The model is based on various factors, including the quantity, weight, spatial dimensions of the products, and the number of operators involved in the loading process. A manually collected dataset was utilized, gathered from a specific distribution plant where these operations usually take place.
Three machine learning methods, Ridge and Support Vector Regression, and a Multi-Layer Perceptron Neural Network, were applied and compared. Furthermore, individual models were developed for both bulk and pallet loading, taking into account the unique characteristics and requirements of each loading scenario.
This work serves as a precursor to an ongoing project, aimed at achieving a substantial improvement in the optimization of the operation of distribution plants. The ultimate goal of this research is to leverage thd dataset to develop a precise and reliable tool for estimating the required times for these operations. The results obtained in this study lay the foundation for the further development of this project, demonstrating the potential and significance of the employed regression machine learning methods for this end.

#### Keywords:
times-series, forecasting, SARIMA, LSTM, neural networks, machine learning, data science

[View project report (PDF)](/pdf/pa_sarima_lstm.pdf)


### 1. User story

This project was completed as a freelancing job. The team in charge of acquiring stock for the distributor company, required an accurate demand forecast, necessary to determine the appropriate amount of product to purchase in order to meet customer demand and ensure that their stock would not run out at any time.

### 3. Background
Predictive analysis has huge potential on Supply Chain Management, as it allows companies to make informed decisions on inventory management and efficiently plan their re-stocking strategies.
As the goal is to produce an accurate and robust forecast, two powerful forecasting methods are applied and compared: SARIMA and LSTM.

* SARIMA
Seasonal Autorregresive Integrated Moving Average is a time-series statistical method, particularly effective in describin clear periodic patterns.
* LSTM
Type of recurrent neural network, highly effective for the analysis of sequential data and capturing long-term dependencies in time-series.

### 4. Approach
Both methods are applied in a training subset consisting on 42 of the 48 months of data, and evaluated on the remaining test subset. In the ultimate deliverable for stakeholders, the user is provided with the option to choose their preferred forecasting approach (SARIMA or LSTM), or employing a train-test methodology to determine the most suitable method for each individual brand.
