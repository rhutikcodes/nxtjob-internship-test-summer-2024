## Coding Task

Build a simplified clone of Calendly, a popular scheduling tool. This application will allow users to schedule calls, update availability, set up reminders, and send emails.

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