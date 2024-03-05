# Professional Portfolio: Robotics, ML, and AI

---

**Certifications**<br>
<small>
[Specialized Program: Machine Learning (Ongoing)  -  Stanford/DeepLearning.AI](/pdf/JOSE EDGAR HERNANDEZ.pdf)<br>
<small>
[CS50 Introduction to Artificial Intelligence (2024)  -  HarvardX](/pdf/CS50AI.pdf)<br>
<small>
[Diploma in Data Science (2021)  -  ITPE](/pdf/JOSE EDGAR HERNANDEZ.pdf)
<br>

## Robotics

<div style="text-align: center;">
  <big><a href="https://youtu.be/Msp6sliRH2Q">Object classification and grasp pose prediction (2024)</a></big>
</div>

<div style="text-align: center"><small><b>SceneGrasp - tf2 - ros - realsense - UR5 - roslibpy <br><br></b></small></div>

<div style="text-align: justify; margin-bottom:25px"> <small>Implementation and testing of SamsungLabs' SceneGrasp model at the Kavraki Lab at Rice University. Used a UR5 robot and an Intel Realsense D455 camera. This project involved calibrating the workspace, transforming different frame of references, installing and using the SceneGrasp model developed by Samsung Lbs, and building quality code to run custom demos. </small></div>

<img src="https://github.com/edgarcancinoe/edgarcancinoe.github.io/blob/master/images/SceneGraspDemo.gif?raw=true"/>

<img src="https://github.com/edgarcancinoe/edgarcancinoe.github.io/blob/master/images/grasps.png" width="500"/>


**Key tasks**:
<small><br>- Construction of a class that allows to customize demo runs: activate vision-based detection, feed streaming, simulation environment, ROS connectivity, etc.</small>
<small><br>- Management of tasks and listeners for efficient use of resources.</small>
<small><br>- Implementation using _Roslibpy_ ROS bridge library for ease of use in various devices.</small>
<small><br>- Compute camera-to-world and word-to-robot frame transforms (SceneGrasp) and use of ROS Transform package (AprilTag objects and world origin).</small>

<small>**Keywords**: computer vision, point cloud, pick and drop, coordinate frame transforms</small>

---

<div style="text-align: center;">
  <big><a href="/pdf/xArm6_DDPG_HER.pdf">DDPG + HER for xArm6 path planning (Mujoco & ROS) (2023)</a></big>
</div>

<div style="text-align: center"><small><b>reinforcement learning - mujoco - gym - ros - moveit - xarm6 <br><br></b></small></div>

<div style="text-align: justify; margin-bottom:25px"> <small>Implementation of Deep Deterministic Policy Gradient (DDPG) with Hindsight Experience Replay (HER) for trajectory planning of a 6-DOF robotic arm to move from a starting pose to a target position.</small></div>

<img src="https://github.com/edgarcancinoe/xarm_DDPG_HER/blob/master/results.gif?raw=true"/>

Cartesian path (waypoints) | Consecutively setting joint pose
:-------------------------:|:-------------------------:
<img src="images/ddpg_xarm6/positionReachROS.gif?raw=true"/> |  <img src="images/ddpg_xarm6/jointsReachROS.gif?raw=true"/>

**Resources** <small><br></small>
<div style="text-align: center; display: flex; margin-bottom: 10px;">
  <small style="margin-right: 10px;"><a href="https://github.com/edgarcancinoe/xArm6_DDPG_HER">DDPG+HER repo</a></small>
  <small style="margin-right: 10px;"><a href="https://github.com/edgarcancinoe/xArm6_DDPG_ROS">ROS Impl. (xArm6)</a></small>
  <small style="margin-right: 10px;"><a href="https://github.com/edgarcancinoe/home_DDPG_ROS">ROS Impl. (Dashgo)</a></small>
  <small style="margin-right: 10px;"><a href="https://www.youtube.com/watch?v=VB5VkgwCG1A">Mujoco & ROS video</a></small>  
  <small style="margin-right: 10px;"><a href="/pdf/xArm6_DDPG_HER.pdf">See paper</a></small>  
</div>
<br>

**Key tasks**:
<small><br> - DDPG implementation based on OpenAI baselines.</small>
<small><br>- Training of policy using OpeinAI gym.</small>
<small><br>- Application of the developed model using ROS and MoveIt in RViz simulation for real xArm.</small>

<small>**Keywords**: reinforcement learning, DDPG, HER, gym, mujoco, ros, xarm6, moveit</small>

---

<div style="text-align: center;">
  <big><a href="https://www.youtube.com/watch?v=lhTBHQspGjc">Computer Vision-Powered Autonomous Driving Vehicle (2023)</a></big>
</div>

<div style="text-align: center"><small><b> ros - opencv - YOLOv5 - nvidia jetson<br><br></b></small></div>

