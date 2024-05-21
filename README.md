**Poll Application**

**#Brief overview**
This is a full-stack poll application project built with Django Python for backend and React JS for frontend. It starts with a login form. 
There are three users in the system:
  1. Admin. Username: adminuser  Password: adminpassword
  2. User 1. Username: zlatashabalina  Password: qwerty
  3. User 2. Username: tommirintala  Password: password123

If the login was successful, depending on what user was trying to log in, they will be sent to either admin interface or user interface. If the input credentials were wrong, the message indicating that will be shown.

Admin interface: admin user can see all the polls, create/delete polls, switch to Finnish language and back to English.
User interface: users can see the available polls and take part in the polls. They can also play music and switch the theme of the page to Dark/Light. Their votes will be recorded in database and the admin user can analyse the results of each poll.

**#Instructions**
1. Clone the repository
2. In the VSC open the repository folder and navigate to folder pollproject.
3. Run command "python manage.py runserver"
4. Keep that command running and open a new terminal in VSC.
5. Navigate to folder cra.
6. Run command "npm start"
7. Enjoy the poll application
