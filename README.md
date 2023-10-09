# React

React для начинающих

## React json-server

## Installation

```bash
npm install
```

```bash
npm i json-server
```

## Start project

```bash
npm start
```

## add folder data and file db.json

```bash
{
    "items": [
        {
            "id": 1,
            "checked": false,
            "item": "Coffee"
        },
        {
            "id": 2,
            "checked": false,
            "item": "Bread"
        },
        {
            "id": 3,
            "checked": false,
            "item": "Milk"
        }
    ]
}
```

## Start json server
```bash
npx json-server -p 3500 -w data/db.json
```

## add API URL
```bash
const API_URL = "http://localhost:3500/items"

change status useState([])
const [items, setItems] = useState([]);

add function fetchItems

 const fetchItems = async () => {
        try {
            const response = await fetch(API_URL)
            const listItems = await response.json()
            setItems(listItems)
        } catch (error) {
            console.log(error);
        }
    }
    fetchItems()
```

## Add fetchError
```bash
const [fetchError, setFetchError] = useState(null)

update function fetchItems
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
      }
    }
```

## update component Content
```bash
{fetchError && <h2 className="error">{`Error: ${fetchError}`}</h2>}
```

## update Loading
```bash
const [isLoading, setIsLoading] = useState(true)

add finally in fn fetchItems

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
```
## add async in useEffect 
```bash

setTimeout(() => {
      (async () => fetchItems())()
}, 1500);

```

## upgrade component Content

```bash
{fetchError && <h2 className="error">{`Error: ${fetchError}`}</h2>}
        {isLoading && <p style={{textAlign: "center"}}>Loading...</p>}
        {!fetchError && !isLoading && <Content 
          items={items.filter( item => (item.item).toLowerCase().includes(serchItem.toLowerCase()))}
          setItems={setItems}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />}
```


## Больше уроков

[Уроки по React](https://www.youtube.com/playlist?list=PLHyIl59J60-V7-9nam_uikG3XAydd0dYT)
