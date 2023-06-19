import {
  useParams,
  useNavigate
} from "react-router-dom";
import { selectPosts } from "../features/post/postSlice";
import { useAppSelector } from "../app/hooks";
import {
  Box,
  Card,
  CardHeader,
  CardActions,
  CardContent,
  InputField
} from "@mui/material";
import {
  useRef,
  useState} from "react"
export const Post = () =>{
  const [comment,setCommet] = useState<string>("")
  const navigate = useNavigate()
  comst posts = useAppSelector(state=>state.post.posts)
  const { id } = useParams()
  const post = posts.find(post => post._id === id as string)
  const inputRef = useRef()
  if(!post){
    return (<h1> Post not found</h1>)
    navigate("/")
  }
  return(
    <Card className="w-full h-screen overflow-scroll bg rounded-lg p-2">
      <CardHeader className="bg h-18 m-0" avatar={<img src={author.image || Default} alt={author.name} className="h-12 w-auto rounded"/>} title={author.name} subheader={post.post.date ? (
      <div>
      <h1>{author.name}</h1>
      <h3>{post.post.date.toString()}</h3>
      </div>) : ""} />
      {post.post.image ? (
        <div className="bg">
          <CardMedia component="img" height="194" image={post.post.image || ""} alt={post.post.content || ""} className="bg m-0" />
          <CardContent  className="bg m-0">
            <Typography variant="body2" color="text.secondary">
              {post.post.caption || ""}
            </Typography>
          </CardContent>
        </div>
      ) : (
        <Paper className="flex justify-center m-0 items-center bg h-38 p-2">{post.post.content || ""}</Paper>
      )}
      <CardActions disableSpacing  className="bg h-8 m-0">
        <IconButton  className="bg" aria-label="like">Like</IconButton>
        <IconButton  className="bg" aria-label="comment" onClick={()=>inputRef.current.click()}>Comment</IconButton>
        <IconButton  className="bg" aria-label="retweet">Retweet</IconButton>
      </CardActions>
    </Card>
    <InputField InputProps={{
      value:comment,
      onChange:(e)=> setCommet(e.target.value)
    }}/>
    )
}