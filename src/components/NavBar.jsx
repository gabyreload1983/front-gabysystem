import SearchOrder from "./SearchOrder";

function NavBar() {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand m-auto" href="/">
          <h1 className="m-0">GS - V{import.meta.env.VITE_VERSION}</h1>
        </a>
        <SearchOrder />
      </div>
    </nav>
  );
}

export default NavBar;