<div style="text-align: justify; margin-bottom: 10px;"> <small>School project in collaboration with Manchester Robotics:<br> Development of an self-driving vehicle prototype using ROS, YOLOv5, and Nvidia Jet Bot kit.
The challenge was to develop an autonomous navigation prototype using computer vision, deep learning, and intelligent control in a scaled environment that will simulate roads with obstacles, junctions and curves.</small></div>

<img src="images/puzzlebot/linefollower.gif?raw=true"/>

<img src="images/puzzlebot/both.gif?raw=true"/>

**Resources** <small><br></small>
<div style="text-align: center; display: flex; margin-bottom: 10px;">
  <small style="margin-right: 10px;"><a href="https://www.youtube.com/watch?v=lhTBHQspGjc">Watch on Youtube</a></small>
</div><br>

**Key tasks**:
<small><br>- Development of Computer Vision-based line follower.</small>
<small><br>- Implementation of PI linear controller for navigation.</small>
<small><br>- Training and implementation of YOLOv5 model in Nvidia Jetson Nano for transit signals recognition.</small>


<small>**Keywords**: control, yolo, deep learning, ros, edge ai, nvidia, computer vision, autonomous driving</small>

---

<div style="text-align: center;">
  <big><a href="/xarm6_visual_servoing">Visual Servoing of xArm (2023)</a></big>
</div>
<div style="text-align: center"><small><b>ros - opencv - moveit - xarm6 <br><br></b></small></div>

<div style="text-align: justify; margin-bottom: 10px;"> <small>Python project for visual servoing of a 6-DOF robotic arm (xArm6). An external camera and QR codes are used to identify the arm's end effector and target positions.</small></div>
<img src="images/visualservoing.gif?raw=true"/>

**Resources** <small><br></small>
<div style="text-align: center; display: flex; margin-bottom: 10px;">
  <small style="margin-right: 10px;"><a href="https://youtu.be/yTxkO5lXrIg">Watch on Youtube</a></small><br>
  <small style="margin-right: 10px;"><a href="https://github.com/edgarcancinoe/xarm6_visual_servoing">Project repository</a></small>
</div>
<br>

**Key tasks**:
<small><br> - Estimation of target's position coordinates relative to the arm's end effector.</small>
<small><br>- Trajectory planning by inverse kinematics utilizing MoveIt.</small>
<small><br>- Implementation of CV Python scripts in ROS.</small>

<small>**Keywords**: computer vision, opencv, ros, xarm, moveit</small>

<br>


## Machine Learning

---

<div style="text-align: center;">
  <big><a href="/regressors">Regression models for estimating semi-trailer truck loading duration (2023)</a></big>
</div>
<div style="text-align: center"><small><b>python - pandas - keras - tensorflow - scikit-learn - matplotlib</b><br><br></small></div>

<div style="text-align: justify"> <small>Application of machine learning models to estimate the duration of semi-trailer truck loading maneuvers for a tissue paper distribution plant, for both bulk and pallet operations, given product quantity, physical dimensions, and number of active operators.</small> </div>

<br>

<img src="images/regressors/target_vs_qty_target_volume_bulk.png?raw=true"/>

<img src="images/regressors/Multi-layer%20Perceptron%20with%20quadratic%20features_predictions_VolumeCategory_bulk.png?raw=true"/>


**Key tasks:**
<small><br>- Data cleaning (invalid data and outlier elimination, Gaussian noise addition).</small>
<small><br>- Feature engineering and data augmentation (discovered useful relationships in the data and engineered an invalid data recovery strategy).</small>
<small><br>- Model tuning and training (implementation of Ridge Regression, Support Vector Regression and a Multi-Layer Perceptron NN).</small>
  
  <small>**Keywords**: regression, multi-layer perceptron, neural network, support vector regression, ridge</small>

---

<div style="text-align: center;">
  <big><a href="/project3">Predictive analysis for product demand (2023)</a></big>
</div>
<div style="text-align: center"><small><b>python - pandas - keras - tensorflow - scikit-learn - matplotlib</b><br><br></small></div>

<small>Implemented SARIMA satistic model and a LSTM Recurrent Neural Network to make a 2 year forecast of product demand for a glasses frame distributor company.</small>
    
<img src="images/Screenshot 2023-04-17 at 0.45.31.png?raw=true"/>
<img src="images/LSTM.png?raw=true"/>

**Key tasks:**
<small><br>- Data manipulation of raw sales record.</small>
<small><br>- Application of SARIMA and LSTM models for predictions.</small>
<small><br>- Development of intuitive python interface in Colab for the client's continous use.</small>


<small>**Keywords**: time series, forecasting, lstm, sarima, recurrent neural network</small>

## Other Projects
[Intelligent Air Pressure Control System](/air_pressure_control.md)<br>
[Music Recognition Algorithm in Matlab](https://github.com/edgarcancinoe/music_recognition)
