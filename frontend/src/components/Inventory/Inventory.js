import React, { useEffect, useState } from "react";
import "./Inventory.css";
import Button from "../../Utils/Button/Button";
import EachBook from "../EachBook/EachBook";
import { useHistory } from "react-router-dom";

const Inventory = (props) => {
  let history = useHistory();
  const [books, setBooks] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/api/books/")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setBooks(data["books"]);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleClick = () => {
    console.log("Hello");
    console.log(history);
    history.push(`/admin/inventory/book/new`);
  };
  const deleteBook = (id, index) => {

    fetch(`http://localhost:5000/api/admin/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Successfully deleted");
      })
      .catch((err) => {
        console.error("Something went wrong!");
      });

    let temp = [...books];
    temp.splice(index, 1);
    setBooks(temp);
  };

  const [search, setSearch] = useState("");

  const searchBooks = (search) => {
    const check=(one)=>{
      console.log(one);
      return one.toString().startsWith(search);
    }
    return books.filter((each) => {
      return check(each.title) || check(each.year) || check(each.author) || check(each.publicationName)
    })
  }

  return (
    <div className="inventory">
      <div className="upper__inventory">
        <div>Inventory</div>
        {props.type == "admin" && (
          <Button disabled={false} click={handleClick} text="Add Book" />
        )}
      </div>
      <div className="search__div">
        <input
          type="text"
          placeholder="Search by name, author, year of publication, publisher"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="lower__inventory">
        <div className="table__heading">
          <div>Cover</div>
          <div>Title</div>
          <div>Author</div>
          <div>Publication Year</div>
          <div>Copies</div>
        </div>
        {searchBooks(search).map((each, index) => {
          console.log(each);
          return (
            <EachBook
              data={each}
              index={index}
              click={deleteBook}
              type={props.type}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Inventory;
