// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCuWTdQuHs_l6rvfzaxvY4y-Uzn0EARRwM",
    authDomain: "athentication-3c73e.firebaseapp.com",
    databaseURL: "https://athentication-3c73e-default-rtdb.firebaseio.com",
    projectId: "athentication-3c73e",
    storageBucket: "athentication-3c73e.appspot.com",
    messagingSenderId: "218346867452",
    appId: "1:218346867452:web:58a57b37f6b6a42ec72579",
    measurementId: "G-3GBM5TSMLS"
  };

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Update parking slots in Firebase (Volunteer side)
function updateParking() {
    const parkingArea = document.getElementById('parking-area').value;
    const slotCount = document.getElementById('slot-count').value;

    if (slotCount !== '' && !isNaN(slotCount)) {
        firebase.database().ref(`parking/${parkingArea}`).set({
            availableSlots: parseInt(slotCount, 10)
        });
        alert('Parking slots updated successfully!');
    } else {
        alert('Please enter a valid number of slots.');
    }
}

// Fetch real-time parking updates (Checkpost side)
function fetchParkingUpdates() {
    const parkingAreas = ['parking-a', 'parking-b', 'parking-c', 'parking-d'];

    parkingAreas.forEach(area => {
        firebase.database().ref(`parking/${area}`).on('value', (snapshot) => {
            const data = snapshot.val();
            document.getElementById(`${area}-count`).textContent = data ? data.availableSlots : '0';
        });
    });
}

// Call fetchParkingUpdates if it's checkpost UI
if (document.title.includes('Checkpost')) {
    fetchParkingUpdates();
}
