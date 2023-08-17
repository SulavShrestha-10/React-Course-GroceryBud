import { useEffect, useState } from "react";
import List from "./List";
import { nanoid } from "nanoid";
import { ToastContainer, toast } from "react-toastify";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    list = JSON.parse(localStorage.getItem("list"));
  } else {
    list = [];
  }
  return list;
};
const App = () => {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      toast.error("please provide a value!");
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editId) {
            return { ...item, item: name };
          }
          return item;
        })
      );
      setName("");
      setEditId(null);
      setIsEditing(false);
      toast.success("item edited!");
    } else {
      const newItem = {
        id: nanoid(),
        item: name,
        completed: false,
      };
      setList([...list, newItem]);
      setName("");
      toast.success("item added to the list");
    }
  };
  const clearItems = () => {
    setList([]);
    toast.error("items cleared!");
  };
  const removeItem = (id) => {
    const data = list.filter((item) => item.id === id);
    setList(list.filter((item) => item.id !== id));
    toast.error(`${data[0].item} removed!`);
  };
  const checkItem = (id) => {
    const newItems = list.map((item) => {
      if (item.id === id) {
        const newItem = { ...item, completed: !item.completed };
        return newItem;
      }
      return item;
    });
    setList(newItems);
  };
  const editItem = (id) => {
    const specificItem = list.filter((item) => item.id === id);
    setIsEditing(true);
    setEditId(id);
    console.log(specificItem);
    setName(specificItem[0].item);
  };
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);
  return (
    <section className="section-center">
      <ToastContainer position="top-center" />
      <form className="grocery-form" onSubmit={handleSubmit}>
        <h3
          style={{
            textAlign: "center",
            marginBottom: "2rem",
          }}
        >
          Grocery Bud
        </h3>
        <div className="form-control">
          <input
            type="text"
            className="form-input"
            placeholder="e.g. eggs"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="btn">
            {isEditing ? "Edit" : "Submit"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <List
          items={list}
          checkItem={checkItem}
          removeItem={removeItem}
          clearItems={clearItems}
          editItem={editItem}
        />
      )}
    </section>
  );
};

export default App;
