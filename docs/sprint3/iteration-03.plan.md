# SplitEase

 > _Note:_ This document is meant to be written during (or shortly after) your initial planning meeting.     
 > It does not really make sense for you to edit this document much (if at all) while working on the project - Instead, at the end of the planning phase, you can refer back to this document and decide which parts of your plan you are happy with and which parts you would like to change.


## Iteration 2

 * Start date: June 21, 2024
 * End date: July 7, 2024

## Process

Quick Introduction to the process

#### Changes from previous iteration

List the most significant changes you made to your process (if any).

 * Added a ChangePasswordPage: the use of this page is to enable users to change the login password. The success metric is that when an user decides to change password multiple times, he/she is able to do so and the database will record the latest change to his/her password.
 * Updated a FriendsPage using an embedded AddFriendsPage: this allows the current user to add friends by including the name and an optional message. The success metric is that when the user can add as many friends as he wants given that the friends' username is correct, and can delete a friend as desired (not yet implemented).
 * Similarly, updated a GroupsPage using an embedded AddGroupsPage: this allows the user to add a group (of friends) by giving a name, the members and the type of group. The success metric is that the user can add as many groups as he wants, delete groups as desired, and see the details of each group (not yet implemented).

#### Roles & responsibilities

Describe the different roles on the team and the responsibilities associated with each role.

Zheyuan Wei: 
Backend developer: assisted in the backend/database development of adding friends and groups

Sam Wang: 
Frontend-backend developer: implemented the connection of frontend and backend (adding friends and groups pages, as well as changing password)

Yiran Yu: 
Frontend developer: implemented the frontend pages for adding friends, adding groups and changing backend; 
Documenter: completed this document, assisted in refining user stories and assigning tasks inJira

Zhaohan Huang:
Frontend developer: implemented a security buffer page that can redirect to ChangeAvatarPage and ChangePasswordPage

Longqirui Chen:
Frontend developer: assisted in the development and refinement of AddFriendsPage, AddGroupsPage and ChangePasswordPage




#### Events

Describe meetings (and other events) you are planning to have:

Meeting type:  
Stand-up meeting: daily, keep track of the progress of each team member  
Sprint planning meeting: at the beginning each sprint, plan the tasks for the sprint  
Code review meeting: at the end of each sprint, review the code of each team member

#### Artifacts

List/describe the artifacts you will produce in order to organize your team.       

 * Artifacts can be To-do lists, Task boards, schedule(s), etc.
 * We want to understand:
   * How do you keep track of what needs to get done?  
   Answer: use Jira to keep track of what needs to get done, with a detailed description of tasks and assigning to team members
   * How do you prioritize tasks?
   Answer: discussed in the sprint planning meeting, prioritize tasks based on the dependencies and the importance of the tasks
   * How do tasks get assigned to team members?
   Answer: discussed in the sprint planning meeting, assign tasks based on the skills and the availability of the team members. Tasks are quantified by poker planning.

#### Git / GitHub workflow

Describe your Git / GitHub workflow.     
Essentially, we want to understand how your team members share a codebase and avoid conflicts.

   1.	Creating a Branch: We created a branch named dev for all future additions of features or bugfixes.
   2.	Making Changes: We make changes to the codebase in the dev branch, keeping each change small and manageable.
   3.	Committing and Pushing Changes: We commit changes with meaningful message, ensuring commits are atomic and self-explained, ensuring that other members understand the change.
   4.	Creating a Pull Request: We create a pull request on the main branch on GitHub if dev branch is completed for the current sprint, adding a detailed description and arranging a time for code review.
   5.	Code Review: We participate in code review meetings held near the end of each sprint, providing feedback and addressing comments. We make necessary changes and push updates so that everyone is aware of the new changes and are satisfied.
   6.	Merging: Once approved, We merge the pull request into the main branch.
   7.	Maintenance: In each sprint, we will pull changes from the main branch into the dev branch and handle issues and technical debt as part of ongoing maintenance.

**Why you chose this workflow?**
This workflow is suitable for everyone to track the progress of the current sprint, and ensuring that everyone is comfortable with making and understanding the changes. This can be done as a group in a meeting so that no lingering questions will be present, involving everyone in the development process.   


## Product

_This entire section is mandatory._


#### Goals and tasks

* Describe your goals for this iteration and the tasks that you will have to complete in order to achieve these goals.
  * Finish 3 frontend pages: AddFriendsPage, AddGroupsPage, ChangePasswordPage
  * Try best to make the backend follow the pace of the frontend
  * Finish the database design
  * Finish the document for the iteration

* Order the items from most to least important.
  1. Finish 3 frontend pages
  2. Try best to make the backend follow the pace of the frontend
  3. Finish the database design
  4. Finish the document for the iteration

* Feel free (but not obligated) to specify some/all tasks as user stories.
  * As a user, I want to see the entire breakdown of a specific transaction between users within a group so that I can see the details including how much I owe and to whom as well as how much to repay me and from whom.
  * As a user, I want to edit my profile information including my avatar and password, as well as change notification settings so that my information is up to date.
  * As a user, I want to create new groups by specifying the group name and adding members so that we can start tracking shared expenses.
  * As a user in a group, I want to invite new users to the group by entering their name and contact information so that they can join the group and contribute to shared expenses.
  * As a user, I want to see the total aggregated balance so that I know the total amount of money that I owe or that must be repaid to me.
  * Add a buffer page before change pwd/avatar after click avatar on home page.
  * Friends/Groups: connect frontend and backend

#### Artifacts

List/describe the artifacts you will produce in order to present your project idea.

 * Artifacts can be text, code, images, videos, interactive mock-ups and/or any other useful artifact you can think of.
 * Make sure to explain the purpose of each artifact (i.e. Why is it on your to-do list? Why is it useful for your team?)
 * Be concise, yet precise.         
   For example: "Build the website" is not precise at all, but "Build a static home page and upload it somewhere, so that it is publicly accessible" is much clearer.
   
#### Artifacts

List/describe the artifacts you will produce in order to present your project idea.

* Figma interactive prototype: to show the design of the website and the interaction between different pages; set the main theme (color, font, structure, vibe) of the website
* JIRA: to keep track of the progress of the project and the tasks of each team member
* System design document: to show the design of the system, the database, and the interaction between different components of the system
* API document: to show the API of the system, the input and output of each API, and the usage of each API; facilitate the process of frontend and backend development



