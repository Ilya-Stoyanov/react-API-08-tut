import React, { useState, useEffect} from "react";

import Header from "./Header";
import Footer from "./Footer";
import Content from "./Content";
import AddItem from "./AddItem";
import SearchItem from "./SearchItem";

function App() {

  const [items, setItems] = useState([]);
  const [newItems, setNewItems] = useState("");
  const [serchItem, setSerchItem] = useState("")
  const [fetchError, setFetchError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const API_URL = "http://localhost:3500/items"

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL)
        const listItems = await response.json()
        if(!response.ok) throw Error("Did not receive list items")
        // console.log(listItems);
        setItems(listItems)
        setFetchError(null)
      } catch (error) {
        console.log(error);
        setFetchError(error.message)
      } finally{
        setIsLoading(false)
      }
    }
    setTimeout(() => {
      (async () => fetchItems())()
    }, 1500);
    
  }, [])

  const handleCheck = (id) =>{
    const listItems = items.map(item => item.id === id ? {...item, checked: !item.checked} : item)
    setItems(listItems)
    
  }

  const handleDelete = (id) => {
    const listItems = items.filter(item => item.id !== id)
    setItems(listItems)
  }

  const addItem = item => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = {id, checked: false, item};
    const listItems = [...items, myNewItem];
    setItems(listItems)
  }

  const HeandlSubmit = e => {
    e.preventDefault();
    if(!newItems) return;
    addItem(newItems);
    console.log(newItems);
    setNewItems("");
  }

  return (
    <div className="App">
      <Header />
      <SearchItem
        serchItem={serchItem}
        setSerchItem={setSerchItem}
      />
      <AddItem
        newItems={newItems}
        setNewItems={setNewItems}
        HeandlSubmit={HeandlSubmit}
      />
      <main>
        {fetchError && <h2 className="error">{`Error: ${fetchError}`}</h2>}
        {isLoading && <p style={{textAlign: "center"}}>Loading...</p>}
        {!fetchError && !isLoading && <Content 
          items={items.filter( item => (item.item).toLowerCase().includes(serchItem.toLowerCase()))}
          setItems={setItems}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />}
      </main>
      
      <Footer length={items.length} />
    </div>
  );
}

export default App;
