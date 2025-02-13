import CreateOrder from "./CreateOrder";
import SearchOrder from "./SearchOrder";

function NavBar() {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container-fluid d-flex justify-content-around">
        <a className="navbar-brand" href="/">
          <h1 className="m-0">GSystem</h1>
        </a>
        <div className="d-flex gap-2">
          <CreateOrder />
          <SearchOrder />
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
