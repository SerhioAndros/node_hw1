const contactsFunctions = require("./contacts");

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторить
function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contactsList = contactsFunctions.listContacts();
      contactsList
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
      break;

    case "get":
      const contactById = contactsFunctions.getContactById(id);
      contactById
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
      break;

    case "add":
      const contactNew = contactsFunctions.addContact(name, email, phone);
      contactNew
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
      break;

    case "remove":
      const contactDeleted = contactsFunctions.removeContact(id);
      contactDeleted
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
