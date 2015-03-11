#Functional Specification


##Project Overview
---

(Last edited: 3-10-2015)

ClassBoard is a configurable dashboard for classroom-related widgets. Our goal is to integrate as many classroom interactions as possible into the browser, allowing for a more streamlined and efficient classroom experience. Classrooms will become paperless when using ClassBoard, as it will keep all class documents stored in one place and organized. Other class activities such as splitting the class into groups or giving a timed quiz will also be performed by Classboard. There will be many widgets performing different functionalities, we will only highlight a few in this overview.

An attendance widget will perform the task of taking attendance, allowing the professor to no longer be concerned about which students will be marked present, as it will be done automatically when each student logs on to their room’s ClassBoard. Handouts will be easier than ever with simple drag and drop file sharing widgets. Students can utilize a widget to post questions to the dashboard that others can view and upvote or comment on. This will allow the professor to focus on answering the questions that the greatest number of students would like answered. 

##Views
---

(Last edited: 3-10-2015)

####Login View
The login view will have a text field to enter your Email and a text field to enter your Password in the center of the screen.  Underneath those fields, also centered, will be a Login button, and a Sign Up button. 

If the user has already made an account, they can type in their Email and password, click the Login button, and be sent to the Dashboard View.

New users will simply have to click the Sign Up button to be sent to the Sign Up field, so that they can create an account, and then sign in from that view.

Additionally, there will be a small Forgot Your Password? hyperlink under the Password text field and above the Sign Up button.  This will send an email to the email address in the Email text field.  If the Email text field is empty, the user will be notified to enter their Email, and if the email entered is not linked to an account, the user will be notified that there is no account connected to their email.

####Sign Up View
This view will be somewhat similar to the Login view.  There will be a centered text field for each of the following: First Name, Last Name, Email, Password, Student ID.  Each of them will be required fields. There will also be a drop down menu for the user to choose their school, which will also be required.
	
Underneath these text fields will be a Sign Up button, which will log the user in and send them to the Dashboard view if there are no issue in the sign up fields. If the user forgot to enter any information, they will stay on the Sign Up view and the incorrectly filled text fields will be highlighted in red.  At this point, the user will be able to fix their errors and click the sign up button again in order to be signed in and taken to the Dashboard View.

####Dashboard View
The Dashboard will have a header at the top with four important elements within it: our logo, a button to select what class dashboard to display, the currently selected classes information, and an account settings button. Our logo will be placed in the top left corner of the header and will have no function when clicked. Directly to the right of our logo there will be a button that when clicked will display a dropdown menu containing all the classes that the user is currently enrolled in that utilize Class Board, when a class is selected the dashboard will update to show the widgets that specific class has associated with it. Next to the drop down button there will be a text field describing the class’s information such as its name, the lecture number and the topic of the day’s lecture etc. Finally, on the top right of the header there will be an account settings button, that when clicked will open a view where users can edit their personal information such as username, password, enrolled classes etc.

Beneath the header will be a dynamic grid of rectangular, interactive widgets. The widgets will automatically reposition themselves based on their current relevance, for example, an attendance widget might only be visible during the first 10 minutes of class time, and when a teacher asks the class a question, a widget allowing students to respond might appear at the top of the dashboard, shifting other widgets down. Additionally, if the user is a teacher or class administrator there will be a widget settings button that allows them to enable or disable widgets for the entire class as well as set widget positions. Each widget will also have a settings button that will allow the user to specify widget specific settings such as when to display the widget and what information it should display etc. 

There will be a Plus button in the lower right corner of the app, which, when clicked,  will show a list of widgets that the user can select and add to the dashboard.  This list can be restricted by the teacher using the widget settings button addressed above.

####Account Settings View
The account settings view will be a box that appears on top of the dashboard when made visible, darkening the dashboard itself so the settings themselves are the most prominent element on the screen. The settings view will allow a user to change their personal information such as name, email address and password. Additionally, the ability to enroll in classes will be provided within this settings menu. If the user is a teacher or class administrator, the settings menu will provide additional functionality allowing them to modify class settings such as the class name, or add and remove students from the class.

At the bottom of the Settings View, there will be a Save button, a Cancel button, and a Reset to Defaults button.  The Save button will save the changes and send the user back to the DashboardView, the Cancel button send the user back to the Dashboard view without saving, and the Reset to Defaults button will change all setting back to their default value and then send the user back to the Dashboard view.

####Widget Settings View
The widget settings view will be another box, much line the account settings view, but it will be placed on the bottom of the screen so it does not cover any of the widgets or the spaces widgets can be placed. This placement is necessary because in this view a button with an ‘x’ will be placed on the top right of every widget, when this button is pressed it will remove its associated widget from the dashboard. Within this view, teacher or class administrators can select which widgets are available to the class, and drag and drop the class’s default widgets to their initial positions on the dashboard.

