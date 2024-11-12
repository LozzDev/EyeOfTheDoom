const alivehumansCasual = [
    {
        id: 1,
        name: "Jesús Manuel",
        alive: true,
        //hay que ponerle un color
    },
    {
        id: 2,
        name: "Israel",
        alive: true,
    },
    {
        id: 3,
        name: "Javier",
        alive: true,
    },
    {
        id: 4,
        name: "Nicolás",
        alive: true,
    },
    {
        id: 5,
        name: "Felipe",
        alive: true,
    },
    {
        id: 6,
        name: "Nando",
        alive: true,
    },
    {
        id: 7,
        name: "Alejandro",
        alive: true,
    },
    {
        id: 8,
        name: "Pablo",
        alive: true,
    },
    {
        id: 9,
        name: "Mario",
        alive: true,
    },
    {
        id: 10,
        name: "Rubén",
        alive: true,
    },
    {
        id: 11,
        name: "Pablo N",
        alive: true,
    },
    {
        id: 12,
        name: "Mauricio",
        alive: true,
    },
    {
        id: 13,
        name: "Adrián",
        alive: true,
    },
    {
        id: 14,
        name: "Jairo",
        alive: true,
    },
    {
        id: 15,
        name: "Judith",
        alive: true,
    },
    {
        id: 16,
        name: "Samuel",
        alive: true,
    }
];

console.log(alivehumansCasual)

//funciones para hallar las coordenadas x e y de los humanos
    function humanUbicationX(human){
        const humanElement=document.getElementById(human.id);
        const coords=humanElement.getBoundingClientRect();
        const coordsX=((coords.left+35) / window.innerWidth) * window.innerWidth; //con esta formula hayamos la posicion X adaptada a cualquier resolucion
        return coordsX; //cuando se cambien a astronautas se debe modificar ese 35
    }
    function humanUbicationY(human){
        const humanElement=document.getElementById(human.id);
        const coords=humanElement.getBoundingClientRect();
        const coordsY=((coords.top+35) / window.innerWidth) * window.innerWidth; //con esta formula hayamos la posicion Y adaptada a cualquier resolucion
        return coordsY; //cuando se cambien a astronautas se debe modificar ese 35
    }

// Inicializamos las coordenadas después de la creación de los humanos
//con este foreach nos ahorramos codigo y asignamos coordenadas a todos los objetos
alivehumansCasual.forEach(human => {
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

    //console.log(`Posición X: ${coordsX}, Posición Y: ${coordsY}`);
    //TO-DO --> necesitamos una funcion que returne el eje x y otra el eje y, para realizar el disparo porque esta no returna nada.
    requestAnimationFrame(trackingEyePosition);
}

//funcion para ejecutar a los 5 humanos VIVOS randoms que van a morir y ademas generamos un array con ellos para el futuro

function killAliveHumans(aliveHumansArray){
    
    const executedHumans=[]

    for(i=0;i<3;i++){ //se ejecuta 5 veces porque matamos a 3 humanos cada vez que presionamos el boton
        let randomHuman=Math.floor(Math.random() * aliveHumansArray.length);
        
        while(aliveHumansArray[randomHuman].alive == false){ //se hace un while por si el numero aleatorio coincide con un muerto y hasta que no de un numero de un vivo no para
            randomHuman=Math.floor(Math.random() * aliveHumansArray.length);
        }

        aliveHumansArray[randomHuman].alive = false;
        executedHumans.push(aliveHumansArray[randomHuman]) //ademas pusheamos a un array de muertos los 5 disparados para usar esa info para captar sus coordenadas y disparar
    }

    return executedHumans
}//funciona, esta testeado


//funcion que se activa cuando se aprieta el boton
//cosas que debe hacer --> crear array vivos, elegir 5 humanos a morir, ejecutar animacion de matar

function executerCasual(){
//TO-DO
//cuando se presiona el boton se consigue el array de los vivos


}

