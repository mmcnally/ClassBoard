#Functional Specification

##Project Overview
---

(Last edited: 3-10-2015)

ClassBoard is a configurable dashboard for classroom-related widgets. Our goal is to integrate as many classroom interactions as possible into the browser, allowing for a more streamlined and efficient classroom experience. Classrooms will become paperless when using ClassBoard, as it will keep all class documents stored in one place and organized. Other class activities such as splitting the class into groups or giving a timed quiz will also be performed by Classboard. There will be many widgets performing different functionalities, we will only highlight a few in this overview.

An attendance widget will perform the task of taking attendance, allowing the professor to no longer be concerned about which students will be marked present, as it will be done automatically when each student logs on to their room’s ClassBoard. Handouts will be easier than ever with simple drag and drop file sharing widgets. Students can utilize a widget to post questions to the dashboard that others can view and upvote or comment on. This will allow the professor to focus on answering the questions that the greatest number of students would like answered. 

##Views
---

(Last edited: 4-8-2015)

####Login View
![Login View](/docs/fspec/views/loginview.png)
The login view will have a text field to enter your Email and a text field to enter your Password in the center of the screen.  Underneath those fields, also centered, will be a Login button and a Sign Up button. 

If the user has already made an account, they can type in their Email and password, click the Login button, and be sent to the Dashboard View.

New users will simply have to click the Sign Up button to be sent to the Sign Up field, so that they can create an account, and then sign in from that view.

Additionally, there will be a small Forgot Your Password? button under the Password text field and above the Sign Up button.  This will send an email to the email address in the Email text field.  If the Email text field is empty, the user will be notified to enter their Email, and if the email entered is not linked to an account, the user will be notified that there is no account connected to their email.

####Sign Up View
![Sign Up View](/docs/fspec/views/signup.png)
This view will be somewhat similar to the Login view.  There will be a centered text field for each of the following: First Name, Last Name, Email, Password, Student ID.  Each of them will be required fields. There will also be a drop down menu for the user to choose their school, which will also be required.
	
Underneath these text fields will be a Sign Up button, which will log the user in and send them to the Dashboard view if there are no issues in the sign up fields. If the user forgot to enter any information, they will stay on the Sign Up view and the incorrectly filled text fields will be highlighted in red.  At this point, the user will be able to fix their errors and click the sign up button again in order to be signed in and taken to the Dashboard View.

####Dashboard View
![Dashboard View](/docs/fspec/views/dashboardview.png)
The Dashboard will have a header at the top with four important elements within it: our logo, a button to select what class dashboard to display, the currently selected classes information, and an account settings button. Our logo will be placed in the top left corner of the header and will have no function when clicked. Directly to the right of our logo there will be a button that when clicked will display a dropdown menu containing all the classes that the user is currently enrolled in that utilize Class Board, when a class is selected the dashboard will update to show the widgets that that specific class has associated with it. Next to the drop down button there will be a text field describing the class’ information such as its name, the lecture number and the topic of the day’s lecture. Finally, on the top right of the header there will be an account settings button, that when clicked will open a view where users can edit their personal information such as username, password, enrolled classes etc.

Beneath the header will be a dynamic grid of rectangular, interactive widgets. The widgets will automatically reposition themselves based on their current relevance, for example, an attendance widget might only be visible during the first 10 minutes of class time, and when a teacher asks the class a question, a widget allowing students to respond might appear at the top of the dashboard, shifting other widgets down. Additionally, if the user is a teacher or class administrator there will be a widget settings button that allows them to enable or disable widgets for the entire class as well as set widget positions. Each widget will also have a settings button that will allow the user to specify widget specific settings such as when to display the widget and what information it should display etc. 

There will be a Plus button in the lower right corner of the app, which, when clicked,  will show a list of widgets that the user can select and add to the dashboard.  This list can be restricted by the teacher using the widget settings button addressed above.

####Account Settings View
![Account Settings View](/docs/fspec/views/settingsview.png)
The account settings view will be a box that appears on top of the dashboard when made visible, darkening the dashboard itself so the settings themselves are the most prominent element on the screen. The settings view will allow a user to change their personal information such as name, email address and password. Additionally, the ability to enroll in classes will be provided within this settings menu. If the user is a teacher or class administrator, the settings menu will provide additional functionality allowing them to modify class settings such as the class name, or add and remove students from the class.

At the bottom of the Settings View, there will be a Save button, a Cancel button, and a Reset to Defaults button.  The Save button will save the changes and send the user back to the DashboardView, the Cancel button send the user back to the Dashboard view without saving, and the Reset to Defaults button will change all setting back to their default value and then send the user back to the Dashboard view.

####Widget Settings View
The widget settings view will be another box, much line the account settings view, but it will be placed on the bottom of the screen so it does not cover any of the widgets or the spaces widgets can be placed. This placement is necessary because in this view a button with an ‘x’ will be placed on the top right of every widget, when this button is pressed it will remove its associated widget from the dashboard. Within this view, teacher or class administrators can select which widgets are available to the class, and drag and drop the class’s default widgets to their initial positions on the dashboard.

