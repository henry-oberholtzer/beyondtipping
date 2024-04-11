
import { Link } from "react-router-dom"
import Icon from "./Icon";
import Bounded from "./Bounded";

export default function Header(props: HeaderFooterProps) {

  return (
  <Bounded as="header" className="py-4 md:py-6 lg:py-8 ">
    <div className="flex gap-4 items-center justify-between sm:flex-row flex-col">
    <Link to="/">
    <Icon/>
    </Link>

    <nav>
      <ul className="flex ">
        {props.navigation.map(({link, label})=>(
          <li key={label}>
          <Link to={link} className="p-3">{label}</Link>
          </li>
        ))}
      </ul>
    </nav>
    </div>
    </Bounded>
  )
}


