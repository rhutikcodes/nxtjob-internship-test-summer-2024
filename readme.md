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

1. Initialize your project in the coding_tasks folder. Set up your Next.js frontend and serverless backend. Your code will reside in `your_full_name/coding_tasks` folder.
2. Design your database schema with Drizzle ORM and set up your database on PlanetScale.
3. Implement the features listed below, ensuring to follow best practices for security and performance.
4. Commit your code regularly with clear, and descriptive commit messages :)

### Tech Stack

**Frontend:** Next.js with Shadcn, Tailwind CSS, and Redux for state management.

**Backend:** Hono for the serverless API, PlanetScale Database with Drizzle ORM for data management, Cloudflare Workers for serverless functions, Upstash QStash for setting up reminders, and Resend for sending emails.

### Features:

1. **User Authentication:** Implement secure user registration and login. You can use Clerk.dev for this.
2. **Scheduling Interface:** Allow users to define their availability.
3. **Appointment Booking:** Let external users book times based on availability.
4. **Reminders:** Set up reminders using Upstash QStash.
5. **Email Notifications:** Send confirmation and reminder emails using Resend.