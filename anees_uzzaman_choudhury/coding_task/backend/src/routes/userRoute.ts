import { Hono } from "hono"
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

const users = new Hono<{
    Bindings: {
        DATABASE_URL: string
    }
}>();



users.post('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
    
    const body = await c.req.json();
    const username = body.username;

    if (!username || username.trim() === '') {
        return c.json({ message: 'Username is required' }, 400); // Bad Request
    }

    try {
        // Check if user already exists
        let user = await prisma.user.findUnique({
            where: { username },
        });

        if (!user) {
            // Create user if not exists
            user = await prisma.user.create({
                data: { username },
            });
        }

        // Return only the userId in the response
        return c.json({ userId: user.userId, message: 'User logged in/created successfully' }, 201);

    } catch (error) {
        console.error('Error in user creation or login:', error);
        return c.json({ message: 'Error creating or logging in user' }, 500); // Internal Server Error
    }
});

// find all users and return the user object
users.get('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const users = await prisma.user.findMany();
        return c.json(users, 200);
    } catch (error) {
        console.error('Error fetching users:', error);
        return c.json({ message: 'Error fetching users' }, 500);
    }
});

users.post('/:userId/bookmark/:postId', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const { userId, postId } = c.req.param();
  
    const user = await prisma.user.findUnique({
      where: { userId },
      select: { bookmarks: true }
    });
  
    if (!user) return c.json({ message: 'User not found' }, 404);
  
    let updatedBookmarks;
    if (user.bookmarks.includes(postId)) {
      updatedBookmarks = user.bookmarks.filter(id => id !== postId); // Remove the bookmark
    } else {
      updatedBookmarks = [...user.bookmarks, postId]; // Add the bookmark
    }
  
    const updatedUser = await prisma.user.update({
      where: { userId },
      data: { bookmarks: updatedBookmarks },
      select: { bookmarks: true }
    });
  
    return c.json({ bookmarks: updatedUser.bookmarks }, 200);
  });

users.get('/:userId/bookmarks', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const { userId } = c.req.param();

    const user = await prisma.user.findUnique({
        where: { userId },
        select: {
          bookmarks: true  
        }
      });
    
      if (!user) return c.json({ message: 'User not found' }, 404);
      if (!user.bookmarks || user.bookmarks.length === 0) return c.json({ bookmarks: [] }, 200); // Return empty if no bookmarks
    
      // Second, fetch the posts that are in the bookmarks
      const posts = await prisma.post.findMany({
        where: {
          postId: { in: user.bookmarks }
        },
        include: {
          User: true,  
          Comments: true  
        }
      });

    if (!user) return c.json({ message: 'User not found' }, 404);

    return c.json({ bookmarks: posts }, 200);
});

users.get('/:userId/showBookmarkIds', async (c) => {
    const { userId } = c.req.param();
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
  
    try {
      const user = await prisma.user.findUnique({
        where: { userId },
        select: {
          bookmarks: true  // Select the bookmarks field which contains the post IDs
        }
      });
  
      if (!user) {
        return c.json({ message: 'User not found' }, 404);
      }
  
      // Return the array of bookmarked post IDs
      const bookmarkIds = user.bookmarks;
      return c.json({ bookmarkIds }, 200);
    } catch (error) {
      console.error('Error fetching bookmarked post IDs:', error);
      return c.json({ message: 'Error fetching data' }, 500);
    }
  });
  
  

export default users