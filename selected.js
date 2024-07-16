import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
  };

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

async function cargarDetalleItem() {
    const urlParams = new URLSearchParams(window.location.search);
    const itemId = urlParams.get('itemId');
    const coleccion = urlParams.get('coleccion');
    const detalleItemContainer = document.getElementById('detalle-item');

    try {
        const docRef = doc(firestore, coleccion, itemId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            detalleItemContainer.innerHTML = `
                <h2>${data.titulo}</h2>
                <p><strong>Descripción:</strong> ${data.descripcion}</p>
                <img src="${data.url}" alt="${data.titulo}" />
            `;
        } else {
            detalleItemContainer.innerHTML = `<p>El documento no existe.</p>`;
        }
    } catch (error) {
        console.log("Error al cargar el detalle del item: ", error);
        detalleItemContainer.innerHTML = `<p>Error al cargar el detalle del item.</p>`;
    }
}

document.addEventListener('DOMContentLoaded', cargarDetalleItem);
