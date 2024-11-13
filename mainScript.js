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

    let coordsXeye=0;
    let coordsYeye=0;
    const doomEye = document.getElementById("eye");

function trackingEyePosition(){
    
    const coordsEye= doomEye.getBoundingClientRect();

    coordsXeye=coordsEye.left; //creo que esto te coge la esquina superior izquierda pero se arregla
    coordsYeye=coordsEye.top;

    //console.log(`Posición X: ${coordsX}, Posición Y: ${coordsY}`);
    
    requestAnimationFrame(trackingEyePosition);
}
trackingEyePosition();

//fpuncion para que el ojo siga al raton 
let mouseX=0;
let mouseY=0;
function eyeFollowMouse(event){
    mouseX=event.clientX;
    mouseY=event.clientY;
    doomEye.style.transform = `translate(${mouseX - 50}px, ${mouseY - 80}px)`;
}

document.addEventListener("mousemove", eyeFollowMouse);

//funcion para ejecutar a los 5 humanos VIVOS randoms que van a morir y ademas generamos un array con ellos para el futuro

function killAliveHumans(aliveHumansArray){
    
        let randomHuman=Math.floor(Math.random() * aliveHumansArray.length);
        
        while(aliveHumansArray[randomHuman].alive == false){ //se hace un while por si el numero aleatorio coincide con un muerto y hasta que no de un numero de un vivo no para
            randomHuman=Math.floor(Math.random() * aliveHumansArray.length);
        }

        aliveHumansArray[randomHuman].alive = false;
        
    return (aliveHumansArray[randomHuman]);
}//funciona, esta testeado


//funcion que se activa cuando se aprieta el boton
//cosas que debe hacer --> crear array vivos, elegir 5 humanos a morir, ejecutar animacion de matar


function executerCasual(){
//TO-DO
//cuando se presiona el click se consigue el array de los vivos
    const executedHuman = killAliveHumans(alivehumansCasual); //esto es un objeto human
    //informacion del humano muerto
    let human=document.getElementById(executedHuman.id);
    let humanCoordsX=executedHuman.coordsX;
    let humanCoordsY=executedHuman.coordsY;

    //una vez tenemos toda la info del primer humano tenemos que lanzar el cohete a su ubi desde el ojo

    const laser=document.getElementById("laser"); //quiero obtener el laser, y hacer animacion desde la ubi del ojo al tio
    laser.style.display = "block"; //ocultar el rayo una vez se lance
    //aqui creamos la animacion

    const shootAnimation = `
        @keyframes shootAnimation{
            0%{
                transform: translate(${coordsXeye+30}px, ${coordsYeye-470}px);
            }
            100%{
                transform: translate(${humanCoordsX+30}px, ${humanCoordsY-470}px);
            }
        }
        
    `
    // Insertar la animación en el documento
    const style = document.createElement("style");
    style.textContent = shootAnimation;
    document.head.appendChild(style);
    //ejecutamos la animacion
    laser.style.animation = "shootAnimation 1s forwards"


    setTimeout(() => {
        laser.style.display = "none"; //ocultar el rayo una vez se lance
        human.style.display="none";
    }, 1000);
}

document.addEventListener("click", executerCasual);