####Widgets
The widgets will have functionality that relates specifically to the widget itself, this information can be found by the teacher or class administrator by clicking on the settings button on each widget. This button will by default only be shown to the teacher but if a widget has user preferences such as measurement units or time format the settings button will be visible to every user. Additionally, each widget will have multiple states, one will be its default state in which users interact with the widget and its default functions, second will be the edit state where widgets can be dragged on and off the dashboard. Widgets on the dashboard will have a button to remove them from the dashboard, and widgets within the widget settings box will have a button to allow and disallow them to be added to the dashboard. Lastly, when a widget is being dragged onto the dashboard it will be in another state where it is following the mouse.




##Integrative Experience
---

(Last edited: 3-10-2015)

Classboard will be useful for general education courses in numerous ways. For example, the introductory biology class uses iClickers excessively, but in a way that adds much more work for the professor.  After each class, the professor has to go back into his powerpoint and update each iclicker question to show the correct answers.  This allows students to study the questions at a later date, but at the expense of the professor’s time.  That problem will be completely eliminated in Classboard.  The professor can open a multiple choice question on classboard, and give it a simple name or number so that students can later match it with the powerpoint.  The professor can even put the questions only in classboard instead of their powerpoint if they find that to be preferable.  After a questions is closed by the professor, the professor can simply mark the correct answer with the click of a button, and that answer will be saved for the students to view at any time.  Additionally, attendance can be taken within seconds, instead of wasting time going through a roll call.

Classboard will also apply concepts from psychology in its design to reduce common stressors. It provides a compact interface that puts control in the hands of the professor, improving organization by reducing the amount of clutter in the student’s browser, eliminating distractions. The “I’m Confused” button eliminates fear of how others may perceive them as the primary obstacle for confused students seeking help. 

##Use Cases
---

(Last edited: 3-10-2015)

All of the real functionality of the Classboard is going to be contained in widgets, so each of the following is going to be a separate widget, which may or may not be used.

1. __Attendance__: Take class attendance
2. __Quiz__: Teacher can give students a quick timed quiz to be graded or just to gauge how well students are following the lecture. The questions can be given in a variety of formats including multiple choice, true or false, numeric or open response. When the quiz is over users can see a graph showing the spread of answers. 
3. __File Sharing__: Pass out handouts or assignments electronically.
4. __Question Box__: Students can ask questions using either their real name or anonymously. Their questions can be upvoted by other students and can be answered by the instructor, a TA, or other students. The questions widget is extremely useful not only as an online class forum, but also as an efficient replacement for the ancient practice of raising your hand to ask a question. Students can ask questions and upvote questions during class, allowing the professor to answer questions that the most students are confused about first. It will also give TA’s an opportunity to participate without interrupting class flow by answering questions through the app during class time.
5. __I’m Confused Button__: Students can press a button to inform the instructor that they are confused. The instructor can see in real time the number of students who have pressed the confused button in the last minute. This allows the instructor to continuously gauge whether or not the class is following their lecture, and gives them the opportunity to re-explain things when a certain threshold of students are confused. A professor can also pause during the lecture, and ask the students to click the I’m Confused Button if they’re confused.
6. __Assign Homework__: The teacher can assign homework for students to either submit digitally or physically hand in. Once the student submits the assignment it can be graded and/or passed back to the student with comments.
7. __Gradebook__: The instructor can also use Classboard as a gradebook. It will allow the instructor to assign weights to different assignments. It can also be configured to automatically grade attendance taken though Classboard or any quizzes or homeworks assigned through Classboard.
8. __Lecture Slides__: The instructor can choose to put their lecture slides into Classboard so that students can follow along with the lecture. Students will be given the option to add notes to the bottom of each slide.

##Non-goals 
---

(Last edited: 3-10-2015)

1. Advanced flowchart functionality for graphing life happiness
2. Wolfram Alpha integration
3. Calculator Widget
4. Notebook widget
5. Neural network based machine learning
6. An offensive chat bot
7. A self destruct button that downloads a virus and deletes every file on your computer
8. A fully function Civilization V widget
9. Dashboard appearance customization in Settings
10. A complete mapping of the human brain
11. Global cooling
12. World peace
13. Integration 3rd party platform such as Facebook or Moodle.
14. 3rd party widgets or plugins. This would be a cool feature but is not currently worth implementing.
15. Classboard will not have profile pages for either classes or users. That is there is no page you can visit that shows a user’s past activity or personal information.
16. Support/optimization for mobile browsers

##Revision History
---

(Last edited: 3-10-2015)

3/10/15 - First version completed.

