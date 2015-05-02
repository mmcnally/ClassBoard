##Summary

<small>
-<b>updated</b> 5-2-2015
<br>
-<b>author(s)</b> Michael, Andrew, Austin Carter
</small>

---

ClassBoard is a configurable dashboard for classroom-related widgets. Our goal is to integrate as many classroom interactions as possible into the browser, allowing for a more efficient and streamlined classroom experience.

To use ClassBoard, users must first sign up for an account using a valid ‘.edu’ email. New users are not initially enrolled in any classes and are automatically directed to the create or enroll in a class page. If a user creates a new class they are assigned the role of instructor for that class. Users with the instructor role have different options when interacting with each of the widgets. Students can enroll in a class by putting the class name and code into the enroll class form. After a user has enrolled in or created a class,  they are directed to the dashboard for the most recent class they viewed, created or enrolled in.

Widgets will be the main component of our application. ClassBoard will have widgets for attendance, quizzes, WolframAlpha, and an “I’m confused” button that students can press when they are feeling lost or confused during a lecture. The modularity of the widgets allows for customization and optimization for each individual class and student. Additionally, the widgets provide students and professors every piece of information they need during class on their own screen. The widgets also facilitate a more interactive classroom environment. Some widgets that will be implemented later in development are file sharing, questions, homework, grades, and lecture slides.


> #####Revision History
1. First version of document was created
2. Updated based on final beta release product




##External Libraries:
<small>
-<b>updated</b> 5-2-2015
<br>
-<b>author(s)</b> Matt, Andrew, Austin, Carter
</small>

---

- <b>Express.js:</b> We’re using Express.js to simplify the creation of server routes.
- <b>MongoDB:</b> MongoDB is our choice of database because NoSQL is really to work with in javascript.
- <b>Mongoose:</b> A utility library that provides a wrapper of MongoDB drivers which add convenience and utility.
- <b>Socket.io:</b> Allows for fast event-based communication between client and server through websockets rather than ajax. This is vital for our app as we need to update content without reloading the page for fluid dashboard functionality.
- <b>Bootstrap:</b> Gives a very good baseline css library and allows for easy manipulation and placement of DOM elements. We also used this: https://bootswatch.com/cosmo/ theme
- <b>AngularJs:</b> Provides a full client side MVC framework that allows us to perform ajax calls, manipulate html and perform business logic amongst other things on the client side.
- <b>Passport:</b> Express middleware for handling authentication and session data.
- <b> Swig </b> Provides a server side template language that we use to produce our app’s index.html file (our app is only 1 page, the illusion of multiple pages is achieved through angular’s html manipulation).
- <b> Grunt </b> We use the grunt taskrunner library in order to automate certain development related tasks. For example it handles launching our server as well as concurrently running error detectors such as jslint and watching for file changes and restarting the server if necessary.
- <b> MeanJS </b> We used the general project structure and some functionality of the http://meanjs.org/ boilerplate, particularly to handle thing such as the grunt configuration and basic server logic such as database configuration and authentication.
- <b> Others </b> We use 20-30 other external libraries in our project, each of which is very small and doesn’t affect the overall structure of our project. To see a full list, consult our package.json and bower.json files.





##Birds-Eye view
<small>
-<b>updated</b> 5-2-2015
<br>
-<b>author(s)</b> Matt, Michael, Austin, Carter
</small>

---

When a user first visits Classboard, they are presented with the login page-- the dashboard and all its functionality require a registered and currently signed in user. The login page also serves as the signup page for new users to create a free account using a ‘.edu’ email. If the user already has an account they can input their information and sign into Classboard. Once the user passes <strong>authentication</strong> they are presented with the specific <strong>dashboard</strong> corresponding to the class they currently have selected. By default this is the class currently in session, or the next class the student has scheduled. Within the navigation bar at the top of the page, the user has the ability to change which class is selected and access a settings menu which will be discussed more later. Inside the dashboard is a collection of <strong>widgets</strong> allowing the user to interact with different aspects of their class. The widgets also change dynamically when the user interacts with them, and some widgets change when the class administrator performs an action. For example, one widget we will implement is an in-class quiz widget (similar to iClickers). The quiz widget will interact with the students by accepting a multiple choice answer and submitting the answer to the server. Once the teacher has closed the quiz, the students' quiz widgets will change visually to indicate the correct answer.

##Component-By-Component Breakdown
<small>
-<b>updated</b> 5-2-2015
<br>
-<b>author(s)</b> Matt, Michael, Andrew, Austin, Carter
<br>
</small>

