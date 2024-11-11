const humansCasual = {
    human1: {
        id: 1,
        name: "Jesús Manuel",
        alive: true,
    },
    human2: {
        id: 2,
        name: "Israel",
        alive: true,
    },
    human3: {
        id: 3,
        name: "Javier",
        alive: true,
    },
    human4: {
        id: 4,
        name: "Nicolás",
        alive: true,
    },
    human5: {
        id: 5,
        name: "Felipe",
        alive: true,
    },
    human6: {
        id: 6,
        name: "Fernando",
        alive: true,
    },
    human7: {
        id: 7,
        name: "Alejandro",
        alive: true,
    },
    human8: {
        id: 8,
        name: "Pablo",
        alive: true,
    },
    human9: {
        id: 9,
        name: "Mario",
        alive: true,
    },
    human10: {
        id: 10,
        name: "Rubén",
        alive: true,
    },
    human11: {
        id: 11,
        name: "Pablo N",
        alive: true,
    },
    human12: {
        id: 12,
        name: "Mauricio",
        alive: true,
    },
    human13: {
        id: 13,
        name: "Adrián",
        alive: true,
    },
    human14: {
        id: 14,
        name: "Jairo",
        alive: true,
    },
    human15: {
        id: 15,
        name: "Judith",
        alive: true,
    },
    human16: {
        id: 16,
        name: "Samuel",
        alive: true,
    }
};

//funciones para hallar las coordenadas x e y de los humanos
    function humanUbicationX(human){
        const humanElement=document.getElementById(human.id);
        const coords=humanElement.getBoundingClientRect();
        const coordsX=(coords.left / window.innerWidth) * window.innerWidth; //con esta formula hayamos la posicion X adaptada a cualquier resolucion
        return coordsX;
    }
    function humanUbicationY(human){
        const humanElement=document.getElementById(human.id);
        const coords=humanElement.getBoundingClientRect();
        const coordsY=(coords.top / window.innerWidth) * window.innerWidth; //con esta formula hayamos la posicion Y adaptada a cualquier resolucion
        return coordsY;
    }

// Inicializamos las coordenadas después de la creación de los humanos
//con este foreach nos ahorramos codigo y asignamos coordenadas a todos los objetos
Object.values(humansCasual).forEach(human => {
    human.coordsX = humanUbicationX(human);
    human.coordsY = humanUbicationY(human);
    console.log(human)
})

//siguiente paso: ejecutar una animacion (splittear mi animacion en 4 partes)
//cada vez que se pulse el boton se mate a 4 humanos
//disparar a 4 humanos randoms cada vez que se pulse haciendo un rand basado en el id de cada uno, se puede hacer con un for
//necesitamos una funcion que trackee en tiempo real la posicion del ojo
//es un for que cada vez que se ejecute, se mueva posi random, dispare al objetivo previamente seleccionado, que el objetivo desaparezca y cambie el estado de alive a false.

//funcion para trackear en tiempo real la posicion del ojo en todo momento

function trackingEyePosition(){
    const doomEye = document.getElementById("eye");
    const coords= doomEye.getBoundingClientRect();

    let coordsX=coords.left;
    let coordsY=coords.top;

    console.log(`Posición X: ${coordsX}, Posición Y: ${coordsY}`);

    requestAnimationFrame(trackingEyePosition);
}//funciona, está testeado

//funcion para elegir los 4 humanos VIVOS randoms que van a morir

function chosenAliveHumans(humans){
    //primero que cree un array con los humanos vivos
    //luego que se haga un random 4 veces para los 4 ejecutados
    //TO-DO
}


//funcion que se activa cuando se aprieta el boton

function executer(){
//TO-DO
}

