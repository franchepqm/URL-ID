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

Explicacion 

URLSearchParams(window.location.search): Obtiene los parámetros de la URL actual, lo que permite obtener el itemId y coleccion de la query string. Estos parámetros se utilizan para identificar el documento específico que se desea cargar desde Firestore.
doc(firestore, coleccion, itemId): Crea una referencia al documento específico en Firestore usando el ID del documento (itemId) y el nombre de la colección (coleccion).
getDoc(docRef): Obtiene una instantánea del documento referenciado por docRef en Firestore.
Manejo de resultados:
Si el documento existe (docSnap.exists() es true), se extraen los datos del documento (data) y se actualiza el contenido HTML dentro del elemento con ID detalle-item para mostrar el título, descripción y una imagen.
Si el documento no existe, se muestra un mensaje indicando que el documento no existe.
Cualquier error durante la carga o consulta del documento se maneja en el bloque catch, mostrando un mensaje de error en lugar de los detalles del documento.
