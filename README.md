# Virtual-School-Frontend
Virtual School Frontend

Backend: Used Spring Boot to create a tree with the following nodes/root:- a. Teacher (root) b. Folders c. Subjects d. Lessons e. Modules f. Workbooks

Created a controller with all the nodes. Hosted at localhost:8080 (default Tomcat). Used both Doubly Linked List and HashMap to implement tree. Used HashMap to configure the Service.

Frontend: Used ReactJS to send a get request to the backend server, using fetch API. The response was stored as a state and used to display the nodes to the user/client. The parent were routed to their chilldren. If a parent is clicked on, the page navigates to the particular parent, shows the parent at top of the subtree and the children as list items below it. Also added search, but it only returns the children instead of the particular item searched for. Used React Router for routing.