####Widgets
![Account Settings View](/docs/fspec/views/widgetview.png)
The widgets will have functionality that relates specifically to the widget itself, this information can be found by the teacher or class administrator by clicking on the settings button on each widget. This button will by default only be shown to the teacher but if a widget has user preferences such as measurement units or time format the settings button will be visible to every user. Additionally, each widget will have multiple states, one will be its default state in which users interact with the widget and its default functions, second will be the edit state where widgets can be dragged on and off the dashboard. Widgets on the dashboard will have a button to remove them from the dashboard, and widgets within the widget settings box will have a button to allow and disallow them to be added to the dashboard. Lastly, when a widget is being dragged onto the dashboard it will be in another state where it is following the mouse.




##Integrative Experience
---

(Last edited: 3-10-2015)

Classboard will be useful for general education courses in numerous ways. For example, the Introductory Biology class uses iClickers excessively, but in a way that adds much more work for the professor.  After each class, the professor has to go back into his powerpoint and update each iclicker question to show the correct answers.  This allows students to study the questions at a later date, but at the expense of the professor’s time.  That problem will be completely eliminated in Classboard.  The professor can open a multiple choice question on classboard, and give it a simple name or number so that students can later match it with the powerpoint.  The professor can even put the questions only in classboard instead of their powerpoint if they find that to be preferable.  After a questions is closed by the professor, the professor can simply mark the correct answer with the click of a button, and that answer will be saved for the students to view at any time.  Additionally, attendance can be taken within seconds, instead of wasting time going through a roll call.

Classboard will also apply concepts from psychology in its design to reduce common stressors. It provides a compact interface that puts control in the hands of the professor, improving organization by reducing the amount of clutter in the student’s browser, eliminating distractions. The “I’m Confused” button eliminates fear of how others may perceive them as the primary obstacle for confused students seeking help. 

##Use Cases
---

(Last edited: 3-10-2015)

Marvin is professor who teaches Introductory Biology at the undergraduate level. Since material is covered very quickly during class, he tries to ask several multiple choice questions to the class after covering each topic. Marvin uses ClassBoard to speed up this process by easily sending a question to each student's computer. He can then see the results, and show them to the class with the click of a button. ClassBoard helps to relieve some stree from Marvin's life, which leads him to win 14 Nobel Prizes in Biology. He praises ClassBoard on a daily basis.


Bovine Joni enjoys technology, but doesn't like being forced to use unconnected applications. Thoughout his teaching career, he has searched for an applications that has all the features he needs in one place. Fortunately, one of Joni's colleagues emails him a link to ClassBoard. When Joni reads the feature list and see's that it will allow him to ask questions, take attendence, share files, and more in a single application, he is intrigued and tries to use it in his next class. Now that He can avoid a long and boring roll call at the beginning of each class, he is able to use that classtime at the end to answer questions and clear up confusing topics. After using ClassBoard with great success during the next several weeks, Joni excitedly informs his colleagues of the great features that ClassBoard can offer.


Eugene Lumberjack likes to share the powerpoint for the class with his students, but doesn't always have time to go through the complicated process of uploading it to his website before each class. His website is clunky and difficult to manage. As a result, Lumberjack tries using ClassBoard, since he heard that it allowed easy file sharing capabilities with students. Now Lumberjack simply drags his powerpoint file into ClassBoard at the beginning of class, and it is sent to each student. 


Bronco Bambam is a sophomore at the University of Maryland University College. He is enrolled in an Introductory Psychology course, and he's struggling to keep up with the material. Fortunately, Bambam's professor uses ClassBoard, so Bambam is able to simply click the I'm Confused button when he's struggling to keep us as a new topic is introduced.  This allows Bambam to voice his confusion without the having to feel bad about raising his hand and asking a question. Bronco Bambam finds that he can now keep up with the material, and he earns an A in the class. Using the knowledge that he learning in that class, Bronco Bambam goes on to become the best psychologist in the world, all thanks to ClassBoard.


##Non-goals 
---

(Last edited: 3-10-2015)

1. Notebook widget - A simple notebook widget would be a great feature, but it isn't integral to a simple version of ClassBoard. Therefore, we focus on implementing more important widgets, and leave this one for a later date.
2. Wolfram Alpha integration - A Wolfram Alpha widget would be a fantastic resource for many subjects, such as Math, Chemistry, Biology, and Computer Science. It would allow the user to enter information to be evaluated by Wolfram Alpha, without being forced to leave ClassBoard.  However, this widget would be very complicated to the success of the initial release of ClassBoard, so we will not implement the Wolfram Alpha widget at this time.
3. Calculator Widget - A calculator widget would be very handy for quick calculations, especially if some students don't have calculators with them at the time. However, this is not an essential feature, so we will not be implementing it at this time.
4. Dashboard appearance customization in Settings - Adding more customization options would help users feel more at home within ClassBoard, but it more of an accessory feature, so we will not implement it for our first release.
5. Integration 3rd party platform such as Facebook or Moodle.
6. 3rd party widgets or plugins. This would be a cool feature but is not currently worth implementing.
7. Classboard will not have profile pages for either classes or users. That is there is no page you can visit that shows a user’s past activity or personal information.
8. Support/optimization for mobile browsers

9. An offensive chat bot

10. A self destruct button that downloads a virus and deletes every file on your computer
11. A fully function Civilization V widget
11. A complete mapping of the human brain
12. Global cooling
13. World peace
14. Advanced flowchart functionality for graphing life happiness
15. Neural network based machine learning

##Revision History
---

(Last edited: 3-10-2015)

3/10/15 - First version completed.

