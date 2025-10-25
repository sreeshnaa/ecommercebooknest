import React, { useState } from "react";

function BookList() {
  const [selectedOption, setSelectedOption] = useState("");
  const [response1, setResponse] = useState([]);

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const submitDetails = async (e) => {
    e.preventDefault();
    const booknest = { category: selectedOption };

    try {
      const response = await fetch("http://localhost:4000/booklist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(booknest),
      });

      const msg = await response.json();
      setResponse(msg);
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred.");
    }
  };

  return (
    <div className="booklist-container">
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="navbar-logo">📚 BookNest</div>
        <form className="category-form" onSubmit={submitDetails}>
          <select value={selectedOption} onChange={handleChange} required>
            <option value="">Select Category</option>
            <option value="Historical">Historical</option>
            <option value="Mythological">Mythological</option>
            <option value="Novel">Novel</option>
            <option value="Epic">Epic</option>
            <option value="Biography">Biography</option>
            <option value="Folk Tales">Folk Tales</option>
            <option value="Short Stories">Short Stories</option>
            <option value="Fiction">Fiction</option>
            <option value="Anthropology">Anthropology</option>
            <option value="Classic">Classic</option>
          </select>
          <button type="submit">Browse</button>
        </form>
      </nav>

      {/* BOOK CARDS */}
      <div className="book-grid">
        {response1.map((book, i) => (
          <div key={i} className="book-card">
            <img
              src={book.image_url}
              alt="Book Cover"
              className="book-image"
              //onError={(e) => (e.target.src = "/default.jpg")}
            />
            <h3 className="book-title">{book.title}</h3>
            <p className="book-author">By {book.author}</p>
            <p className="book-price">₹{book.price}</p>
            <button className="buy-button">Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookList;

