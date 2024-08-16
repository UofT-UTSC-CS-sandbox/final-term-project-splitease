# SplitEase

> _Note:_ This document is meant to be written during (or shortly after) your initial planning meeting.

> It does not really make sense for you to edit this document much (if at all) while working on the project - Instead, at the end of the planning phase, you can refer back to this document and decide which parts of your plan you are happy with and which parts you would like to change.

## Iteration 4

- Start date: July 22, 2024

- End date: August 4, 2024

## Process

Quick Introduction to the process

#### Changes from previous iteration

List the most significant changes you made to your process .

- Implemented more features and details to adding a transaction.

- Added transaction details accordingly

- Added more features to improve user experience
- Polished pages ready for presenting

#### Roles & responsibilities

Describe the different roles on the team and the responsibilities associated with each role.

Zheyuan Wei:

Backend developer: assisted in the backend/database development.

Sam Wang:

Frontend-backend developer: implemented the connection of frontend and backend.

Yiran Yu:

Frontend developer: implemented the frontend pages.

Documenter: assisted in refining user stories and assigning tasks inJira

Zhaohan Huang:

Frontend developer: implemented the frontend pages.

Longqirui Chen:

Frontend developer: implemented the frontend pages.

Documenter: completed documents needed.

#### Events

Describe meetings (and other events) you are planning to have:

Meeting type:

Stand-up meeting: daily, keep track of the progress of each team member

Sprint planning meeting: at the beginning of each sprint, plan the tasks for the sprint

Code review meeting: at the end of each sprint, review the code of each team member

#### Artifacts

List/describe the artifacts you will produce in order to organize your team.

- Artifacts can be To-do lists, Task boards, schedule(s), etc.

- We want to understand:

- How do you keep track of what needs to get done?

Answer: use Jira to keep track of what needs to get done, with a detailed description of tasks and assigning to team members

- How do you prioritize tasks?

Answer: As discussed in the sprint planning meeting, prioritize tasks based on the dependencies and the importance of the tasks

- How do tasks get assigned to team members?

Answer: As discussed in the sprint planning meeting, assign tasks based on the skills and the availability of the team members. Tasks are quantified by poker planning.

#### Git / GitHub workflow

Describe your Git / GitHub workflow.

Essentially, we want to understand how your team members share a codebase and avoid conflicts.

1. Creating a Branch: We created a branch named dev for all future additions of features or bug fixes.

2. Making Changes: We make changes to the codebase in the dev branch, keeping each change small and manageable.

3. Committing and Pushing Changes: We commit changes with meaningful messages, ensuring commits are atomic and self-explained, ensuring that other members understand the change.

4. Creating a Pull Request: We create a pull request on the main branch on GitHub if the dev branch is completed for the current sprint, adding a detailed description and arranging a time for code review.

5. Code Review: We participate in code review meetings held near the end of each sprint, providing feedback and addressing comments. We make necessary changes and push updates so that everyone is aware of the new changes and is satisfied.

6. Merging: Once approved, We merge the pull request into the main branch.

7. Maintenance: In each sprint, we will pull changes from the main branch into the dev branch and handle issues and technical debt as part of ongoing maintenance.

**Why you chose this workflow?**

This workflow is suitable for everyone to track the progress of the current sprint, and ensuring that everyone is comfortable with making and understanding the changes. This can be done as a group in a meeting so that no lingering questions will be present, involving everyone in the development process.

## Product

_This entire section is mandatory._

#### Goals and tasks

Describe your goals for this iteration and the tasks that you will have to complete in order to achieve these goals.

- Implemented more features and detail to adding a transaction, including choosing a friend/group to split, and the method of splitting.

- Did testing and fixed certain bugs, such as changing the password.

- Polished certain pages to suit the screen size.

Tasks for each main feature involve frontend page, connecting the frontend and the backend and the backend logic.

Order the items from most to least important.

- Implemented more features and detail to adding a transaction, including choosing a friend/group to split, and the method of splitting.

- Did testing and fixed certain bugs, such as changing the password.

- Polished certain pages to suit the screen size.

Feel free (but not obligated) to specify some/all tasks as user stories.

- As a user, I want to see the entire breakdown of a specific transaction between users within a group so that I can see the details including how much I owe and to whom as well as how much to repay me and from whom.

- As a user, I want to add a new balance by specifying the amount, date, description, creditor, debtor, so that the transaction information of each person in the group is accurately recorded. (not finished)

- As a user, I want to record a payment to settle a balance so that my debts are updated.

#### Artifacts

List/describe the artifacts you will produce in order to present your project idea.

- Artifacts can be text, code, images, videos, interactive mock-ups and/or any other useful artifact you can think of.

- Make sure to explain the purpose of each artifact (i.e. Why is it on your to-do list? Why is it useful for your team?)

- Be concise, yet precise.

For example: "Build the website" is not precise at all, but "Build a static home page and upload it somewhere, so that it is publicly accessible" is much clearer.

#### Artifacts

List/describe the artifacts you will produce in order to present your project idea.

- Figma interactive prototype: to show the design of the website and the interaction between different pages; set the main theme (color, font, structure, vibe) of the website

- JIRA: to keep track of the progress of the project and the tasks of each team member

- System design document: to show the design of the system, the database, and the interaction between different components of the system

- API document: to show the API of the system, the input and output of each API, and the usage of each API; facilitate the process of frontend and backend development
