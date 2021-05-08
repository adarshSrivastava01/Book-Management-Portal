import React, { useEffect, useState } from "react";
import Input from "../../Utils/Input/Input";
import Button from "../../Utils/Button/Button";
import "./UpdateBook.css";
import { useParams, useLocation, useHistory } from "react-router-dom";

const UpdateBook = (props) => {
  const [title, setTitle] = useState("");
  const [publication, setPublication] = useState("");
  const [author, setAuthor] = useState("");
  const [pubyear, setPubyear] = useState("");
  const [copies, setCopies] = useState(0);
  const { bid } = useParams();
  const history = useHistory();
  function useQuery() {
    const temp = useLocation().search;
    return temp.slice(1);
  }
  const query = useQuery();
  useEffect(() => {
    if (query.startsWith("preload=true")) {
      fetch(`http://localhost:5000/api/books/${bid}`)
        .then((res) => res.json())
        .then((data) => {
          data = data.book;
          setTitle(data.title);
          setPublication(data.publicationName);
          setAuthor(data.author);
          setPubyear(+data.year);
          setCopies(+data.copiesAvailable);
        })
        .catch((err) => console.error(err));
    }
  }, []);

  const finalFunction = (event) => {
    if (query.endsWith("user=true")) return issueBook(event);
    if (query.startsWith("preload=true")) return updateSubmitHandler(event);
    else return addBook(event);
  };

  const createJson = () => {
    return JSON.stringify({
      title: title,
      author: author,
      copiesAvailable: +copies,
      year: +pubyear,
      publicationName: publication,
    });
  };

  const addBook = (event) => {
    event.preventDefault();
    fetch(`http://localhost:5000/api/admin/addbook/${props.data["userId"]}`, {
      method: "POST",
      body: createJson(),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Added Book Successfully!!!");
        history.push("/admin/inventory");
      })
      .catch((err) => {
        alert("Error Occured!!!");
        console.error("Error Occured!!!");
      });
  };

  const updateSubmitHandler = (event) => {
    event.preventDefault();
    fetch(`http://localhost:5000/api/admin/${bid}`, {
      method: "PATCH",
      body: createJson(),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Updated Book Successfully!!!");
        history.push("/admin/inventory");
      })
      .catch((err) => {
        alert("Error Occured!!!");
        console.error("Error Occured!!!");
      });
  };

  const issueBook = (event) => {
    event.preventDefault();
    console.log(bid);
    fetch(`http://localhost:5000/api/users/issuebook/${bid}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        alert("You get this book");
        history.push("/user/inventory");
      })
      .catch((err) => {
        alert("Couln't get you the book");
      });
  };

  return (
    <div className="update__book">
      <div className="image__box">
        <img src="https://picsum.photos/200" alt="Book" />
      </div>
      <form className="update__form">
        <Input
          htmlFor={"title"}
          id={"title"}
          label={"Title"}
          type={"text"}
          value={title}
          setFunction={setTitle}
        />
        <Input
          htmlFor={"publication"}
          id={"publication"}
          label={"Publication Name"}
          type={"text"}
          value={publication}
          setFunction={setPublication}
        />
        <Input
          htmlFor={"author"}
          id={"author"}
          label={"Author Name"}
          type={"text"}
          value={author}
          setFunction={setAuthor}
        />
        <Input
          htmlFor={"pubyear"}
          id={"pubyear"}
          label={"Publication Year"}
          type={"text"}
          value={pubyear}
          setFunction={setPubyear}
        />
        <label htmlFor="copies" className="copies">
          Copies
        </label>
        <input
          type="number"
          id="copies"
          className="num"
          value={copies}
          onChange={(e) => setCopies(e.target.value)}
        ></input>
        <Button
          disabled={false}
          click={finalFunction}
          text={query.endsWith("user=true") ? `Get Book` : `Update Book`}
        />
      </form>
    </div>
  );
};

export default UpdateBook;
