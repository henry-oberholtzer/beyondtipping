
import { Link } from "react-router-dom"
import Icon from "./Icon";
import Bounded from "./Bounded";

export default function Header(props: HeaderFooterProps) {

  return (
  <Bounded as="header" className="py-4 md:py-6 lg:py-8">
    <div className="flex gap-4 items-center justify-between sm:flex-row flex-col sm:col-1 md:col-1">
    <Link to="/">
    <Icon/>
    </Link>
<div>
    <nav>
      <ul className="flex">
        {props.navigation.map(({link, label})=>(
          <li key={label} className="flex-shrink-0">
          <Link to={link} className="p-3">{label}</Link>
          </li>
        ))}
      </ul>
    </nav>
    </div>
    </div>
    </Bounded>
  )
}


