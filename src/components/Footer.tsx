import { Link } from 'react-router-dom'
import Bounded from "./Bounded";
import Icon from "./Icon";

export default function Footer(props: HeaderFooterProps) {

  return (
    
  <Bounded as="footer">
    <div className="flex sm:flex-row flex-col justify-between items-center gap-6 py-9">
    <Link to="/"><Icon/></Link>

<p className="text-xs">©{new Date().getFullYear()} beyondtipping</p>

      <ul className="flex">
        {props.navigation.map(({link, label})=>(
          <li key={label}>
          <Link to={link} className="p-3">{label}</Link>
          </li>
        ))}
      </ul>
      </div>
</Bounded>
  )
}
