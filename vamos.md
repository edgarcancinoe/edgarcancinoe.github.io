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
Ridge and Support Vector Regression, and a Multi-Layer Perceptron Neural Network, were applied. Furthermore, individual models were developed for both bulk and pallet loading maneuvers, taking into account the unique characteristics and requirements of each loading scenario.<br><br>
</div>

#### Keywords:
Regression, Ridge, Support Vector Regression, Machine Learning, Neural Network, Multi-Layer Perceptron

<br>

### 1. Background
<div style="text-align: justify">
In the quest to streamline trailer loading operations and the overall performance of
distribution plants, it is crucial to ascertain the amount of a plant’s maximum capacity
being utilized. 
<br><br>
The goal of these models is to provide a solid standart-time estimating tool for scheduled operations,
which can provide valuable insights into the performance of a distribution
plant and its workers, allowing for informed decision-making and improved logistical planning.
<br><br>

This project was completed as a freelancing job. <br><br>
</div>


### 3. Approach

#### Data
<div style="text-align: justify">
A manually collected dataset consisting in more than 27,000 operations was utilized, gathered from a specific distribution plant where these take place. Data held high variation and recording noise, and most features had low correlation to the target variable.
</div>
<br><br>
  <div  style="text-align: center;">
  <img src="images/vamos/bulkcorr.png?raw=true" style="display: inline-block; width: 500px; height: auto;"/>
  <img src="images/vamos/palletcorr.png?raw=true" style="display: inline-block; width: 500px; height: auto;"/>
  </div>
<br><br>

Product quantity, number of stevedores and dimensional features held a relationship to target variable, which can be visualized in the following plots:
<br><br>
  <div  style="text-align: center;">
  <img src="images/vamos/plot_Num%20Stevedores.png?raw=true" style="display: inline-block; width: 500px; height: auto;"/>
  <img src="images/vamos/plot_Volume%20(scaled).png?raw=true" style="display: inline-block; width: 500px; height: auto;"/>
  </div>
<br><br>

#### Modeling
Three regression models were applied and compared to estimate the maneuver durations:<br>
  
* Ridge Regression<br>
* Support Vector Regression (SVR)<br>
* Multi-Layer Perceptron (MLP)<br>

<br>

The models effectively mimic the target variable's behavior and response to changes in the most relevant variables.

* Number of stevedores

<img src="images/vamos/volumes_and_stevedores_target_pallet.png?raw=true" style="display: inline-block; width: 750px; height: auto;"/>
      <img src="images/vamos/Neural Network (deg=2)_volumes_and_stevedores.png?raw=true" style="display: inline-block; width: 750px; height: auto;"/>
      
* Volume
<br><br>
  <div  style="text-align: center;">
  <img src="images/vamos/target_vs_qty_target_volume_bulk.png?raw=true" style="display: inline-block; width: 750px; height: auto;"/>
  <img src="images/vamos/Multi-layer%20Perceptron%20with%20quadratic%20features_predictions_VolumeCategory_bulk.png?raw=true" style="display: inline-block; width: 750px; height: auto;"/>
  </div>
<br><br>

Similar plots are shown for the pallet operation models.



