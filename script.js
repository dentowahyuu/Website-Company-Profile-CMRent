document.addEventListener("DOMContentLoaded", function () {
    /*** NAVBAR TOGGLE ***/
    const navbarNav = document.querySelector('.nav-links');
    const menuToggle = document.querySelector('.hamburger-icon');

    if (menuToggle) {
        menuToggle.addEventListener('click', function (event) {
            navbarNav.classList.toggle('active'); // Toggle sidebar
            menuToggle.classList.toggle('active'); // Ubah warna hamburger
            event.stopPropagation(); // Hindari trigger event di document
        });
    }

    document.addEventListener('click', function (e) {
        if (!menuToggle.contains(e.target) && !navbarNav.contains(e.target)) {
            navbarNav.classList.remove('active'); // Tutup menu
            menuToggle.classList.remove('active'); // Kembalikan warna hamburger
        }
    });

    /*** PRODUK DETAIL MODAL ***/
    let listProductHTML = document.querySelector('.listProduct');
    let modal = document.getElementById("carModal");
    let modalBody = document.getElementById("modal-body");
    let closeModal = document.querySelector(".close");

    fetch("data/product.json")
        .then(response => response.json())
        .then(data => {
            data.forEach(product => {
                let newProduct = document.createElement('div');
                newProduct.classList.add('item');
                newProduct.innerHTML = `
                    <img src="${product.image}" alt="">
                    <h2>${product.name}</h2>
                    <div class="desc">${product.desc}</div>
                    <div class="button-group">
                        <button class="viewDetails" data-id="${product.id}">View Details</button>
                        <button class="bookingNow" data-id="${product.id}">Booking Now</button>
                    </div>

                `;

                newProduct.querySelector(".viewDetails").addEventListener("click", function () {
                    showDetails(product);
                });

                newProduct.querySelector(".bookingNow").addEventListener("click", function () {
                    window.location.href = `booking.html?id=${product.id}`;
                });

                listProductHTML.appendChild(newProduct);
            });
        })
        .catch(error => console.error("Error fetching product.json:", error));

    function showDetails(product) {
        if (product.details) { // Cek apakah `details` ada di JSON
            modalBody.innerHTML = `
                <h2>${product.name}</h2>
                <img src="${product.image}" alt="" class="img-fluid" style="width: 100%;">
                <p><strong>Year:</strong> ${product.details.year || 'N/A'}</p>
                <p><strong>Engine:</strong> ${product.details.engine || 'N/A'}</p>
                <p><strong>Transmission:</strong> ${product.details.transmission || 'N/A'}</p>
                <p><strong>Price:</strong> ${product.details.price || 'N/A'}</p>
            `;
            modal.style.display = "block";
        } else {
            console.error("Error: `details` tidak ditemukan dalam produk:", product);
        }
    }

    closeModal.addEventListener("click", function () {
        modal.style.display = "none";
    });

    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };

    /*** TESTIMONI SWIPER ***/
    const testimoniWrapper = document.querySelector(".swiper-wrapper");

    fetch("data/testimoni.json")
        .then(response => response.json())
        .then(data => {
            testimoniWrapper.innerHTML = ""; // Kosongkan isi awal

            data.forEach(testimoni => {
                let testimoniSlide = document.createElement("div");
                testimoniSlide.classList.add("swiper-slide");
                testimoniSlide.innerHTML = `
                    <div class="testimoni-item">
                        <img src="${testimoni.image}" alt="${testimoni.name}">
                        <div class="testimoni-text">
                            <h3>${testimoni.name}</h3>
                            <a>${testimoni.star}</a>
                            <p>"${testimoni.review}"</p>
                        </div>
                    </div>
                `;
                testimoniWrapper.appendChild(testimoniSlide);
            });

            // Inisialisasi Swiper setelah data dimuat
            new Swiper(".testimoni-container", {
                slidesPerView: 1,   // Default untuk HP
                spaceBetween: 20,
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true,
                },
                breakpoints: {
                    768: { slidesPerView: 2 },  // Tablet
                    1024: { slidesPerView: 3 }, // Laptop/Desktop
                },
            });
        })
        .catch(error => console.error("Error fetching testimoni.json:", error));
});
