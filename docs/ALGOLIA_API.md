### API Endpoints for Algolia Integration  

| **Endpoint**                        | **Purpose**                                                                                   |
| ----------------------------------- | --------------------------------------------------------------------------------------------- |
| `POST /api/algolia-sync` | Runs the `syncAlgolia()` logic to push MongoDB data to Algolia.                               |
| `GET /api/algolia-key`              | Returns a scoped, secured **search key** to the frontend.                                     |
| `GET /api/search?q=term`            | (Optional) A server-side **proxy endpoint** to perform Algolia search for SSR or admin needs. |

#### 1. **Frontend apps can’t expose secret keys**

In your backend code, you use:

```js
const ALGOLIA_API_KEY = process.env.Write_API_Key
```

That **write key** is sensitive — it gives full access to your index, so it **should not** be sent to the frontend.

#### 2. **You need a *secured* frontend search key**

That’s where the **`GET /api/algolia-key`** comes in:

It’s an endpoint that:

* Uses Algolia’s admin SDK on the backend
* Generates a **search-only key** (scoped to index, filters, etc.)
* Returns that key to the frontend safely

Example response:

```json
{
  "key": "xxxx-secured-search-key-xxxx"
}
```

The frontend then uses this **limited key** to query Algolia safely:

```js
const client = algoliasearch('YourAppID', 'search-only-key-from-backend');
```  

---  
### Algolia Workflow  

![Algolia Workflow](https://raw.githubusercontent.com/coolcreation/collab-enhanced/main/docs/images/algolia_workflow_created_with_mermaid.png)

--- 



### Using Algolia to build a Cart page  

Build a **Cart page** that:

1. Gets the **secure Algolia search key** from your backend (`GET /api/algolia-key`)
2. Initializes the Algolia search client on the frontend using that key
3. Lets users search products and **add to a cart**
4. (Optional) Stores the cart in **localStorage** or later sends it to your backend

That is the basic goal, let's start building this out.

#### 1. Create a new React component:

```
/src/pages/CartPage.js
```

Then, in App.js add the route:

```js
<Route path="/cartPage" element={<CartPage />} />
```

---

#### 2. Basic structure with Secure Algolia

```jsx
// src/pages/CartPage.js

import React, { useEffect, useState } from 'react'
import algoliasearch from 'algoliasearch/lite'
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom'

const CartPage = () => {
  const [searchClient, setSearchClient] = useState(null)
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    async function fetchSearchKey() {
      try {
        const res = await fetch('/api/algolia-key') // Call your secure endpoint
        const data = await res.json()
        const client = algoliasearch('YourAppID', data.key) // Use response key
        setSearchClient(client)
      } catch (error) {
        console.error('Error getting search key:', error)
      }
    }

    fetchSearchKey()
  }, [])

  const addToCart = (item) => {
    setCartItems(prev => [...prev, item])
    console.log('Cart updated:', [...cartItems, item])
  }

  const ProductHit = ({ hit }) => (
    <div style={{ border: '1px solid #ddd', padding: '1rem', margin: '0.5rem 0' }}>
      <h4>{hit.baseName}</h4>
      <p>{hit.description}</p>
      <button onClick={() => addToCart(hit)}>Add to Cart</button>
    </div>
  )

  if (!searchClient) return <p>Loading search client...</p>

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Shop & Build Your Cart</h2>

      <InstantSearch searchClient={searchClient} indexName="products">
        <SearchBox />
        <Hits hitComponent={ProductHit} />
      </InstantSearch>

      <hr />
      <h3>Cart Items</h3>
      <ul>
        {cartItems.map((item, idx) => (
          <li key={idx}>{item.baseName} - ${item.price}</li>
        ))}
      </ul>
    </div>
  )
}

export default CartPage
```

---

#### 3. Next critical step: Create `/api/algolia-key` Route

Install backend dependency (cd `./backend`):
```
npm install algoliasearch
```
Install frontend dependency (cd `./frontend`):
```
npm install algoliasearch react-instantsearch-dom
```
In Express `./backend` create a new file:
```
/routes/algoliaRoutes.js
```
In `server.js` connect that file/route:
```
import algoliaRoutes from './routes/algoliaRoutes.js'

app.use('/api', algoliaRoutes)
```


This backend `/api/algolia-key` route must return:

```js
{
  "key": "secure-limited-search-key"
}
```
Now, build the file so we can return that **`"key"`**:  
```js
// routes/algoliaRoutes.js
import express from 'express'
import algoliasearch from 'algoliasearch'

const router = express.Router()

const ALGOLIA_APP_ID = process.env.Application_ID
const ALGOLIA_ADMIN_KEY = process.env.Write_API_Key
const ALGOLIA_INDEX_NAME = 'products'

const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY)

router.get('/algolia-key', (req, res) => {
  try {
    const searchKey = client.generateSecuredApiKey(ALGOLIA_ADMIN_KEY, {
      filters: '', // e.g., 'stock > 0' or limit by user role if needed
      validUntil: Math.floor(Date.now() / 1000) + 3600, // optional: key expires in 1 hour
    })

    res.json({ key: searchKey })
  } catch (error) {
    console.error('Error generating Algolia key:', error)
    res.status(500).json({ error: 'Failed to generate Algolia search key' })
  }
})

export default router
```



---

#### 4. In backend `.env` file:

* `Application_ID`
* `Search_API_Key`
* `Write_API_Key` (private, used only server-side)
* The secure key logic should be **scoped with filters** (read-only & index-restricted)

---

#### 5. Save Cart to LocalStorage

We need to save React `state` to persist cart items on reload:

```js
useEffect(() => {
  const savedCart = JSON.parse(localStorage.getItem('cart')) || []
  setCartItems(savedCart)
}, [])

useEffect(() => {
  localStorage.setItem('cart', JSON.stringify(cartItems))
}, [cartItems])
```

