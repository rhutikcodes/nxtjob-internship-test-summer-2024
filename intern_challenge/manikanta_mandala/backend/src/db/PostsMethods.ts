import { PrismaClient, Post } from "@prisma/client";
const prisma = new PrismaClient();


// create post
async function createPost(title: string, content: string){
	// data object should contain title, content, and author
	try{
		const newPost = await prisma.post.create({
			data
		});
	}
	catch(e){
		console.log(e);
	};
};

// get posts
async function getPosts() {
  return prisma.post.findMany();
}
