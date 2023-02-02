import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import './App.css';
import UserContainer from "./pages/user/UserContainer";
import SignIn from "./pages/user/SignIn";
import SignUp from "./pages/user/SignUp";
import MainContainer from "./pages/MainContainer";
import HomeContainer from "./pages/home/HomeContainer";
import FollowContainer from "./pages/follow/FollowContainer";
import SearchContainer from "./pages/serach/SearchContainer";
import MessageContainer from "./pages/message/MessageContainer";
import PostContainer from "./pages/post/PostContainer";
import ProfileContainer from "./pages/profile/ProfileContainer";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/users" element={<UserContainer/>}>
            <Route path='sign-in' element={<SignIn/>}/>
            <Route path='sign-up' element={<SignUp/>}/>
        </Route>
        <Route path="/outstagram" element={<MainContainer/>}>
            <Route path="home" element={<HomeContainer/>}/>
            <Route path='follow' element={<FollowContainer/>}/>
            <Route path='search' element={<SearchContainer/>}/>
            <Route path='message' element={<MessageContainer/>}/>
            <Route path='post' element={<PostContainer/>}/>
            <Route path='profile' element={<ProfileContainer/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
