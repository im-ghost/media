// types file

// User type
type USER = {
  name?: string,
  phone?:  string,
  email: string | null,
  chats?: [string],
  bio?: string,
  followers?: [string],
  following?: [string],
  posts?: [string],
  password?: string | null,
  password2?: string,
  image?: string | null,
  _id?:string,
  token?:string
  
}

// Users ,an array of user type
type USERS = [USER]

//CHAT type
type CHAT = {
  name: string,
  members: [string],
  messages: [string],
  bio?:string,
  image?:string,
  _id?:string
}

//CHATS type
type CHATS = [CHAT]

//Post type
type POST = {
  author: string,
  comments?: [string],
  image?: string,
  caption?: string,
  likes?:[string],
  content?:  string,
  retweets?: [string],
  date?:Date,
  _id?:string
}

//POSTS type
type POSTS = POST[]

//Comment type
type COMMENT = { 
   author: string,
  post: string,
  content: string,
  likes:[string]
}

//Comments type
type COMMENTS = [COMMENT]

//Like type
type LIKE = {
  author: string,
  post:string
}

//Likes type
type LIKES = [LIKE]

//Message type
type MESSAGE = {
  sender: string,
  chat: string,
  content:string,
  timestamp: Date,
}

//messages type
type MESSAGES = MESSAGE[]

export type {
  MESSAGE,
  MESSAGES,
  LIKES,
  LIKE,
  COMMENTS,
  COMMENT,
  POST,
  POSTS,
  CHAT,
  CHATS,
  USERS,
  USER
}