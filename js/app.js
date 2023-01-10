// GLOBALES

const formularioCreacionJuego = document.getElementById('formularioCreacionJuego');
const tablaDeJuegos = document.getElementById('tablaDeJuegos')
const formularioEdicionJuego = document.getElementById('formularioEdicionJuego')

const editarTitulo = document.getElementById('editarTitulo');
const editarCategoria = document.getElementById('editarCategoria')
const editarDescripcionCorta = document.getElementById('editarDescripcionCorta');
const editarUrlTrailer = document.getElementById('editarUrlTrailer');
const editarUrlImagen = document.getElementById('editarUrlImagen');
const editarUrlImagenDestacada = document.getElementById('editarUrlImagenDestacada');
const editarDescripcionLarga = document.getElementById('editarDescripcionLarga');
// const id = document.getElementById('id');
// const publicar = document.getElementById('publicar');
// const destacar = document.getElementById('destacar');

let idDelJuegoAEditar = ""
let juegoPublicado = ""
let juegoDestacado = ""


// FUNCIONES

const generadorDeID = function () {
    return '_' + Math.random().toString(36).substr(2, 9);
};


const mostrarJuegos = (juegos) => {

    let acumulador = '';
    for (const juego of juegos) {
        acumulador += `
            <tr class="${juego.destacar === "solid" ? "bg-warning" : ""}">
                <td>${juego.id}</td>
                <td>${juego.titulo}</td>
                <td>${juego.categoria}</td>
                <td>${juego.descripcionCorta}</td>

                <td>
                    <button
                        class="btn"
                        onclick="publicarJuego('${juego.id}')"
                    >
                        <i class="fa-regular fa-circle${juego.publicar} fa-xl"></i>
                    </button> 
                </td>

                <td>
                    <button
                        class="btn"
                        onclick="destacarJuego('${juego.id}')"
                    >
                        <i class="fa-${juego.destacar} fa-star fa-xl"></i>
                    </button>                 
                </td>
                <td>
                    <button
                        class="btn"
                        onclick="borrarJuego('${juego.id}')"
                    >
                        <i class="fa-solid fa-trash fa-xl"></i>
                    </button>

                    <button
                        class="btn"
                        onclick="editarJuego('${juego.id}','${juego.publicar}','${juego.destacar}')"
                    >
                        <i class="fa-solid fa-pen-to-square fa-xl"></i>
                    </button>

                    
                </td>
            </tr>
        `;
    }
    tablaDeJuegos.innerHTML = acumulador;

    

}
const juegos = JSON.parse(localStorage.getItem('juegos')) || [];
mostrarJuegos(juegos)


const borrarJuego = (id) => {

    const juegos = JSON.parse(localStorage.getItem('juegos'));
    const nuevosJuegos = juegos.filter((juego) => juego.id !== id);
    localStorage.setItem('juegos', JSON.stringify(nuevosJuegos));
    mostrarJuegos(nuevosJuegos);

}

const publicarJuego = (id) => {
    const juegos = JSON.parse(localStorage.getItem('juegos'));
    const juego = juegos.find((juego) => juego.id === id);
    if (juego.publicar === "-check"){
        juego.publicar = ""
    } else juego.publicar ="-check"

    localStorage.setItem('juegos', JSON.stringify(juegos));
    mostrarJuegos(juegos)

}

const destacarJuego = (id) => {
    const juegos = JSON.parse(localStorage.getItem('juegos'));
    juegos.forEach(element => {
        element.destacar = "regular"
    });
    const juego = juegos.find((juego) => juego.id === id);
    juego.destacar ="solid"
    localStorage.setItem('juegos', JSON.stringify(juegos));

    // let filaResaltada = document.getElementById(`fila-${juego.id}`)
    // // console.log(filaResaltada)
    // filaResaltada.className = "bg-success"
    // filaResaltada.setAttribute()
    mostrarJuegos(juegos)

}


const editarJuego = (id,publicado,destacado) => {
    idDelJuegoAEditar = id
    juegoPublicado = publicado
    juegoDestacado = destacado 
    $('#editarJuegoModal').modal('show');
    const juegos = JSON.parse(localStorage.getItem('juegos'));
    const juegoAEditar = juegos.find((juego) => juego.id === id);

    editarTitulo.value = juegoAEditar.titulo;
    editarCategoria.value = juegoAEditar.categoria;
    editarDescripcionCorta.value = juegoAEditar.descripcionCorta;
    editarUrlTrailer.value = juegoAEditar.urlTrailer;
    editarUrlImagen.value = juegoAEditar.urlImagen;
    editarUrlImagenDestacada.value = juegoAEditar.urlImagenDestacada;
    editarDescripcionLarga.value = juegoAEditar.descripcionLarga;
    
}

// EVENTOS

formularioCreacionJuego.addEventListener("submit", (dato) => {
    // el prevent Default evita recargar la pagina una vez hecho el submit.
    dato.preventDefault()
    const juego = {
        titulo: dato.target[0].value,
        categoria: dato.target[1].value,
        descripcionCorta: dato.target[2].value,
        urlTrailer: dato.target[3].value,
        urlImagen: dato.target[4].value,
        urlImagenDestacada: dato.target[5].value,
        descripcionLarga: dato.target[6].value,
        id: generadorDeID(),
        publicar: "",
        destacar: "regular"

    }
    //console.log(juego)

    //Obtención de la información de la KEY "Juegos" y almacenandola en la variable juegosEnLocalStorage
    // || [] se usa por si no hay ninguna información en el localstorege que tome un arrayvacío
    // En el localstorage se almacenan arrays de lo que sea
    // proceso completo: Tomo dato del LS - pusheo el dato ingresado desde el formulario y lo vuelvo a almacenar en el localstorage con la misma KEY

    const juegosEnElLocalStorage = JSON.parse(localStorage.getItem('juegos')) || [];
    juegosEnElLocalStorage.push(juego)
    localStorage.setItem('juegos', JSON.stringify(juegosEnElLocalStorage))
    
    // Reseteo de formulario 
    formularioCreacionJuego.reset();
    // Cerrar el modal una vez realizado el submit. Caso contrario queda abierto
    $('#crearJuegoModal').modal('hide');

    // Actualizar visualización
    
    const juegos = JSON.parse(localStorage.getItem('juegos')) || [];
    //console.log (juegos)
    mostrarJuegos(juegos)

})


formularioEdicionJuego.addEventListener("submit", (dato) => {
    // el prevent Default evita recargar la pagina una vez hecho el submit.
    dato.preventDefault()
    const juego = {
        titulo: dato.target[0].value,
        categoria: dato.target[1].value,
        descripcionCorta: dato.target[2].value,
        urlTrailer: dato.target[3].value,
        urlImagen: dato.target[4].value,
        urlImagenDestacada: dato.target[5].value,
        descripcionLarga: dato.target[6].value,
        id: idDelJuegoAEditar,
        publicar: juegoPublicado,
        destacar: juegoDestacado

    }

    const juegos = JSON.parse(localStorage.getItem('juegos'));
    const listaJuegosModificada = juegos.map((juegosEnLocalStorage) => {
        if (juegosEnLocalStorage.id === juego.id) return juego;
        return juegosEnLocalStorage;
    });
    
    localStorage.setItem('juegos', JSON.stringify(listaJuegosModificada));
        
    $('#editarJuegoModal').modal('hide');
    mostrarJuegos(listaJuegosModificada)


}
)