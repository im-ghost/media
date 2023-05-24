// types file

// User type
type USER = {
  name: String,
  phone:  String,
  email: String
  chats?: [String],
  bio: String,
  followers?: [String],
  following?: [String],
  posts?: [String],
  password: String,
  password2?: String,
  image?: string | null,
  _id?:string
}

// Users ,an array of user type
type USERS = [USER]

//CHAT type
type CHAT = {
  name: String,
  members: [String],
  messages: [String],
  bio?:String,
  image?:String
}

//CHATS type
type CHATS = [CHAT]

//Post type
type POST = {
  author: [String],
  comments: [String],
  image: String,
  caption: String,
  likes:[String],
  content:  String,
  retweets: [String]
}

//POSTS type
type POSTS = POST[]

//Comment type
type COMMENT = { 
   author: String,
  post: String,
  content: String,
  likes:[String]
}

//Comments type
type COMMENTS = [COMMENT]

//Like type
type LIKE = {
  author: String,
  post:String
}

//Likes type
type LIKES = [LIKE]

//Message type
type MESSAGE = {
  sender: String,
  chat: String,
  content:String,
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