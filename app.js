import { createInterface } from "readline";
import chalk from "chalk";

const tasks = [];
const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

// ======================================================= Logica de menu ==================================================================
function displayMenu() {
  console.log("\n======================================================\n");
  console.log(
    chalk.yellow.bold("        Hola, bienvenido a mi aplicacion To DO\n")
  );
  console.log(chalk.blue.bold("Seleciona una opción"));
  console.log("1. Crear tarea");
  console.log("2. Lista de tarea");
  console.log("3. Completar tarea");
  console.log("4. Eliminar tarea");
  console.log("5. salir");
  console.log("\n");
}
function chooseOption() {
  rl.question(
    "Elige una opcion, debes digital el numero de la opcion: ",
    (option) => {
      switch (option) {
        case "1":
          addTask();
          break;
        case "2":
          listTasks();
          break;
        case "2.1":
          listTasks(true);
          break;
        case "2.2":
          listTasks(false);
          break;

        case "3":
          completedTaks();
          break;
        case "4":
          delateTask();
          break;
          case "5":
            console.log("Hasta luego");
            rl.close();
          break;         

        default:
          console.log(chalk.red("No introdusiste una opcion valida \n"));
          displayMenu();
          chooseOption();
          break;
      }
    }
  );
}

// =========================================== Funciones principales =======================================================================

function loadTaskss(){

}
function saveTasks(){
  
}



/*Funcion para añadir una tarea:*/
function addTask() {
  rl.question(chalk.bgMagentaBright("Escribe tú tarea: \n"), (task) => {
    tasks.push({ task, completed: false, id: createID() });
    console.log(
      chalk.green(`La tarea con el ID ${tasks.length} se agrego correctamente`)
    );
    otheraction();
  });
}
/*Funcion para en listar las tareas:*/
function listTasks(completed = null) {
  if (tasks.length === 0) {
    console.log(
      chalk.bgGreen.bold(
        "Aun no tienes tareas registradas. Agrega nuevas tareas en el menu con la opcion 1 "
      )
    );
  } else {
    console.log(chalk.yellow.bold("Lista de tarea"));
    tasks.forEach((task, index) => {
      let status = task.completed ? "✅" : "❌";
      console.log(
        chalk.bgMagentaBright(`${task.id}:`) + ` ${status} ${task.task} `
      );
    });
  }
  otheraction();
}

/*Funcion para en completar las tareas:*/
function completedTaks() {
  rl.question(chalk.bgMagentaBright("Introduce el ID de la tarea: "),(idTask) => {
    // let id = parseInt(idTask)-1; // permite marcar taras por la posicion de la tarea
    let id = parseInt(idTask);
      if (id <= tasks.length && id >= 0) {
        //marcar tarear por el id de la tarea
        /* tasks.forEach((task) => {
          let index = task.id;

          if (id === index) {
            task.completed = true;
          }
        }); */ 
        
        // tasks[id].completed=true; // permite marcar taras por la posicion de la tarea
        const tarea = tasks.find(t=>t.id === id); //se busca dentro del arreglo un elemento t que tenga una propiedad id igual a la que se esta buscando
        tarea.completed = true; // una vez encontrada la propiedad se cambiel el valor de esta para marcarla como realizada
      } else {
        console.log(chalk.bgRed("El ID de la tarea no existe"));
      }

      otheraction();
    }
  );
}

function delateTask(){
  rl.question(chalk.redBright("Introduce el ID de la tarea a eliminar: "),(idTask)=>{
    let id = parseInt(idTask); //se convierte el idTask que introdujo el usuario en numero

    const taskId = tasks.findIndex(t => t.id === id); // se busca la tarea con el ID para luego encontrar el index que luego se utilizara para eliminar la propiedad

    tasks.splice(taskId,1);
    otheraction();

  })
}

// ====================================== Funcionalidades extras ===============================================================
function createID() {
  const id = tasks.length + 1;
  return id;
}
function otheraction() {
  rl.question("\n\nMostrar menu de nuevo (y/n):", (action) => {
    action.toLowerCase();
    if ("y" === action || "yes" === action || action === "") {
      displayMenu();
      chooseOption();
    } else {
      console.log("Hasta luego");
      rl.close();
    }
  });
}


displayMenu();
chooseOption();