## Coding Task

Build a Community App where users can post content, receive real-time updates, react to posts, and comment on each other's posts.

1. Initialize your project in the coding_tasks folder. Set up your Next.js frontend and serverless backend. Your code will reside in `your_full_name/coding_tasks` folder.
2. Design your database schema with Drizzle ORM and set up your database on PlanetScale.
3. Implement the features listed below, ensuring to follow best practices for security and performance.
4. Commit your code regularly with clear, and descriptive commit messages :)

### Tech Stack

**Frontend:** Next.js with RadixUi, Tailwind CSS, Redux for state management ,Typescript and Framer Motion for animations
    - I have used React.js with RadixUI, Tailwind css, Typescript

**Backend:** Prisma/Drizzle ORM for data management, Cloudflare Workers for serverless functions, Cloudfare D1 for database
    - I have used Prisma ORM, cloudflare workers(not recommended: It has some weird problems) and neon Postgres DB

**Ui Design:** https://www.figma.com/file/q1vCqagtHMdJerogbcj0b7/Nxtjob-Summer-Intern-Task

### Features:

1. **Real Time Updates:** Implement WebSocket to enable users to receive real-time updates without needing to refresh the page.
    - These needs pub/subs: and for cloudflare workers Pub/Subs are in private beta
    - These can be done by other runtimes
2. [x] **Commenting System:** Enable users to comment on posts.
3. **Notifications:** Provide users with notifications for various events.
    - Same as above the tech as websockets feature

### Marking Scheme:

1. **Design Implementation:** Evaluate how closely the provided Figma design is followed in the application's user interface.
2. **Project Structure:** How you structure files, folders, and modules of the code.
3. **Code Quailty:** Examine the clarity, readability, and documentation of the code, as well as the logic's coherence and adherence to best practices.


