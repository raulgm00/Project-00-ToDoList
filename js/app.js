// TO DO LIST

// Paso No.1 Obtener todos los elementos del DOM
const taskInput = document.querySelector("#inpuTextTask");
const priority = document.querySelector("#inpuNumberPriority");
const date = document.querySelector("#inputDate");
const buttom = document.querySelector("#buttomAdd");
const list = document.querySelector("#list");
const buttomDel = document.querySelector("#buttomDelete");
const arrayTask= [];
let posicion = -1;

let contador = 1;
// Paso No.2 Funcion para agrergar tareas al DOM
function addTaskDOM(ev){
    
    console.log('Entra a agregar tareas en el DOM');
    console.log(priority.value);
    console.log(date.value);

    //Asignamos el evento de evitar refreco de pantalla
    ev.preventDefault();
    
    //Nos aseguramos de quitar espacion al final de input
    const taskText = taskInput.value.trim();
    const pri = priority.value;
    const dat = date.value;

    //Hacemos uso del Trusthy
    if(taskText){
        //Creo la etiquetas necesarias para almacenarlo en el DOM dinamicamente
        const tag =`<li class='elementList'><span class="id">${contador} </span>${taskText} <span> Prioridad: ${pri}</span><span> Fecha: ${dat}</span><i class='bx bx-edit'></i><i class='bx bxs-trash'></i></li>`;
        //Usamos la funcion de agregar tags hijo dentro del DOM
            list.innerHTML+=tag;
            limpiarComponentes();
            saveTaskLocalStorage(contador,{id: contador, tarea: taskText, prioridad: pri, fecha: dat});
            contador++;
    }else{
        alert(`Debes agregar al menos una tarea`);
    }
}

// Paso No.2.1 Funcion para resetear los valores del formulario
function limpiarComponentes(){
    taskInput.value="";
    priority.value= "";
    date.value= "";
    
}

// Paso No.2.2 Almacenamiento Local Storage
// Funcion para guardar en el localstorage
function saveTaskLocalStorage(c,v){
    // Parsear el Objeto a JSON para que puede ser guardado en el storage
    localStorage.setItem(c,JSON.stringify(v));
}


// Paso No.3 Generar evento de agregacion por medio del boton  o enter
buttom.addEventListener("click", addTaskDOM);


// Paso No.3 Generar evento de agregacion por medio del evento enter
//taskInput.addEventListener("keyup",addTaskDOM);
document.addEventListener("keyup", function(event) {
    if (event.key === 'Enter') {
        addTaskDOM(event);
    }
});

// Paso Node.4 Agregar un evento de eliminacion de lista
list.addEventListener("click", (e)=>{
    if(e.target.classList.contains("bxs-trash")){
        //console.log("Se debe eliminar fila");
        console.log(e);
        const li = e.target.parentNode;
        console.log(li);
        //const liClase = li.classList.item(0);
        const firt = li.firstChild;
        const keyDelete = firt.textContent.trim();
        console.log(keyDelete);
        //localStorage.removeItem(keyDelete);
        e.target.parentElement.remove();

    }else if(e.target.classList.contains("bx-edit")){
            console.log(`Requieres editar ${e}`);
            //Obtener la fila que se desea editar desde el DOM
            // ¿Como identificar la fila que se quiere modificar ?
            
            //Sacar los valores en constantes
            // ¿Como sacarlas?

            //Enviar esas constantes a los inputs obtenidos con anterioridad
            document.querySelector("#inpuTextTask").value= 'Nueva tarea';
            document.querySelector("#inpuNumberPriority").value= 1;
            document.querySelector("#inputDate").value= '2023-10-01';
            //Asignar una bandera que signidique edicion para que cuando el evento Guardar se active vuela a agregar el valor no como nuevo si no al valo que ya existia en el DOM
            //Asignamos posicion editada
            posicion = 1;
    }
});

// Paso No. 5 Validar Storage
//funcion para recuperar datos de LS
function getDataLS(array){
    
    // verificamos que el LS tenga Datos
    if(localStorage.length != 0){

        //recorro el LS y guardo los valores como objetos en el array.
        const keys = Object.keys(localStorage);

        for(const key of keys){
            const v = localStorage.getItem(key);
                //Parse Objeto de Local Storage de string a objeto JSON
                //console.table(JSON.parse(v));
                let json = JSON.parse(v)
                let objTask = {id: `${key}`, tarea: `${json.tarea}`, prioridad: `${json.prioridad}`, fecha : `${json.fecha}`};
                //console.table(objTask);
                array.push(objTask);
        } 
        console.log("----");
        //console.table(array);
        ordenarLista(array); // ordeno el array por clave
        insertFila(array);// agrego los template

    }

    
}

//Paso No.6 Funcion de ordenamiento
function ordenarLista(array) {
    array.sort( (a,b) => a.id - b.id);
    console.table(array);
}

// Paso Node.7 crear estructuras de filas
function insertFila(array){

    for(const a of array){
        const tag =`<li class='elementList'><span class="id">${a.id} </span>${a.tarea} <span> Prioridad: ${a.prioridad}</span><span> Fecha: ${a.fecha}</span><i class='bx bx-edit'></i><i class='bx bxs-trash'></i></li>`;
        //Usamos la funcion de agregar tags hijo dentro del DOM
            list.innerHTML+=tag;
    }
}


//Paso No.8 Borrar todo el LocalStorage
// Paso Node.4 Agregar un evento de eliminacion de lista
buttomDel.addEventListener("click", (e)=>{
    console.log("remueve LocalStorage");
    localStorage.clear();
    //Borra todos los hijos del elemento padre
    while(list.firstChild){
        list.removeChild(list.firstChild);
    }
    
});


//Ejecucion No.2 Validar si en el storage hay filas pendientes por cargar
// al cargar la pagina leeo el LS para ver si tiene tareas
document.addEventListener("DOMContentLoaded", getDataLS(arrayTask));

// Ejecucion No. 1: Nos colocamos en el input para poder agregar las tareas:
taskInput.focus();


//Corroboramos que se haya linkeado bien el archivo java script
//alert('Se linkeo bien el archivo js');
