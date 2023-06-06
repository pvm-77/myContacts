// initial records
let contacts = [
    { id: "1", contactName: "john", contactNumber: "6456-6456-56" },
    { id: "2", contactName: "mike", contactNumber: "34535-4535-4544" },
    { id: "3", contactName: "jeff", contactNumber: "765-56-756-6" },
    { id: "4", contactName: "sheldon", contactNumber: "67547-7567-5675" },

];


document.addEventListener('DOMContentLoaded', () => {

    readContacts();

})


// crud 

// *******************1. create operation******************
function createContact(newContactObject) {
    contacts.push(newContactObject);
    readContacts();
}

// ************************************************************

// ********************2. read operation**********************
function readContacts() {
    let currentContactList = '';
    currentContactList = `<ul>
    ${contacts.map(contact => `
         <li id="${contact.id}">
      <div class="contact-info">
        <span class="contact-name"  title="${contact.contactName}">${truncateText(contact.contactName)}</span>
        <span class="contact-number" title="${contact.contactNumber}">${truncateText(contact.contactNumber)}</span>
      </div>
      <div class="contact-actions">
        <button onClick="updateContact('${contact.id}')">update</button>
        <button onClick="deleteContact('${contact.id}')">delete</button>
      </div>
    </li>
    `).join('')}
    </ul>`
    contactList.innerHTML = currentContactList;

}

// ************************************************************

// ********************** 3. update operation*******************
function updateContact(id) {
    const contact = findContactById(id);

    const updateContactForm = generateUpdateContactForm(contact.contactName, contact.contactNumber);
    replaceContactWithForm(id, updateContactForm);
    addUpdateContactEventListener(id);
    isEditing = true;
}
// ************************************************************

// ****************** 4. delete operation*************************
function deleteContact(id) {
    const contactToDelete = contacts.find(contact => contact.id === id)
    window.confirm(`do you want to delete ${contactToDelete.contactName}`)
    contacts = contacts.filter(contact => contact.id !== id)
    readContacts();

}
// ******************************************************************


const contactForm = getHtmlElement('contact-form');
const contactList = getHtmlElement('contact-list');


function handleContactForm(e) {
    e.preventDefault();

    const contactName = getHtmlElement('contact-name').value;
    const contactNumber = getHtmlElement('contact-number').value;

    createContact({ id: generateId(), contactName, contactNumber });

    resetInputValue('contact-name');
    resetInputValue('contact-number');

}



// event listeners
contactForm.addEventListener('submit', handleContactForm);





// utility functions

function getInputValue(inputFieldId) {
    return document.getElementById(inputFieldId);

}

function getHtmlElement(inputFieldId) {
    return document.getElementById(inputFieldId);
}

function resetInputValue(inputFieldId) {
    document.getElementById(inputFieldId).value = '';

}

function findContactById(id) {
    return contacts.find(contact => contact.id === id);
}

// generate unique id (uid )
function generateId() {
    let d = new Date().getTime();


    if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
        d += performance.now();
    }

    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
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

function truncateText(text, maxLength) {
    if (text.length <= maxLength) {
        return text;
    }

    return text.substr(0, maxLength) + '...';
}
