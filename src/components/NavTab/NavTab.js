import { Link } from "react-scroll";

function NavTab() {
  return (
    <div className="navtab">
      <Link
        className="navtab__link"
        href="#"
        to="about-project"
        smooth={true}
        duration={500}
      >
        Узнать больше
      </Link>
    </div>
  );
}

export default NavTab;
