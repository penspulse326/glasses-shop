document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".response-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const { username, phone, email, content, checkbox } = form.elements;

    if (
      username.value === "" ||
      phone.value === "" ||
      email.value === "" ||
      content.value === ""
    ) {
      alert("您有資料未填妥");
    } else if (!checkbox.checked) {
      alert("您尚未同意隱私權政策");
    } else {
      form.submit();
    }
  });
});
