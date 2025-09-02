## Regression models for estimating semi-trailer truck loading duration

**Project description:** 
<div style="text-align: justify">
Application of <b>machine learning models to estimate the duration of semi-trailer truck loading maneuvers</b> for a tissue paper distribution plant, for both bulk and pallet operations, given product quantity, physical dimensions, and number of active operators.
</div>
<br>
<a href="https://edgarcancinoe.github.io/projects/truck_loading_durations/regression_for_durations.pdf">View paper</a>
<br>

### Abstract
<div style="text-align: justify">
This project consistes in the application of machine learning regression models for estimating the loading times of trailers carrying tissue paper products.<br><br>
The models are based on various factors, including product quantity, weight and spatial dimensions of the products, and the number of operators involved in the loading process.<br><br>
Ridge and Support Vector Regression, and a Multi-Layer Perceptron Neural Network were employed. Furthermore, individual models were developed for both bulk and pallet loading maneuvers, taking into account the unique characteristics and requirements of each loading scenario.<br>
</div>
<br>
<b>Keywords</b>:<br>
regression, ridge, support vector regression, machine learning, neural network, multi-layer perceptron

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


### 2. Data

<div style="text-align: justify">
A manually collected dataset consisting in more than 27,000 operations was utilized, gathered from a specific distribution plant where these take place. Data held high variation and recording noise, and most features had low correlation to the target variable.
</div>
<br><br>
  <div  style="text-align: center; width:400px">
  <img src="https://github.com/edgarcancinoe/edgarcancinoe.github.io/blob/master/images/projects/truck_loading_durations/bulkcorr.png?raw=true" style="display: inline-block; width: 400px; height: auto;"/>
  <img src="https://github.com/edgarcancinoe/edgarcancinoe.github.io/blob/master/images/projects/truck_loading_durations/palletcorr.png?raw=true" style="display: inline-block; width: 400px; height: auto;"/>
  </div>
<br><br>

Product quantity, number of stevedores and dimensional features held a relationship to target variable, which can be visualized in the following plots:
<br><br>
  <div  style="text-align: center; width:400px">
  <img src="https://github.com/edgarcancinoe/edgarcancinoe.github.io/blob/master/images/projects/truck_loading_durations/plot_Num%20Stevedores.png?raw=true" style="display: inline-block; width: 400px; height: auto;"/>
  <img src="https://github.com/edgarcancinoe/edgarcancinoe.github.io/blob/master/images/projects/truck_loading_durations/plot_Volume%20(scaled).png?raw=true" style="display: inline-block; width: 400px; height: auto;"/>
  </div>
<br><br>

### 3. Approach
Three regression models were applied and compared to estimate the maneuver durations:<br>
  
* Ridge Regression<br>
* Support Vector Regression (SVR)<br>
* Multi-Layer Perceptron (MLP)<br><br>

The models effectively mimic the target variable's behavior and response to changes in the most relevant variables.
<div style="text-align: center">
<i><b>Response to changes in number of stevedores</b></i>
</div>

<br>

<img src="https://github.com/edgarcancinoe/edgarcancinoe.github.io/blob/master/images/projects/truck_loading_durations/volumes_and_stevedores_target.png?raw=true" style="display: inline-block; width: 750px; height: auto;"/>
      <img src="https://github.com/edgarcancinoe/edgarcancinoe.github.io/blob/master/images/projects/truck_loading_durations/Neural Network (deg=2)_volumes_and_stevedores.png?raw=true" style="display: inline-block; width: 750px; height: auto;"/>
      <br>
<div style="text-align: center">
<i><b>Response to changes in volume</b></i>
</div>

<br>

  <div  style="text-align: center;">
  <img src="https://github.com/edgarcancinoe/edgarcancinoe.github.io/blob/master/images/projects/truck_loading_durations/target_vs_qty_target_volume_bulk.png?raw=true" style="display: inline-block; width: 750px; height: auto;"/>
  <img src="https://github.com/edgarcancinoe/edgarcancinoe.github.io/blob/master/images/projects/truck_loading_durations/Multi-layer%20Perceptron%20with%20quadratic%20features_predictions_VolumeCategory_bulk.png?raw=true" style="display: inline-block; width: 750px; height: auto;"/>
  </div>
<br>
<br>
<br>
Similar plots are shown for pallet operation models.
<div style="text-align: center">
<i><b>Response to changes in number of stevedores</b></i>
</div>

<br>

<img src="https://github.com/edgarcancinoe/edgarcancinoe.github.io/blob/master/images/projects/truck_loading_durations/volumes_and_stevedores_target_pallet.png?raw=true" style="display: inline-block; width: 750px; height: auto;"/>
<img src="https://github.com/edgarcancinoe/edgarcancinoe.github.io/blob/master/images/projects/truck_loading_durations/SVR (deg=2)_volumes_and_stevedores_pallet.png?raw=true" style="display: inline-block; width: 750px; height: auto;"/>

<div style="text-align: center">

<br>
  
<i><b>Response to changes in pallet dimension</b></i>

</div>
<br>
  <div  style="text-align: center;">
  <img src="https://github.com/edgarcancinoe/edgarcancinoe.github.io/blob/master/images/projects/truck_loading_durations/target_vs_qty_target_dimension_pallet.png?raw=true" style="display: inline-block; width: 750px; height: auto;"/>
  <img src="https://github.com/edgarcancinoe/edgarcancinoe.github.io/blob/master/images/projects/truck_loading_durations/SVR (deg=2)_predictions_DimensionCategory_pallet.png?raw=true" style="display: inline-block; width: 750px; height: auto;"/>
  </div>
<br>

### 4. Results and score metrics

<div  style="text-align: justify;">
Below, the test score results for each of the models, after 8-fold cross-validation.
</div><br>

<div  style="text-align: center;">
  
<i><b>Bulk operations</b></i>
<br>
  <img src="https://github.com/edgarcancinoe/edgarcancinoe.github.io/blob/master/images/projects/truck_loading_durations/bulkresults.png?raw=true" style="display: inline-block; width: 250px; height: auto;"/>
</div>
<br>
<div  style="text-align: center;">
  
<i><b>Pallet operations</b></i>
<br>
  <img src="https://github.com/edgarcancinoe/edgarcancinoe.github.io/blob/master/images/projects/truck_loading_durations/palletresults.png?raw=true" style="display: inline-block; width: 250px; height: auto;"/>
</div>
