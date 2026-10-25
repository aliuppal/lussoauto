// Kept from the original inline script: price cards scroll to the reservation
// section, and "text us" links get a prefilled SMS body. UTM capture and
// Facebook/Google lead tracking were removed for the static copy.
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".rentalpricecontainer, .pricingcontainer").forEach(function (el) {
    el.addEventListener("click", function () {
      var target = document.querySelector("#reservationRequestSection");
      var navbar = document.querySelector(".w-nav");
      if (target) {
        var offset = navbar ? navbar.offsetHeight : 0;
        window.scrollTo({ top: target.offsetTop - offset, behavior: "smooth" });
      }
    });
  });

  var carName = document.title.replace(/^Rent\s*/i, "").split("|")[0].trim();
  var body = encodeURIComponent("Hi I'm interested in renting the " + carName);
  document.querySelectorAll(".textuslink").forEach(function (el) {
    var match = (el.getAttribute("href") || "").match(/^tel:([^?]+)/);
    if (match) el.setAttribute("href", "sms:" + match[1] + "?body=" + body);
  });

  // Forms posted to Webflow's form backend; in the static copy they show a notice instead.
  window.addEventListener("submit", function (e) {
    var form = e.target;
    if (!form.closest || !form.closest(".w-form")) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    var wrap = form.closest(".w-form");
    var fail = wrap.querySelector(".w-form-fail");
    if (fail) {
      fail.textContent = "This is a static copy of the site. Please call, text or email us to book.";
      fail.style.display = "block";
    }
  }, true);
});
