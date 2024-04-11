import logo from "../assets/logo.svg"
import { Link } from "react-router-dom";

function Icon() {
  return (
    <Link to={"/"}>
      <img src={logo} height={40} />
    </Link>
  );
}

export default Icon;
