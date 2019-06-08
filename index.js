const readlineSync = require('readline-sync');
const fs = require('fs');
const removeDiacriticMarks = require('./removeDiacriticMarks');

function showMenu(contacts) {
  console.log('-------------------------------');
  console.log('1. Show contacts');
  console.log('2. Add contact');
  console.log('3. Edit contact');
  console.log('4. Delete contact');
  console.log('5. Find contact');
  console.log('6. Save and exit');

  const answer = readlineSync.question('> ');
  switch (answer) {
    case '1':
      showContacts(contacts);
      showMenu(contacts);
      break;
    case '2':
      showAddContact(contacts);
      showMenu(contacts);
      break;
    case '3':
      showEditContact(contacts);
      showMenu(contacts);
      break;
    case '4':
      showDeleteContact(contacts);
      showMenu(contacts);
      break;
    case '5':
      console.log(showFindContact(contacts));
      showMenu(contacts);
      break;
    case '6':
      break;
    default:
      console.log('Invalid option');
      break;
  }
}

function loadData() {
  const data = fs.readFileSync('./contacts.json');
  return JSON.parse(data);
}

function showContacts(contacts) {
  let id = 0;
  for (let contact of contacts) {
    console.log(`${id}. ${contact.name}: ${contact.phoneNumber}`);
    id++;
  }
}

function showAddContact(contacts) {
  const name = readlineSync.question('Name: ');
  const phoneNumber = readlineSync.question('Phone Number: ');
  const newContact = {
    name: name,
    phoneNumber: phoneNumber,
  };
  contacts.push(newContact);
  content = JSON.stringify(contacts);
  fs.writeFileSync('./contacts.json', content, { encoding: 'utf8' });
}

function showEditContact(contacts) {
  const id = readlineSync.question('Enter id: ');
  if (contacts[parseInt(id)]) {
    const name = readlineSync.question('Name: ');
    const phoneNumber = readlineSync.question('Phone Number: ');
    const newContact = {
      name: name,
      phoneNumber: phoneNumber,
    };
    contacts[parseInt(id)] = newContact;
  } else {
    console.log('Invalid id!');
    showEditContact(contacts);
  }
  const content = JSON.stringify(contacts);
  fs.writeFileSync('./contacts.json', content, { encoding: 'utf8' });
}

function showDeleteContact(contacts) {
  const id = readlineSync.question('Enter id: ');
  if (contacts[parseInt(id)]) {
    contacts.splice([parseInt(id)], 1);
  } else {
    console.log('Invalid id!');
    showDeleteContact(contacts);
  }
  const content = JSON.stringify(contacts);
  fs.writeFileSync('./contacts.json', content, { encoding: 'utf8' });
}

function showFindContact(contacts) {
  const query = readlineSync.question('Enter name or phone number: ');
  const formatedQuery = removeDiacriticMarks(query.toLowerCase());

  const response = contacts.filter(contact => {
    return (
      removeDiacriticMarks(contact.name.toLowerCase()).includes(
        formatedQuery,
      ) || contact.phoneNumber.includes(query)
    );
  });
  return response;
}

function main() {
  const contacts = loadData();
  showMenu(contacts);
}

main();
