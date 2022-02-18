// variable to hold db connection
let db;

// establish connected named budget tracker and set version to 1
const request = indexedDB.open("budget-tracker", 1);

// this event will take place if the database version changes
request.onupgradeneeded = function(event) {
    // save reference to the db
    const db = event.target.result;

    // create object store called transactions, set it to autoincrement primary key
    db.createObjectStore("tracker", { autoIncrement: true });
};

// upon success
request.onsuccess = function(event) {
    db = event.target.result;

    if (navigator.onLine) {
        // need to include variable of True or False into function
        sendTransaction(true);
    }
};

request.onerror = function(event) {
    console.log(event.target.errorCode);
};

function saveRecord(record) {
    const transaction = db.transaction(["tracker"], "readwrite");
    const trackerObjectStore = transaction.objectStore("tracker");
    trackerObjectStore.add(record);
};

