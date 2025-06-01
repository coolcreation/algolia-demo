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
