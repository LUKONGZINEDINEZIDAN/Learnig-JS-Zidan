// Array to store contact objects
let contacts = [];

// Function to add a contact
function addContact() {
  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const email = document.getElementById('email').value.trim();

  if (!name || !phone || !email) {
    alert('Please fill all fields.');
    return;
  }

  // Contact object
  const contact = {
    name: name,
    phone: phone,
    email: email
  };

  contacts.push(contact);
  displayContacts();

  // Clear form
  document.getElementById('name').value = '';
  document.getElementById('phone').value = '';
  document.getElementById('email').value = '';
}

// Function to display contacts
function displayContacts() {
  const list = document.getElementById('contact-list');
  list.innerHTML = '';

  contacts.forEach((contact, index) => {
    list.innerHTML += `
      <li>
        <strong>${contact.name}</strong><br>
        📞 ${contact.phone}<br>
        ✉️ ${contact.email}
        <button class="delete-btn" onclick="deleteContact(${index})">Delete</button>
      </li>
    `;
  });
}

// Function to delete a contact
function deleteContact(index) {
  contacts.splice(index, 1);
  displayContacts();
}
