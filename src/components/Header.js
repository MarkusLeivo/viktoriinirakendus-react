function Header() {
  return (
    <header className="navbar">
        <div className="meta-container"></div>
        <div className="nav-container">
            <img src={`${process.env.PUBLIC_URL}/ESlogo.SVG`} alt="logo" className="logo" />
        </div>
    </header>
  );
}

export default Header;