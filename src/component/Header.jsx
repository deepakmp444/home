const Header = () => {
  return (
    <div>
      <h6 className="p-4" style={{cursor:"pointer"}}>
        <span style={{ color: "blue" }}>Home</span>
        <span style={{ marginLeft: "5px", marginRight: "5px" }}>{">>"}</span>
        <span>MEDIA LIBRARY</span>
      </h6>
    </div>
  );
};

export default Header;
