// busca elementos del html por su id, para luego si queremos podemos agregarle cosas
let $caja = document.getElementById('caja')
let $todos = document.getElementById('todos')
let $mujer = document.getElementById('mujer')
let $hombre = document.getElementById('hombre')
let $singenero = document.getElementById('singenero')
let $desconocido = document.getElementById('desconocido')
let $anterior = document.getElementById('anterior')
let $siguiente = document.getElementById('siguiente')
let $primera = document.getElementById('primera')
let $ultima = document.getElementById('ultima')
let $paginaactual = document.getElementById('paginaactual')


// variables
let todosPersonajes = [];
let pagina =1;

//asi estamos esperando la promesa, eso nos aparece en la consola de la pag / se puede hacer sin el let
let respuesta = fetch ('https://rickandmortyapi.com/api/character');

//cuando tengamos esa respuesta, entonces hace lo siguiente
respuesta
.then((data) => {
    return data.json() //a lo que recibimos lo transformamos en json para poder usarlo
})
.then((data) => {
    todosPersonajes = data.results;
    mostrar(todosPersonajes)
    console.log(data)
}
)



// mostrar personajes en el HTML
function mostrar (array) {
    $caja.innerHTML = '';

    for( let i=0; i<array.length; i++) {
        $caja.innerHTML += `
        <div class="caja">
            <img src=${array[i].image}>
            <h2>Nombre: ${array[i].name}</h2>
            <p>Genero: ${array[i].gender}</p>
            <p>Especie: ${array[i].species}</p>
            <p>Estado: ${array[i].status}</p>
            <p>Origen: ${array[i].origin.name}</p>
            <p>Locacion: ${array[i].location.name}</p> 
    </div>`;
    }

}

// filtro (botones)
function mostrarMujeres () {
    let resultado = todosPersonajes.filter((personaje)=>{
        return personaje.gender == 'Female'
    })
    mostrar(resultado);
};

function mostrarHombres () {
    let resultado1 = todosPersonajes.filter((personaje)=> {
        return personaje.gender == 'Male'
    })
    mostrar(resultado1);
};

function mostrarGenderless () {
    let resultado2 = todosPersonajes.filter((personaje)=> {
        return personaje.gender == 'Genderless'
    })
    mostrar(resultado2);
};

function mostrarUnknown () {
    let resultado3 = todosPersonajes.filter((personaje)=>{
        return personaje.gender == 'unknown'
    })
    mostrar(resultado3);
};

function todos () {
    mostrar(todosPersonajes)
}

$mujer.addEventListener('click',mostrarMujeres);
$hombre.addEventListener('click',mostrarHombres);
$singenero.addEventListener('click',mostrarGenderless);
$desconocido.addEventListener('click',mostrarUnknown);
$todos.addEventListener('click',todos)

function usarFetch (numeroPagina) {
    fetch(`https://rickandmortyapi.com/api/character/?page=${numeroPagina}`)
    .then((data) => {
        return data.json();
    }) 
    .then((data)=>{
        todosPersonajes = data.results;
        mostrar(todosPersonajes);
    });
}; 

usarFetch(pagina);

// paginado
function actualizarPaginaActual() {
    $paginaactual.innerHTML = `Página Actual: ${pagina}`;
}

function siguientePagina () {
    pagina++;
    if (pagina === 42) {
        $siguiente.disabled = true;
        $ultima.disabled = true;
    }
    if (pagina > 1) {
        $anterior.disabled = false;
        $primera.disabled = false;
    }
    actualizarPaginaActual();
    usarFetch(pagina);
}

function anteriorPagina () {
    pagina--;
    if (pagina === 1) {
        $anterior.disabled = true;
        $primera.disabled = true;
    }
    
    if (pagina < 42) {
        $siguiente.disabled = false;
        $ultima.disabled = false;
    }
    actualizarPaginaActual();
    usarFetch(pagina);
}

    
    function ultimaPagina () {
        pagina = 42;
        actualizarPaginaActual();
        usarFetch(pagina);
            $ultima.disabled = true;
            $siguiente.disabled = true;
            $anterior.disabled = false;
            $primera.disabled = false;
        }

    function primerPagina() { 
        pagina = 1;
        actualizarPaginaActual();
        usarFetch(pagina);
        $primera.disabled = true;
        $anterior.disabled = true;
        $siguiente.disabled = false;
        $ultima.disabled = false;
    }

    
        // eventos
    $siguiente.addEventListener('click',siguientePagina);
    $anterior.addEventListener('click',anteriorPagina);
    $ultima.addEventListener('click',ultimaPagina)
    $primera.addEventListener('click',primerPagina)