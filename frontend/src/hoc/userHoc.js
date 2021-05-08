import "./userHoc.css";
import { Switch, Route, NavLink } from "react-router-dom";

export default function UserHoc(props) {
  return (
    <div className="dashboard">
      <div class="left__nav">
        <h2>Good Morning</h2>
        <h4>{props.name}</h4>
        <NavLink activeClassName="active__link" to={`/${props.type}/inventory`}>
          Inventory
        </NavLink>
        <NavLink
          activeClassName="active__link"
          to={`/${props.type}/${props.type == "admin" ? "Users" : "orders"}`}
        >
          {props.type == "admin" ? "Users" : "Orders"}
        </NavLink>
        <a href="/login">Logout</a>
      </div>
      <div className="right__side">{props.children}</div>
    </div>
  );
}
