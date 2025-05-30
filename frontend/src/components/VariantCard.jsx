
function VariantCard({ hit, handleProductAdded }) {

  const displayImage =
    hit.imageURL && hit.imageURL.length > 0 ? hit.imageURL[0] : null;

  return (
    <div className="card">
      <div className="card-body">
        <h4>{hit.baseName}</h4>
        <hr/>
        <p>{hit.description}</p>
        <p>{hit.brand}</p>
        <p>{Array.isArray(hit.categories) ? hit.categories.join(", ") : hit.categories}</p>
        <p className="text-primary fs-5">${hit.price?.toFixed(2) || "N/A"}</p>
        <p>Stock: {hit.stock ?? "N/A"}</p>

        {displayImage ? (
          <img
            src={displayImage.url}
            alt={displayImage.alt || "Product image"}
            style={{ maxWidth: "100%", height: "auto" }}
          />
        ) : (
          <p>No image available</p>
        )}
      </div>
      <button className='m-3 btn btn-success' onClick={() => handleProductAdded(hit.objectID)}> Add to Cart </button>

    </div>
  );
}

export default VariantCard


/***********************************************************************
 VariantCard & ProductCard Components will use the following attributes:

// Variant-Level Records
        objectID: ? `${p._id.toString()}-${v.sku}` : p._id.toString(),
        name 
        price 
        stock 
        description 
        brand 
        categories 
        imageURL 

// Product-Level Records
        objectID: p._id.toString(),
        baseName 
        description 
        brand 
        categories 
        price: p.variants?.[0]?.price || 0,
        stock: p.variants?.[0]?.stock || 0,
        imageURL

************************************************************************/