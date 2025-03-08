import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <header className="bg-dark text-white py-4 shadow-lg">
      <div className="container d-flex flex-wrap justify-content-between align-items-center">
        
        {/* Logo */}
        <Link to="/" className="text-decoration-none">
          <h1 className="fw-bold fs-4 m-0">
            <span className="text-light">Dream</span>
            <span className="text-warning">Haven</span>
          </h1>
        </Link>

        {/* Navigation */}
        <ul className="nav gap-3">
          <li className="nav-item">
            <Link to="/" className="nav-link text-light fw-semibold px-4 py-2 rounded bg-transparent hover:bg-warning transition">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link text-light fw-semibold px-4 py-2 rounded bg-transparent hover:bg-warning transition">
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/profile" className="nav-link px-3 py-1 rounded bg-warning text-dark fw-semibold hover:bg-yellow-600 transition">
              {currentUser ? (
                <img
                  src={currentUser.avatar}
                  alt="avatar"
                  className="rounded-circle border border-light"
                  style={{ height: "35px", width: "35px", objectFit: "cover" }}
                />
              ) : (
                "Sign In"
              )}
            </Link>
          </li>
        </ul>

        {/* Search Bar */}
        <form onSubmit={handleSubmit} className="d-flex bg-light rounded border overflow-hidden">
          <input
            type="text"
            placeholder="Search..."
            className="form-control border-0 px-3"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn bg-warning px-3 py-1">
            <FaSearch className="text-dark" />
          </button>
        </form>

      </div>
    </header>
  );
};

export default Header;
