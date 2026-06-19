import { SideNavigation, SideNavigationItem, Button } from "@ui5/webcomponents-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../api/auth";

export default function LeftSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("currentUser") || "{}");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div style={{ width: "250px", borderRight: "1px solid #ccc" }}>
      <div style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
        <p>User: {user?.username}</p>
        <Button design="Transparent" onClick={handleLogout}>
          Logout
        </Button>
      </div>
      <SideNavigation>
        <Link to="/dashboard">
          <SideNavigationItem text="Dashboard" selected={location.pathname === "/dashboard"} />
        </Link>
        <Link to="/transactions">
          <SideNavigationItem text="Transactions" selected={location.pathname === "/transactions"} />
        </Link>
        <Link to="/users">
          <SideNavigationItem text="Users" selected={location.pathname === "/users"} />
        </Link>
        <Link to="/settings">
          <SideNavigationItem text="Settings" selected={location.pathname === "/settings"} />
        </Link>
      </SideNavigation>
    </div>
  );
}
