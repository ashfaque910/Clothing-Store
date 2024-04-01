function fetchAndDisplay(category, searchQuery = "") {
  const clothingList = document.getElementById("clothingList");
  fetch("https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json")
    .then((response) => response.json())
    .then((data) => {
      let categoryData = [];
      if (category === "All") {
        categoryData = data.categories.flatMap((cat) => cat.category_products);
      } else {
        const foundCategory = data.categories.find((cat) => cat.category_name.toLowerCase() === category.toLowerCase());
        if (foundCategory) {
          categoryData = foundCategory.category_products;
        }
      }

      // Filter based on search query
      if (searchQuery) {
        categoryData = categoryData.filter(product =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.vendor.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      clothingList.innerHTML = categoryData.length > 0 ?
        categoryData.map((product) => `
          <div class="clothing-item">
            <img src="${product.image}" alt="${product.title}" class="clothing-image">
            <p>Title: ${product.title}</p>
            <p>Price: ${product.price}</p>
            <p>Vendor: ${product.vendor}</p>
          </div>
        `).join("") :
        `No products found for "${searchQuery}" in ${category} category`;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      clothingList.innerHTML = "Error fetching data";
    });
}

// Initial call to fetch and display all products
fetchAndDisplay("All");

// Add event listener for search input
const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", function() {
  const searchQuery = this.value.trim();
  fetchAndDisplay("All", searchQuery);
});