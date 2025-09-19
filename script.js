// ================= Smooth scroll for internal links =================
document.querySelectorAll('.nav-links a').forEach(anchor => {
  anchor.addEventListener('click', function(e){
    e.preventDefault();
    const targetPage = this.getAttribute('href');
    window.location.href = targetPage;
  });
});

// ================= Smooth page fade-in =================
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

// ================= Typing effect for hero text =================
const text = "Welcome to TechnicalRayyan – Futuristic Web Development";
let i = 0;
function typeWriter() {
  if (i < text.length) {
    document.getElementById("typing-text").innerHTML += text.charAt(i);
    i++;
    setTimeout(typeWriter, 80);
  }
}
window.onload = typeWriter;

// ================= Custom glowing cursor =================
const cursor = document.createElement("div");
cursor.classList.add("cursor");
document.body.appendChild(cursor);

document.addEventListener("mousemove", e => {
  cursor.style.left = e.pageX + "px";
  cursor.style.top = e.pageY + "px";
});

// ================= Contact Form Submission =================
const contactForm = document.querySelector("#contactForm"); // matches your HTML ID
const responseMsg = document.querySelector("#responseMsg");

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = {
      name: document.querySelector("input[name='name']").value,
      email: document.querySelector("input[name='email']").value,
      message: document.querySelector("textarea[name='message']").value,
    };

    try {
      const res = await fetch("http://localhost:5000/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      // Display success or error in contact page
      responseMsg.innerText = data.message;
      responseMsg.style.color = data.message.includes("✅") ? "lime" : "red";

      if (data.message.includes("✅")) contactForm.reset();
    } catch (err) {
      responseMsg.innerText = "❌ Failed to send message. Please try again later.";
      responseMsg.style.color = "red";
      console.error(err);
    }
  });
}
