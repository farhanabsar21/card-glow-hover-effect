// Static variables
const imgUrl = "https://banner2.cleanpng.com/20190228/qby/kisspng-google-logo-google-account-g-suite-google-images-g-icon-archives-search-png-1713904157115.webp";

// Get the DOM ref
const testimonialCardContainer = document.getElementById("testimonial-cards-list");

// create card list in the DOM
fetch("data/index.json")
  .then((response) => {
    if (!response.ok) throw new Error("Network response was not ok " + response.statusText);
    return response.json();
  })
  .then((testimonials) => {
    const testimonialCards = testimonials.map((testimonial) => {
      const { description, username, position, company, country, date } = testimonial;
      return `
                <div class="testimonial-card">
                    <div class="testimonial-card-glass"></div>
                    <div class="testimonial-card-header">
                        <img src=${imgUrl} alt="google"/>
                        <p>${date}</p>
                    </div>
                    <div class="testimonial-card-top">
                        <p>${description}</p>
                    </div>
                    <div class="testimonial-card-bottom">
                        <p>${username}</p>
                        <p>${position}, ${company}, ${country}</p>
                    </div>
                </div>
            `;
    });

    testimonialCardContainer.innerHTML = testimonialCards.join("");
  })
  .catch((err) => {
    console.error("Error fetching the testimonials:", err);
  });

// create the hover effect
testimonialCardContainer.addEventListener("mousemove", (e) => {
  console.log(e);
  const cards = document.querySelectorAll(".testimonial-card");
  let hoveredCard = null;

  // Find the hovered card
  cards.forEach((card) => {
    const rect = card.getBoundingClientRect();
    if (e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom) {
      hoveredCard = card;
    }
  });

  if (hoveredCard) {
    const rect = hoveredCard.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    hoveredCard.style.setProperty("--x", `${x}px`);
    hoveredCard.style.setProperty("--y", `${y}px`);
  }
});