---

###Authentication
<small>
-<b>updated</b> 5-2-2015
<br>
-<b>author(s)</b> Matt, Michael, Andrew, Austin
<br>
-<b>developer(s)</b> Matt, Austin
</small>


The authentication module handles creating accounts, authenticating users, storing user sessions, and verifying authentication and or authorization on each express request. No features of Classboard are useable without first logging in, so the authentication component is closely related to all other components. Authentication is handled by verifying the user’s school email and password using the express passport middleware. Each user’s password is stored as a unique hashed value that can only be generated using the user’s password. This way the user’s password does not have to be stored in our database. When a user is authenticated, a session is generated for them and returned to their client. On every request the client makes it must include session data which is then used to authenticate the client for that request. Session authentication is also handled using passport. Session data is stored inside our MongoDB instance using the middleware connect-mongo.


###Dashboard
<small>
-<b>updated</b> 5-2-2015
<br>
-<b>author(s)</b> Matt, Michael, Andrew, Carter
<br>
-<b>developer(s)</b> Carter, Michael: <i>UI</i>; Andrew, Matt, Austin: <i>backend and database functionality</i>
</small>


The dashboard is our application’s primary page. The dashboard page displays each of the widgets for a selected class. The user will have a separate dashboard for each class that they are enrolled in, and if the user is not enrolled in any classes, they will be prompted to enroll or create one before being able to create and customize their dashboard. If the user is already enrolled in a class, they will be brought to the dashboard of whatever class is scheduled next for the student (aka the next class they will attend). Here, users will be able to view and interact with each of the widgets that are available to their class. In later stages of development, the user will be able to customize which widgets are present on the dashboard, which we will implement interactivity with the Sockets.io library. The page will be closely linked with the users database in order to keep track of both the courses the user is enrolled in, and the saved dashboard layout for each class.

###Widgets
<small>
-<b>updated</b> 5-2-2015
<br>
-<b>author(s)</b> Matt, Michael, Andrew, Carter
<br>
-<b>developer(s)</b> Carter, Michael: <i>UI, displaying data in database</i>; Andrew, Matt, Austin: <i>storing widget information/preferences</i>
</small>


All widgets share some basic functionality. All widgets have a settings page that can be accessed by pressing a button in the top-right corner of the widget. Once this button has been pressed the body of the widget is replaced with its settings screen. Most widgets interact differently with class administrators than with students, so generally class administrators will be able to change more settings than a student. Widgets all also have separate functions and views for students than for class administrators. For example the attendance widget will allow students to mark themselves present, but will allow administrators to see the results of the attendance. Widget functionality will be implemented client side using an angularjs directive. Each widget will have its own unique set of api endpoints (/api/widgets/widget_name). Each widget also must have a settings endpoint that will expose and allow changes to be made to its settings. Finally widgets will have a angularjs service that allows it to expose public functions to other widgets if needed.

---

####Attendance widget
<small>
-<b>updated</b> 5-2-2015
<br>
-<b>developer(s)</b> Michael, Austin<i></i>
</small>

The attendance widget will allow students to mark themselves as present and will allow administrators to view the results of the attendance. This will help save time at the beginning of class, and replace the more traditional, and time consuming, roll call strategy for taking attendance.

####Quiz widget
<small>
-<b>updated</b> 5-2-2015
<br>
-<b>developer(s)</b> Matt, Carter
</small>

The quiz widget will allow professor to quickly ask the class multiple choice questions.  The instructor will be able to close the quiz when everyone is finished, and it will be graded automatically in real time.  The instructor will then be shown a chart displaying the breakdown of student answers, and will be given the option to share the chart with the class.

####I’m Confused Button widget
<small>
-<b>updated</b> 5-2-2015
<br>
-<b>developer(s)</b> Matt, Andrew
</small>

The "I’m confused" button widget will simply be a large button available to student users. Students will be able to click the button when they get lost, and need to instructor to slow down or repeat what he or she just covered.  This will help to eliminate the pressure that students feel when they have to raise their hand and ask for the instructor to explain a topic again. The "I’m confused button" will be an anonymous way that students can ask for help without feeling pressured or awkward.

####WolframAlpha Widget
<small>
-<b>Updated:</b> 5-2-2015
<br>
-<b>Developer(s):</b> Carter
</small>

This will be a simple widget containing an iframe. It will provide a convenient place to search and ask wolfram questions.
