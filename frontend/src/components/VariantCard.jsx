
function VariantCard({ hit }) {
  return (
    <div className="card">
      <div className="card-body">
        <h4>{hit.baseName}</h4>
        <p>{hit.description}</p>
        <p>Color: {hit.color}, Size: {hit.size}</p>
        <p>${hit.price}</p>
        <p>Stock: {hit.stock}</p>
      </div>
    </div>
  );
}

export default VariantCard