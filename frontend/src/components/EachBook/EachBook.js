import React from "react";
import "./EachBook.css";
import { NavLink } from "react-router-dom";
import Button from "../../Utils/Button/Button";

const EachBook = (props) => {
  return (
    <div className="each__book">
      <div>
        <img src={props.data.image} alt={props.data.image} />
      </div>
      <div>{props.data.title}</div>
      <div>{props.data.author}</div>
      <div>{props.data.year}</div>
      <div>{props.data.copiesAvailable}</div>
      {props.type === "admin" ? (
        <>
          <NavLink
            to={`/admin/inventory/book/${props.data["_id"]}?preload=true`}
          >
            View
          </NavLink>
          <Button
            disabled={false}
            click={() => props.click(props.data["_id"], props.index)}
            text="Delete"
            color="red"
          />
        </>
      ) : (
        <NavLink to={`/user/inventory/book/${props.data["_id"]}?preload=true&user=true`}>
          Get
        </NavLink>
      )}
    </div>
  );
};

export default EachBook;
