import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { faGlobe, faShieldAlt } from "@fortawesome/free-solid-svg-icons";
const LastFooter = () => {
  return (
    <div className="w-full flex   justify-between xl:flex-row py-2 gap-4 border-t-2">
      <div className="flex    xl:flex-row gap-2">
        <div className="text-xs self-center">© 2024 Airbnb, Inc.</div>
        <div>
          <ol className="flex gap-2 items-center">
            <li>
              <Link to={""} className="hover:underline text-xs">
                Terms
              </Link>{" "}
              ·
            </li>
            <li>
              <Link to={""} className="hover:underline text-xs">
                Sitemap
              </Link>{" "}
              ·
            </li>
            <li>
              <Link to={""} className="hover:underline text-xs">
                Privacy
              </Link>{" "}
              ·
            </li>
            <li>
              <Link to={""} className="hover:underline text-xs flex gap-2">
                Your Privacy Choices <FontAwesomeIcon icon={faShieldAlt} />
              </Link>
            </li>
          </ol>
        </div>
      </div>
      <div className="flex justify-between gap-4">
        <button className="flex items-center gap-2 group hover:cursor-pointer">
          <FontAwesomeIcon icon={faGlobe} />{" "}
          <h1 className="text-xs hover:underline group-hover:cursor-pointer">
            English(US)
          </h1>
        </button>
        <button className="text-xs">
          <span>$</span> <span className="hover:underline">USD</span>
        </button>
        <ul className="flex gap-3 items-center">
          <li>
            <Link className="hover:cursor-pointer" to={""}>
              <FontAwesomeIcon icon={faFacebookF} />{" "}
            </Link>
          </li>
          <li>
            <Link className="hover:cursor-pointer" to={""}>
              <FontAwesomeIcon icon={faTwitter} />{" "}
            </Link>
          </li>
          <li className="hover:cursor-pointer">
            <Link to={""}>
              <FontAwesomeIcon icon={faInstagram} />{" "}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LastFooter;