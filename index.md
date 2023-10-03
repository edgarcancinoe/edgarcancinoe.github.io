# Machine Learning & Robotics Portfolio

---
**Education**<br>
B.S. in Robotics and Digital Systems Engineering 
<small><br>
Tecnologico de Monterrey (June, 2024)</small>

**Certifications**
<br>
<small>
[Specialized Program: Machine Learning (Ongoing)  -  Stanford/DeepLearning.AI](/pdf/JOSE EDGAR HERNANDEZ.pdf)<br><small>
[CS50 Introduction to Artificial Intelligence (Ongoing)  -  HarvardX](/pdf/JOSE EDGAR HERNANDEZ.pdf)<br>
<small>
[Diploma in Data Science (2021)  -  ITPE](/pdf/JOSE EDGAR HERNANDEZ.pdf)
<br>

## Data Science / Machine Learning

---

<big>[1. Regression models for estimating semi-trailer truck loading duration (2023)](/regressors)</big>

<div style="text-align: center"><small><b>python - pandas - keras - tensorflow - scikit-learn - numpy - matplotlib</b><br><br></small></div>

<div style="text-align: justify"> Application of machine learning models to estimate the duration of semi-trailer truck loading maneuvers for a tissue paper distribution plant, for both bulk and pallet operations, given product quantity, physical dimensions, and number of active operators. </div>

<br>

<img src="images/regressors/target_vs_qty_target_volume_bulk.png?raw=true"/>

<img src="images/regressors/Multi-layer%20Perceptron%20with%20quadratic%20features_predictions_VolumeCategory_bulk.png?raw=true"/>


Key tasks:
- Data cleaning (invalid data and outlier elimination, Gaussian noise addition).
- Feature engineering and data augmentation (discovered useful relationships in the data and engineered an invalid data recovery strategy).
- Model tuning and training (implementation of Ridge Regression, Support Vector Regression and a Multi-Layer Perceptron NN).


The intention to publish the process documentation and results is currently pending, awaiting revision for privacy considerations.

  
  <small>**Keywords**: regression, multi-layer perceptron, neural network, support vector regression, svr, ridge</small>

---

  <big> [2. Predictive analysis for product demand (2023)](/project3) </big>

<div style="text-align: center"><small><b>python - pandas - keras - tensorflow - scikit-learn - numpy - matplotlib</b><br><br></small></div>

Implemented SARIMA satistic model and a LSTM Recurrent Neural Network to make a 2 year forecast of product demand for a glasses frame distributor company.
  
  
<img src="images/Screenshot 2023-04-17 at 0.45.31.png?raw=true"/>
<img src="images/LSTM.png?raw=true"/>

Key tasks:
- Data manipulation of raw sales record.
- Application of SARIMA and LSTM models for predictions.
- Development of intuitive python interface in Colab for the client's continous use.

  <small>**Keywords**: time series, forecasting, lstm, sarima, recurrent neural network</small>

<br>

## Robotics Projects

---


<big>[2. Computer Vision-Powered Autonomous Driving Vehicle (2023)](https://www.youtube.com/watch?v=lhTBHQspGjc)</big>

<div style="text-align: center"><small><b> ros - opencv - YOLOv5 - nvidia jetson<br><br></b></small></div>

<div style="text-align: justify"> School project in collaboration with Manchester Robotics: Development of an self-driving vehicle prototype using ROS, YOLOv5, and Nvidia Jet Bot kit.
The challenge was to develop an autonomous navigation prototype using computer vision, deep learning, and intelligent control in a scaled environment that will simulate roads with obstacles, junctions and curves. </div>
<br>

<img src="images/puzzlebot/linefollower.gif?raw=true"/>
<br>
<img src="images/puzzlebot/both.gif?raw=true"/>

<br>

<small><a href="https://www.youtube.com/watch?v=lhTBHQspGjc">Watch on Youtube</a></small><br>

Key tasks:
- Development of Computer Vision-based line follower.
- Implementation of PI linear controller for navigation.
- Training and implementation of YOLOv5 model in Nvidia Jetson Nano edge device for transit signals recognition.

  <small>**Keywords**: control, yolo, deep learning, ros, edge ai, nvidia, computer vision, autonomous driving</small>

<br>

---

<big>[3. Visual Servoing of xArm (2023)](/xarm6_visual_servoing)</big>

<div style="text-align: center"><small><b>python - ros - opencv - moveit - xarm6 <br><br></b></small></div>

<div style="text-align: justify"> Python project for visual servoing of a 6-DOF robotic arm (xArm6). An external camera and QR codes are used to identify the arm's end effector and target positions.</div>

<br>

<img src="images/visualservoing.gif?raw=true"/>

<small><a href="https://youtu.be/yTxkO5lXrIg">Watch on Youtube</a></small><br>

Key tasks:
- Estimation of target's position coordinates relative to the arm's end effector.
- Trajectory planning by inverse kinematics utilizing MOVEit.
- Implementation of CV Python scripts in ROS.

<br>

  <small>**Keywords**: computer vision, opencv, ros, xarm, moveit</small>

