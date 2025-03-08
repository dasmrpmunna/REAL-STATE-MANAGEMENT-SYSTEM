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
    <header className="bg-dark text-white py-3">
      <div className="container d-flex justify-content-between align-items-center">
        {/* Logo */}
        <Link to="/" className="text-decoration-none">
          <h1 className="fw-bold fs-4 m-0">
            <span className="text-light">Dream</span>
            <span className="text-warning">Haven</span>
          </h1>
        </Link>

        {/* Search Bar */}
        {/* <form onSubmit={handleSubmit} className="d-flex bg-light rounded border">
          <input
            type="text"
            placeholder="Search..."
            className="form-control border-0 me-5"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn p-2">
            <FaSearch className="text-dark" />
          </button>
        </form> */}

        {/* Navigation */}
        <ul className="nav">
          <li className="nav-item">
            <Link to="/" className="nav-link text-light">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link text-light">
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/profile" className="nav-link text-light">
              {currentUser ? (
                <img
                  src={currentUser.avatar}
                  alt="avatar"
                  className="rounded-circle"
                  style={{ height: "30px", width: "30px", objectFit: "cover" }}
                />
              ) : (
                "Sign In"
              )}
            </Link>
          </li>
        </ul>
        {/* Search Bar */}
        <form onSubmit={handleSubmit} className="d-flex bg-light rounded border">
          <input
            type="text"
            placeholder="Search..."
            className="form-control border-0 me-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn p-2">
            <FaSearch className="text-dark" />
          </button>
        </form>
      </div>
    </header>
  );
};

export default Header;
