import { useDispatch } from "react-redux";
import { Link, withRouter } from 'react-router-dom';
import { logout } from '../../../redux/features/auth/authSlice';
import style from "./header.module.css";


function Header({ history }) {

  const dispatch = useDispatch();

  const endSession = () => {
    dispatch(logout());
    history.push("/main");
  }

  return (
    <div className={style.container}>
      <div className={style.logo}>
        <i className="fas fa-users-cog"></i>
      </div>
      <div className={style.nav}>
        <Link to="/main">Go to Main Page <i className="fas fa-home"></i></Link>
        <a onClick={endSession}>Exit<i className="fas fa-sign-out-alt"></i></a>
      </div>
    </div>
  )
}

export default withRouter(Header);