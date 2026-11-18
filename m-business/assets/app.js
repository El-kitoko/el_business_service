(() => {
  const products = window.MBUSINESS_PRODUCTS || [];
  if (!products.length) return;

  const $ = (id) => document.getElementById(id);
  const whatsapp = "243817100414";
  const featuredImage = $("featured-image");
  const rail = $("product-rail");
  let selected = 0;
  let timer;

  const formatPrice = (price) => price ? (typeof price === "number" ? `${price.toLocaleString("fr-FR")} $` : price) : "À confirmer";
  const waLink = (product) => {
    const message = `Bonjour M Business, je souhaite commander ${product.name}, pointure ${product.size}. Pouvez-vous me confirmer le prix et la disponibilité ?`;
    return `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`;
  };

  products.forEach((product, index) => {
    const card = document.createElement("button");
    card.className = "product-card";
    card.type = "button";
    card.dataset.index = index;
    card.setAttribute("aria-label", `Afficher ${product.name}, pointure ${product.size}, prix ${formatPrice(product.price)}`);
    card.innerHTML = `<span class="card-image"><img src="${product.image}" alt="${product.name}" loading="lazy"><span class="card-size">${product.size}</span><span class="card-price">${product.price ? formatPrice(product.price) : "Prix à confirmer"}</span></span><span class="card-copy"><strong>${product.name}</strong><small>${product.detail}</small></span>`;
    card.addEventListener("click", () => { show(index); $("featured-product").scrollIntoView({ behavior: "smooth", block: "center" }); });
    rail.appendChild(card);
  });

  const dots = $("slide-dots");
  products.forEach((product, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", `Afficher le modèle ${index + 1} : ${product.name}`);
    dot.addEventListener("click", () => show(index));
    dots.appendChild(dot);
  });

  function show(index) {
    selected = (index + products.length) % products.length;
    const product = products[selected];
    featuredImage.classList.add("is-changing");
    window.setTimeout(() => {
      featuredImage.src = product.image;
      featuredImage.alt = `${product.name}, pointure ${product.size}`;
      featuredImage.classList.remove("is-changing");
    }, 140);
    $("product-number").textContent = `MODÈLE ${String(selected + 1).padStart(2, "0")}`;
    $("product-name").textContent = product.name;
    $("product-color").textContent = product.detail;
    $("product-size").textContent = `Pointure photographiée : ${product.size}`;
    $("product-price").textContent = formatPrice(product.price);
    $("image-price").textContent = product.price ? formatPrice(product.price) : "Prix à confirmer";
    $("current-index").textContent = String(selected + 1).padStart(2, "0");
    $("featured-order").href = waLink(product);
    $("featured-order").setAttribute("aria-label", `Commander ${product.name} sur WhatsApp`);
    $("collection-order").href = waLink(product);
    [...dots.children].forEach((dot, i) => dot.setAttribute("aria-current", i === selected ? "true" : "false"));
    [...rail.children].forEach((card, i) => card.classList.toggle("is-selected", i === selected));
  }

  function startAutoplay() {
    window.clearInterval(timer);
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) timer = window.setInterval(() => show(selected + 1), 5200);
  }
  $("previous-product").addEventListener("click", () => { show(selected - 1); startAutoplay(); });
  $("next-product").addEventListener("click", () => { show(selected + 1); startAutoplay(); });
  $("featured-product").addEventListener("mouseenter", () => window.clearInterval(timer));
  $("featured-product").addEventListener("mouseleave", startAutoplay);
  $("collection-left").addEventListener("click", () => rail.scrollBy({ left: -340, behavior: "smooth" }));
  $("collection-right").addEventListener("click", () => rail.scrollBy({ left: 340, behavior: "smooth" }));
  $("year").textContent = new Date().getFullYear();
  $("total-index").textContent = String(products.length).padStart(2, "0");
  $("model-count").textContent = String(products.length).padStart(2, "0");
  show(0);
  startAutoplay();
})();
