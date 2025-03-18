document.addEventListener("DOMContentLoaded", function () {
    // Ambil parameter ID dari URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");

    fetch("data/product.json")
        .then(response => response.json())
        .then(data => {
            const product = data.find(p => p.id == productId);
            if (product) {
                document.getElementById("bookingDetails").innerHTML = `
                    <h2>${product.name}</h2>
                    <img src="${product.image}" alt="" style="width: 100%;">
                    <p><strong>Year:</strong> ${product.details.year}</p>
                    <p><strong>Engine:</strong> ${product.details.engine}</p>
                    <p><strong>Transmission:</strong> ${product.details.transmission}</p>
                    <p><strong>Price:</strong> ${product.details.price}</p>
                `;
            } else {
                document.getElementById("bookingDetails").innerHTML = "<p>Mobil tidak ditemukan!</p>";
            }
        })
        .catch(error => console.error("Error fetching product.json:", error));

    document.getElementById("bookingForm").addEventListener("submit", function (event) {
        event.preventDefault();
        alert("Booking berhasil dikonfirmasi!");
        window.location.href = "index.html"; // Redirect ke halaman utama setelah booking
    });
});