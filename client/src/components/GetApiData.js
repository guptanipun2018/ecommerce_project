import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { Navigate } from "react-router-dom";
import Productcards from "./Product/Productcards";

const GetApiData = () => {
  const { isAuthenticated } = useContext(AuthContext);

  const [copyList, setCopyList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setCopyList(data.products);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  if (!isAuthenticated) {
    return <Navigate to="/signin" />;
  }

  if (error) return <p>Error fetching data: {error}</p>;
  if (copyList.length === 0) return <p>Loading products...</p>;

  return (
    <div className="product-grid">
      {copyList.map((prod) => (
        <Productcards key={prod.id} pData={prod} />
      ))}
      
    </div>
  );
};

export default GetApiData;
