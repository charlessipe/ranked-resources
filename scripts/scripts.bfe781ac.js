"use strict";angular.module("rankedResourcesApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl",controllerAs:"about"}).when("/learning-javascript",{templateUrl:"views/learning-javascript.html",controller:"LearningJavascriptCtrl",controllerAs:"learningJavascript"}).when("/create-profile",{templateUrl:"views/create-profile.html",controller:"CreateProfileCtrl",controllerAs:"createProfile"}).when("/javascript-coaches",{templateUrl:"views/javascript-coaches.html",controller:"JavascriptCoachesCtrl",controllerAs:"javascriptCoaches"}).when("/coach-profile",{templateUrl:"views/coach-profile.html",controller:"CoachProfileCtrl",controllerAs:"coachProfile"}).when("/rails-coaches",{templateUrl:"views/rails-coaches.html",controller:"RailsCoachesCtrl",controllerAs:"railsCoaches"}).when("/contact-coach",{templateUrl:"views/contact-coach.html",controller:"ContactCoachCtrl",controllerAs:"contactCoach"}).when("/sign-up",{templateUrl:"views/sign-up.html",controller:"SignUpCtrl",controllerAs:"signUp"}).when("/log-in",{templateUrl:"views/log-in.html",controller:"LogInCtrl",controllerAs:"logIn"}).when("/dashboard",{templateUrl:"views/dashboard.html",controller:"DashboardCtrl",controllerAs:"dashboard"}).when("/freecodecamp-coaches",{templateUrl:"views/freecodecamp-coaches.html",controller:"FreecodecampCoachesCtrl",controllerAs:"freecodecampCoaches"}).otherwise({redirectTo:"/"})}]),angular.module("rankedResourcesApp").controller("MainCtrl",["$scope",function(a){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"],a.userName="Charles"}]),angular.module("rankedResourcesApp").controller("AboutCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("rankedResourcesApp").controller("LearningJavascriptCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("rankedResourcesApp").controller("CreateProfileCtrl",["$scope",function(a){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"],a.newProfile=function(){firebase.database().ref("users/"+a.userName).set({firstName:a.firstName,lastName:a.lastName,bio:a.newBio,avail:a.newAvail,areas:a.newAreas,image:a.newImage,portfolio:a.newPortfolio,twitter:a.newTwitter}),a.userName="",a.firstName="",a.lastName="",a.newBio="",a.newAvail="",a.newAreas="",a.newImage="",a.newPortfolio="",a.newTwitter=""};var b=firebase.storage().ref();b.child("images");a.handleFileSelect=function(a){var a=document.getElementById("file").files[0],c={contentType:a.type};b.child("images/"+a.name).put(a,c).then(function(a){console.log("Uploaded",a.totalBytes,"bytes."),console.log(a.metadata);var b=a.metadata.downloadURLs[0];console.log("File available at",b),document.getElementById("linkbox").innerHTML='<a href="'+b+'">Click For File</a>'}).catch(function(a){console.error("Upload failed:",a)})}}]),angular.module("rankedResourcesApp").controller("JavascriptCoachesCtrl",["$scope",function(a){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"];var b=(firebase.database(),firebase.database().ref("users/"));b.on("value",function(b){console.log(b.val()),a.users=b.val();var c=b.val();a.usersArray=[],a.currentFilter="javascript";for(var d in c)c.hasOwnProperty(d)&&a.usersArray.push(c[d]);console.log(a.usersArray),a.$apply()}),a.checkLoginStatus=function(){firebase.auth().onAuthStateChanged(function(b){b?(console.log(b),a.currentUserEmail=b.email,a.currentUserId=b.uid,console.log(a.currentUserEmail),console.log(a.currentUserId),a.$apply()):console.log("Please log into your account")})}(),a.saveCoach=function(b){console.log("Coach number "+b+" added"),alert("Coach number "+b+" added"),alert(a.currentUserId),alert(a.usersArray[b].firstName+" "+a.usersArray[b].lastName),firebase.database().ref("students/"+a.currentUserId+"/favorites/"+Date.now()).set({name:a.usersArray[b].firstName+" "+a.usersArray[b].lastName,favoriteDate:moment.unix(Date.now()).format("MMM DD h:mm A")})}}]),angular.module("rankedResourcesApp").controller("CoachProfileCtrl",["$scope",function(a){var b=(firebase.database(),firebase.database().ref("users/"));b.on("value",function(b){console.log(b.val()),a.users=b.val(),a.$apply(),console.log("Coach1: "+a.users.andyj.firstName+" "+a.users.andyj.lastName+" "+a.users.andyj.bio)})}]),angular.module("rankedResourcesApp").controller("RailsCoachesCtrl",["$scope",function(a){var b=(firebase.database(),firebase.database().ref("users/"));b.on("value",function(b){console.log(b.val()),a.users=b.val();var c=b.val();a.usersArray=[],a.currentFilter="rails";for(var d in c)c.hasOwnProperty(d)&&a.usersArray.push(c[d]);console.log(a.usersArray),a.$apply()}),a.checkLoginStatus=function(){firebase.auth().onAuthStateChanged(function(b){b?(console.log(b),a.currentUserEmail=b.email,a.currentUserId=b.uid,console.log(a.currentUserEmail),console.log(a.currentUserId),a.$apply()):console.log("Please log into your account")})}()}]),angular.module("rankedResourcesApp").controller("ContactCoachCtrl",["$scope",function(a){a.contactCoach=function(){firebase.database().ref("messages/"+Date.now()).set({coachName:a.coachName,firstName:a.firstName,lastName:a.lastName,email:a.newEmail,message:a.newMessage}),a.coachName="",a.firstName="",a.lastName="",a.newMessage="",a.newEmail=""}}]),angular.module("rankedResourcesApp").controller("SignUpCtrl",["$scope",function(a){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"],a.testString="Hello this is a test string",a.createUser=function(){var b=a.userEmail,c=a.userPassword;console.log(b),console.log(c),firebase.auth().createUserWithEmailAndPassword(b,c).catch(function(a){var b=a.code,c=a.message;console.log(b),console.log(c)})}}]),angular.module("rankedResourcesApp").controller("LogInCtrl",["$scope",function(a){a.logInUser=function(){console.log("start login");var b=a.loginEmail,c=a.loginPassword;firebase.auth().signInWithEmailAndPassword(b,c).catch(function(a){a.code,a.message;console.log(users.email)}).then(function(a){console.log(a.uid),console.log(a.email)})},a.getAuth=function(){var b,c,d,e,f=firebase.auth().currentUser;null!=f&&(b=f.displayName,c=f.email,d=f.photoURL,e=f.uid,a.currentUserId=e),console.log(b),console.log(c),console.log(e)},a.checkLoginStatus=function(){firebase.auth().onAuthStateChanged(function(b){b?(console.log(b),a.currentUserEmail=b.email,a.currentUserId=b.uid,console.log(a.currentUserEmail),console.log(a.currentUserId),a.$apply()):console.log("Please log into your account")})}(),a.logOut=function(){firebase.auth().signOut().then(function(){},function(a){}),console.log("Logging out")}}]),angular.module("rankedResourcesApp").controller("DashboardCtrl",["$scope",function(a){var b=firebase.auth().currentUser;b.updateProfile({displayName:b.uid}).then(function(){a.currentUserEmail=b.email,a.currentUserId=b.uid},function(a){}).then(function(){console.log("Current User is:"+b.uid),console.log("Current Email is:"+b.email),a.updateDashboard()},function(a){}),a.updateDashboard=function(){a.studentData=function(){firebase.database().ref("students/student1").set({messages:"session1",sessions:"meeting1",favorites:"favorites"})},a.messagesData=function(){firebase.database().ref("students/"+a.currentUserId+"/messages/"+Date.now()).set({message:a.newMessage,messageName:a.messageName,messageDate:moment.unix(Date.now()).format("MMM DD h:mm A")}),a.newMessage="",a.messageName=""},a.favoriteData=function(){firebase.database().ref("students/"+a.currentUserId+"/favorites/"+Date.now()).set({name:a.coachName,favoriteDate:moment.unix(Date.now()).format("MMM DD h:mm A")}),a.coachName=""},a.sessionData=function(){firebase.database().ref("students/"+a.currentUserId+"/sessions/"+Date.now()).set({sessionDate:a.sessionDate,sessionTime:a.sessionTime}),a.sessionDate="",a.sessionTime=""};var b=(firebase.database(),firebase.database().ref("students/"));b.on("value",function(b){console.log(b.val()),a.students=b.val(),a.$apply(),console.log(a.students.student1.messages+" "+a.students.student1.session+" "+a.students.student1.favorites)});var c=firebase.database().ref("students/"+a.currentUserId+"/messages/");c.on("value",function(b){console.log(b.val()),a.messageList=b.val()});var d=firebase.database().ref("students/"+a.currentUserId+"/favorites/");d.on("value",function(b){console.log(b.val()),a.favoriteList=b.val()});var e=firebase.database().ref("students/"+a.currentUserId+"/sessions/");e.on("value",function(b){console.log(b.val()),a.sessionList=b.val()})}}]),angular.module("rankedResourcesApp").controller("FreecodecampCoachesCtrl",["$scope",function(a){var b=(firebase.database(),firebase.database().ref("users/"));b.on("value",function(b){console.log(b.val()),a.users=b.val();var c=b.val();a.usersArray=[],a.currentFilter="free code camp";for(var d in c)c.hasOwnProperty(d)&&a.usersArray.push(c[d]);console.log(a.usersArray),a.$apply()}),a.checkLoginStatus=function(){firebase.auth().onAuthStateChanged(function(b){b?(console.log(b),a.currentUserEmail=b.email,a.currentUserId=b.uid,console.log(a.currentUserEmail),console.log(a.currentUserId),a.$apply()):console.log("Please log into your account")})}()}]),angular.module("rankedResourcesApp").run(["$templateCache",function(a){a.put("views/about.html","<p>This is the about view.</p> <p>About Code Coach</p>"),a.put("views/coach-profile.html",'<h2>Charles Sipe Profile</h2> <img main-profile-pic src="{{users[\'ichucky\'].image }}"> <div class=""> <p>Coach: {{users["ichucky"].firstName}} {{users["ichucky"].lastName}}</p> <p>Bio: {{users["ichucky"].bio}}</p> <p>Times Available: {{users["ichucky"].avail}}</p> <p>Coaching Areas: {{users["ichucky"].areas}}</p> <p>Twitter: {{users["ichucky"].twitter}}</p> <p>Portfolio: <a href="{{users[\'ichucky\'].portfolio}}">{{users["ichucky"].portfolio}}</a></p> </div>'),a.put("views/contact-coach.html",'<h2>Contact a Coach</h2> <form ng-controller="ContactCoachCtrl"> <span>Coach Name: </span> <input type="text" ng-model="coachName"><br> <span>First Name: </span> <input type="text" ng-model="firstName"><br> <span>Last Name:</span> <input type="text" ng-model="lastName"><br> <span>Email Address:</span> <input type="text" ng-model="newEmail"><br> <span>Message:</span> <input type="text" ng-model="newMessage"><br> <button type="submit" ng-click="contactCoach()">Contact Coach</button> </form>'),a.put("views/create-profile.html",'<h2>Create a Coaching Profile.</h2> <form> <span>User Name: </span> <input type="text" ng-model="userName"><br> <span>First Name: </span> <input type="text" ng-model="firstName"><br> <span>Last Name:</span> <input type="text" ng-model="lastName"><br> <span>Bio:</span> <input type="text" ng-model="newBio"><br> <span>Bio Image:</span> <input type="text" ng-model="newImage"><br> <span>Times Available:</span> <input type="text" ng-model="newAvail"><br> <span>Coaching Areas:</span> <input type="text" ng-model="newAreas"><br> <span>Portfolio URL:</span> <input type="text" ng-model="newPortfolio"><br> <span>Twitter name:</span> <input type="text" ng-model="newTwitter"><br> <button class="submit-profile" type="submit" ng-click="newProfile()">Create Profile</button> </form> <div class="well well-sm"> <p>Select a file below. When it is uploaded, a link will be displayed to the uploaded file.</p> <h6>Choose File</h6> <form> <input type="file" id="file" name="file" ng-model="file"> <button type="input" ng-click="handleFileSelect(file)">Upload Image</button> <!--type="submit" handleFileSelect()--> </form> <h6>File URL:</h6> <span id="linkbox"></span> </div>'),a.put("views/dashboard.html",'<div class="alert alert-success" ng-show="currentUserEmail" ng-show="currentUserId" role="alert">You are logged in as {{currentUserEmail}} {{currentUserId}}</div> <div class="alert alert-danger" ng-show="!currentUserEmail" ng-show="!currentUserId" role="alert">You are not logged in.</div> <h2>Upcoming Sessions with a Coach</h2> <ul ng-repeat="session in sessionList"> <div class="well well-sm"> <li>{{ session.sessionDate}} {{ session.sessionTime}}</li> </div> </ul> <h2>Coach Messages I Have Sent</h2> <ul ng-repeat="message in messageList"> <div class="well well-sm"> <li>{{ message.message}} {{ message.messageName}} {{message.messageDate}}</li> </div> </ul> <h2>My Favorite Coaches</h2> <ul ng-repeat="favorite in favoriteList"> <div class="well well-sm"> <li>{{ favorite.name}} {{ favorite.favoriteDate}}</li> </div> </ul> <!-- <p>{{students["student1"].favorites}}</p> --> <form> <span>Message: </span> <input type="text" ng-model="newMessage"><br> <span>Your Name: </span> <input type="text" ng-model="messageName"><br> <button type="submit" ng-click="messagesData()">Send Message</button> </form> <form> <span>Favorite Coach: </span> <input type="text" ng-model="coachName"><br> <button type="submit" ng-click="favoriteData()">Save Favorite</button> </form> <form> <span>Session Date: </span> <input type="text" ng-model="sessionDate"><br> <span>Session Time: </span> <input type="text" ng-model="sessionTime"><br> <button type="submit" ng-click="sessionData()">Add Session</button> </form>'),a.put("views/freecodecamp-coaches.html",'<p>This is the freecodecamp-coaches view.</p> <h2>Free Code Camp Coaches</h2> <div class="alert alert-success" ng-show="currentUserEmail" role="alert">You are logged in as {{currentUserEmail}}</div> <div class="alert alert-danger" ng-show="!currentUserEmail" role="alert">You are not logged in.</div> <ul ng-repeat="user in usersArray | filter:currentFilter"> <div class="well well-sm"> <img class="profile-pic" src="{{user.image}}" width="100px" height="110px"> <li>Name: {{ user.firstName }} {{ user.lastName }}</li> <li>Bio: {{ user.bio }}</li> <li>Areas of Expertise: {{ user.areas}}</li> <li>Times Available: {{ user.avail}}</li> <li>Portfolio: <a href="{{ user.portfolio}}" target="_blank">{{ user.portfolio}}</a> </li> <li>Twitter: {{ user.twitter}}</li> <li><button>Contact</button></li> </div> </ul>'),a.put("views/javascript-coaches.html",'<h2>JavaScript Coaches</h2> <div class="alert alert-success" ng-show="currentUserEmail" role="alert">You are logged in as {{currentUserEmail}}</div> <div class="alert alert-danger" ng-show="!currentUserEmail" role="alert">You are not logged in.</div> <ul ng-repeat="user in usersArray | filter:currentFilter"> <div class="well well-sm"> <img class="profile-pic" src="{{user.image}}" width="100px" height="110px"> <li>Name: {{ user.firstName }} {{ user.lastName }}</li> <li>Bio: {{ user.bio }}</li> <li>Areas of Expertise: {{ user.areas}}</li> <li>Times Available: {{ user.avail}}</li> <li>Portfolio: <a href="{{ user.portfolio}}" target="_blank">{{ user.portfolio}}</a> </li> <li>Twitter: {{user.twitter}}</li> <li><a class="btn btn-default" ng-href="#/contact-coach">Contact Coach</a></li> <li> <a class="btn btn-info btn-lg" ng-click="saveCoach(usersArray.indexOf(user))"> <span class="glyphicon glyphicon-star"></span> Save Coach </a> </li> </div> </ul>'),a.put("views/learning-javascript.html","<p>This is the learning-javascript view.</p>"),a.put("views/log-in.html",'<div class="alert alert-success" ng-show="currentUserEmail" role="alert">You are logged in as {{currentUserEmail}}</div> <div class="alert alert-danger" ng-show="!currentUserEmail" role="alert">You are not logged in.</div> <div class="panel panel-default"> <div class="panel-heading"> <h3 class="panel-title">Log In</h3> </div> <div class="panel-body"> <form ng-submit="logInUser()"> <p>Email: <input type="text" ng-model="loginEmail" placeholder="email"> Password: <input type="password" ng-model="loginPassword" placeholder="password"> <input type="submit" id="submit" value="Submit"> </p> </form> </div> </div> <button ng-click="logOut()" type="button" class="btn btn-danger">Log Out</button> <p>User Id: {{currentUserId}}</p> <p>Current User Email: {{currentUserEmail}} </p> <p>Test login: csipe 84 at gmail dot com pw = coolcoach </p> <p>Test login2: sipec at seattle u dot edu pw = coolcoach </p>'),a.put("views/main.html",'<div class="jumbotron"> <div class="header-overlay"> <h1>Code Coach</h1> <h2>Free code coaching with an experienced web developer.</h2> <p class="lead"> Meet online with a mentor for 10 weeks to work on a project or work through Free Code Camp. </p> </div> </div> <div class="row marketing"> <p>Hello {{userName}} </p> <h2>Why a Code Coach?</h2> <p>Professional athletes, musicians, and executives typically have coaches to provide them feedback on what they can improve on and push them just out of their confort zones in order to improve their skills.</p> <p>Research by Anders Ericsson has found that deliberate practice is an effective way to improve a skill.</p> <h2>How Does It Work?</h2> Browse the coach directory by category and learn about coaches who are available for weekly sessions. Submit a request to a coach and schedule weekly meetings with them. <h2>Coaches by Category</h2> <ul> <li><a ng-href="#/free-code-camp-coaches">Free Code Camp</a></li> <li><a ng-href="#/javascript-coaches">JavaScript</a></li> <li><a ng-href="#/react-coaches">React</a></li> <li><a ng-href="#/rails-coaches">Ruby on Rails</a></li> </ul> </div>'),a.put("views/rails-coaches.html",'<h2>Ruby on Rails Coaches</h2> <div class="alert alert-success" ng-show="currentUserEmail" role="alert">You are logged in as {{currentUserEmail}}</div> <div class="alert alert-danger" ng-show="!currentUserEmail" role="alert">You are not logged in.</div> <ul ng-repeat="user in usersArray | filter:currentFilter"> <div class="well well-sm"> <img class="profile-pic" src="{{user.image}}" width="100px" height="110px"> <li>Name: {{ user.firstName }} {{ user.lastName }}</li> <li>Bio: {{ user.bio }}</li> <li>Areas of Expertise: {{ user.areas}}</li> <li>Times Available: {{ user.avail}}</li> <li>Portfolio: <a href="{{ user.portfolio}}" target="_blank">{{ user.portfolio}}</a> </li> <li>Twitter: {{ user.twitter}}</li> <li><button>Contact</button></li> </div> </ul>'),a.put("views/sign-up.html",'<!-- Log in panel --><!-- Create account panel --> <div class="panel panel-default"> <div class="panel-heading"> <h3 class="panel-title">Create a User Account</h3> </div> <div class="panel-body"> <form ng-submit="createUser()"> <p>Enter your email:</p> <input type="text" ng-model="userEmail" placeholder="email"> <p>Enter a new password</p> <input type="text" ng-model="userPassword" placeholder="password"><br> <input type="submit" id="submit" value="Submit"> </form> </div> </div> <p>Current User Email: {{currentUserEmail}} </p>')}]);