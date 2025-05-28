
function ProductCard({ hit }) {
  return (
    <div className="card">
      <div className="card-body">
        <h4>{hit.baseName}</h4>
        <p>{hit.description}</p>
        <p>${hit.price}</p>
        <p>Stock: {hit.stock}</p>
      </div>
    </div>
  );
}

export default ProductCard