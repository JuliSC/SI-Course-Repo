import {ApolloServer} from "@apollo/server";
import {startStandaloneServer} from "@apollo/server/standalone";
import fs from "fs";

const typeDefs = fs.readFileSync("./graphql/schema.graphql", "utf8");

// const users = [
//   {
//     id: 1,
//     email: "john@exmaple.com",
//     password: "sesame",
//   },
//   {
//     id: 2,
//     email: "jane@example.com",
//     password: "open",
//   },
// ];

const blogs = [
  {
    id: 1,
    title: "My first blog",
    description: "This is my first blog",
    completed: true,
    ownerId: 1,
  },
  {
    id: 2,
    title: "My second blog",
    description: "This is my second blog",
    completed: false,
    ownerId: 1,
  },
];

// Functions mimic database calls that randomly return either data or errors
function getBlogs() {
  const blogsResult = {};

  const randNum = Math.floor(Math.random() * 10);

  if (randNum < 2) {
    blogsResult.blogs = blogs;
  } else {
    blogsResult.errors = ["Whoops something went wrong!"];
  }

  return blogsResult;
}

function createBlog(title, description, completed, ownerId) {
  const insertResult = {};

  const randNum = Math.floor(Math.random() * 10);

  if (randNum < 2) {
    const blog = {
      id: blogs.length + 1,
      title,
      description,
      completed,
      ownerId,
    };

    blogs.push(blog);

    insertResult.id = blog.id;
  } else {
    insertResult.errors = ["Whoops something went wrong!"];
  }

  return insertResult;
}

const resolvers = {
  Query: {
    blogs: () => getBlogs(),
  },
  Mutation: {
    createBlog: (title, description, completed, ownerId) => {
      createBlog(title, description, completed, ownerId);
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const {url} = await startStandaloneServer(server, {
  listen: {port: 8080},
});

console.log(`🚀  Server ready at: ${url}`);
