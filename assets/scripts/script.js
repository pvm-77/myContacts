
let contacts = [
    { id: "1", contactName: "sarfaraz", contactNumber: "6456-6456-56" },
    { id: "2", contactName: "mohib", contactNumber: "34535-4535-4544" },
    { id: "3", contactName: "asif", contactNumber: "765-56-756-6" },
    { id: "4", contactName: "shadan", contactNumber: "67547-7567-5675" },

];
const contactForm = document.getElementById('contact-form');

const contactNameInput = document.getElementById('contact-name');
const contactNumberInput = document.getElementById('contact-number');

const contactList = document.getElementById('contact-list');

function handleContactForm(e) {
    e.preventDefault();
    console.log('in submit form');
    const contactName = contactNameInput.value;
    const contactNumber = contactNumberInput.value;
    createContact({ id: generateId(), contactName, contactNumber });
    contactNameInput.value = "";
    contactNumberInput.value = "";
}
contactForm.addEventListener('submit', handleContactForm);


function handleUpdatedContactForm(e) {
    e.preventDefault();
    console.log('in updated contact form');


}
const updatedContactForm = document.getElementsByClassName('updateContact');
console.log('dynamic update form id', updatedContactForm);
// document.getElementById('updateContact').addEventListener('submit', handleUpdatedContactForm);










// let isEditing = false;

// function updateContact(id) {
//     // Find the contact with the specified ID
//     const contact = contacts.find(contact => contact.id === id);

//     // Get the contact name and number from the LI element
//     const [name, number] = document.getElementById(id).textContent.trim().split(" ");

//     // Generate the update contact form HTML
//     const updateContactForm = `
//     <form id="updateContactForm">
//       <input type="text" name="name" placeholder="Update name" value="${name}">
//       <input type="text" name="number" placeholder="Update number" value="${number}">
//       <button type="button" onClick="cancelUpdate()">Cancel</button>
//       <button type="submit">Save</button>
//     </form>
//   `;

//     // Replace the LI element with the update contact form
//     document.getElementById(id).innerHTML = updateContactForm;

//     // Add an event listener to the update contact form
//     document.getElementById('updateContactForm').addEventListener('submit', function (event) {
//         event.preventDefault();

//         // Get the updated contact name and number from the form
//         const updatedName = document.getElementById('updateContactForm').elements.name.value;
//         const updatedNumber = document.getElementById('updateContactForm').elements.number.value;

//         // Update the contact in the contacts array
//         const index = contacts.findIndex(contact => contact.id === id);
//         contacts[index].contactName = updatedName;
//         contacts[index].contactNumber = updatedNumber;

//         // Update the LI element with the updated contact name and number
//         document.getElementById(id).innerHTML = `${updatedName} ${updatedNumber}
//       <button onClick="updateContact('${id}')">Update</button>
//       <button onClick="deleteContact('${id}')">Delete</button>
//     `;
//     });

//     isEditing = true;
// }

// function cancelUpdate() {
//     isEditing = false;
//     // Find the contact with the specified ID
//     const id = document.getElementById('updateContactForm').parentNode.id;
//     const contact = contacts.find(contact => contact.id === id);

//     // Update the LI element with the original contact name and number
//     document.getElementById(id).innerHTML = `${contact.contactName} ${contact.contactNumber}
//     <button onClick="updateContact('${id}')">Update</button>
//     <button onClick="deleteContact('${id}')">Delete</button>
//   `;
// }






// create contact
function createContact(newContactObject) {
    contacts.push(newContactObject);
    
    readContacts();
}


function deleteContact(id) {

    const contactToDelete = contacts.find(contact => contact.id === id)
    window.confirm(`do you want to delete ${contactToDelete.contactName}`)
    contacts = contacts.filter(contact => contact.id !== id)
    readContacts();

}


// generate unique id (uid )
function generateId() {
    let d = new Date().getTime();


    if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
        d += performance.now(); // use high-precision timer if available
    }

    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}




function readContacts() {
    let currentContactList = '';
    currentContactList = `<ul>
    ${contacts.map(contact => `
        <li id="${contact.id}">
        ${contact.contactName} ${contact.contactNumber}
         <button onClick="updateContact('${contact.id}')">update</button>
         <button onClick="deleteContact('${contact.id}')">delete</button>
        </li>
    `).join('')}
    </ul>`
    contactList.innerHTML = currentContactList;

}




document.addEventListener('DOMContentLoaded', () => {

    readContacts();

})




// update operation in detail

function updateContact(id) {
    const contact = findContactById(id);
    const [name, number] = getContactNameAndNumber(id);
    const updateContactForm = generateUpdateContactForm(name, number);
    replaceContactWithForm(id, updateContactForm);
    addUpdateContactEventListener(id);
    isEditing = true;
}

function findContactById(id) {
    return contacts.find(contact => contact.id === id);
}

function getContactNameAndNumber(id) {
    const [name, number] = document.getElementById(id).textContent.trim().split(" ");
    return [name, number];
}

function generateUpdateContactForm(name, number) {
    return `
      <form id="updateContactForm">
        <input type="text" name="name" placeholder="Update name" value="${name}">
        <input type="text" name="number" placeholder="Update number" value="${number}">
        <button type="button" onClick="cancelUpdate()">Cancel</button>
        <button type="submit">Save</button>
      </form>
    `;
}

function replaceContactWithForm(id, form) {
    document.getElementById(id).innerHTML = form;
}

function addUpdateContactEventListener(id) {
    document.getElementById('updateContactForm').addEventListener('submit', function (event) {
        event.preventDefault();
        const updatedName = document.getElementById('updateContactForm').elements.name.value;
        const updatedNumber = document.getElementById('updateContactForm').elements.number.value;
        updateContactInArray(id, updatedName, updatedNumber);
        updateContactUI(id, updatedName, updatedNumber);
    });
}

function updateContactInArray(id, updatedName, updatedNumber) {
    const index = contacts.findIndex(contact => contact.id === id);
    contacts[index].contactName = updatedName;
    contacts[index].contactNumber = updatedNumber;
}

function updateContactUI(id, updatedName, updatedNumber) {
    document.getElementById(id).innerHTML = `${updatedName} ${updatedNumber}
        <button onClick="updateContact('${id}')">Update</button>
        <button onClick="deleteContact('${id}')">Delete</button>
      `;
}

