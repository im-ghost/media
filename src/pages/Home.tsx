
import { Outlet} from "react-router-dom"
import { useAppSelector,useAppDispatch } from "../app/store";
import {
  useNavigate,
  useParams
} from "react-router-dom";
import type {
  USER
} from "../app/types"
import Navbar from "../components/HomePageNavbar";
const Home = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userFromStore = useAppSelector(state=>state.user.userInfo)
return(
  <div>
  <Navbar user={userFromStore} />
     <Outlet />
    </div>
    )
}


export default Home;