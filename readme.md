# Let's get Internship Ready!

👋🏽 Hello there! Congratulations on being shortlisted for an internship opportunity at NxtJob. This document outlines your task, which should be ideally submitted within 5 days.

## Next Steps

To advance in this opportunity, complete the following tasks and submit a PR (Pull Request) to this repository.

Your task is to build a simplified clone of Calendly, a popular scheduling tool. This application will allow users to schedule calls, update availability, set up reminders, and send emails.

Firstly, clone this repository or download it as a zip file. Inside the repository, you'll find a folder named `intern_challenge`. Make a copy of this folder and rename it to your full name, using snake_case for spaces (for instance, john_doe). Inside this folder, you will find two `'answers.txt'` files located in the `'technical'` and `'non_technical'` subfolders. Edit these files with your responses.

## Technical Questions

1. Attach a prisma.schema or schema.ts (Drizzle) file from one of your past projects where you have used Prisma or Drizzle ORM.
2. Explain, in your own words, the difference between "Edge Serverless" and "Serverless".
3. Describe when and where you usually encounter bugs in your development process.
4. Discuss the importance of maintaining clean and readable code. What best practices do you follow to structure and write code for ease of reading?


## Non-Technical Questions

1. How do you stay updated on software development topics and remain active in the community? (Forums/Discord/Slack/Meetups/Twitter/Blogs)
2. What are your most-used IDE and keyboard shortcuts when coding?
3. How do you approach the design and implementation of a scalable backend system? Feel free to attach code snippets for better explanation.
4. How do you ensure that your frontend code is functional and reliable? What are your favorite testing methods and tools?

## Coding Task

Build a Community App where users can post content, receive real-time updates, react to posts, and comment on each other's posts.

1. Initialize your project in the coding_tasks folder. Set up your Next.js frontend and serverless backend. Your code will reside in `your_full_name/coding_tasks` folder.
2. Design your database schema with Drizzle ORM and set up your database on PlanetScale.
3. Implement the features listed below, ensuring to follow best practices for security and performance.
4. Commit your code regularly with clear, and descriptive commit messages :)

### Tech Stack

**Frontend:** Next.js with RadixUi, Tailwind CSS, Redux for state management ,Typescript and Framer Motion for animations

**Backend:** Prisma/Drizzle ORM for data management, Cloudflare Workers for serverless functions, Cloudfare D1 for database

**Ui Design:** https://www.figma.com/file/q1vCqagtHMdJerogbcj0b7/Nxtjob-Summer-Intern-Task

### Features:

1. **Real Time Updates:** Implement WebSocket to enable users to receive real-time updates without needing to refresh the page.
2. **Commenting System:** Enable users to comment on posts.
3. **Notifications:** Provide users with notifications for various events.

### Marking Scheme:

1. **Design Implementation:** Evaluate how closely the provided Figma design is followed in the application's user interface.
2. **Project Structure:** How you structure files, folders, and modules of the code.
3. **Code Quailty:** Examine the clarity, readability, and documentation of the code, as well as the logic's coherence and adherence to best practices.
