// import "assets/objects/page-not-found.scss";
import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div className="c-page-not-found">
      <div>Oops!</div>
      <div>404</div>
      <div>Sorry, couldn't find what you're looking for</div>
      <Link to={"/"}> Got back </Link>
    </div>
  );
}
