let workingHours;
let sikDays;
let saturdays;
let validacion = false;
let extraHours;
let presenteeism;
let category;
let salaryLevel;

const name = prompt("Ingrese el nombre del operario por favor");
console.log("Se ha ingresado " + name + " como nombre del operario");

const lastName = prompt("Ingrese el apellido del operario por favor");
console.log("Se ha ingresado " + lastName + " como apellido del operario");

const startDate = prompt("Ingrese la fecha de inicio de la quincena por favor, EJ 01/01/2024");
console.log("Se ha ingresado " + startDate + " como fecha de inicio de la quincena");

//funcion obtiene la fecha en la que finaliza la quincena
function obtainEndDate(startDate){
    let day = parseInt(startDate.substr(0,2));
    let month = parseInt(startDate.substr(3,6));
    let year = parseInt(startDate.substr(6,12));


    let days = 0;

    if(isNaN(month) || isNaN(day)){
        alert("Error. Lamentablemente ha ingresado una fecha no valida, reinicie el programa por favor")
    } else {
        switch(month){
            case 1:
                console.log("El mes ingresado es Enero");
                days = 31;
                break;

            case 2:
                console.log("El mes ingresado es Febrero");
                days = 28;
                break;
            case 3:
                console.log("El mes ingresado es Marzo");
                days = 31;
                break;
                
            case 4:
                console.log("El mes ingresado es Abril");
                days = 30;
                break;
            case 5:
                console.log("El mes ingresado es Mayo");
                days = 31;
                break;
                
            case 6:
                console.log("El mes ingresado es Junio");
                days = 30;
                break;

                case 7:
                    console.log("El mes ingresado es Julio");
                    days = 31;
                    break;
        
                case 8:
                    console.log("El mes ingresado es Agosto");
                    days = 31;
                    break;
                case 9:
                    console.log("El mes ingresado es Septiembre");
                    days = 30;
                    break;
                    
                case 10:
                    console.log("El mes ingresado es Octubre");
                    days = 31;
                    break;
                case 11:
                    console.log("El mes ingresado es Noviembre");
                    days = 30;
                    break;
                    
                case 12:
                    console.log("El mes ingresado es Diciembre");
                    days = 31;
                    break;
                
                default:
                    console.log("Lamentablemente ocurrio un error, reinicie el programa");
                    break;
        }

        if((days-day)>14){
            day=day+14;
            return (day + "/" + month + "/" + year);
        } else if(month==12){
            month=1;
            year=year+1;
            day=14-(days-day);
            return (day + "/" + month + "/" + year);

        } else {
            month=month+1
            day=14-(days-day);
            return (day + "/" + month + "/" + year);
        }
        
    }
}

endDate = obtainEndDate(startDate);
console.log("La quincena finaliza en " + endDate);

//validacion horas laborales de cada jornada
do {
 workingHours = parseInt(prompt("Ingrese las horas laborales por jonada, Ej 8"));
} while(isNaN(workingHours))

//Validacion dias no trabajados (faltas)
do {
    sikDays = parseInt(prompt("Indique cuantos dias falto el operario, por ejemplo 0 si trabajo todos los dias"));
} while(isNaN(sikDays))


//Validacion sabados laborales o no
do{
    saturdays = prompt("Por defecto los Sabados se consideran habiles hasta el medio dia Si para aceptar o No para denegar");

    if(saturdays=="SI"){
        validacion=true;
    } else if(saturdays=="NO"){
        validacion=true;
    } else if(saturdays=="si" || saturdays=="Si" || saturdays=="sI"){
        saturdays = saturdays.toUpperCase()
        validacion=true;
    } else if(saturdays=="no" || saturdays=="No" || saturdays=="nO"){
        saturdays = saturdays.toUpperCase()
        validacion=true;
    } else {
        alert("ha ingresado un valor no valido, por favor intentelo de nuevo")
        validacion=false;
    }

} while(validacion==false)

//Validacion Categoria salarial
validacion=false;
do{
    category = prompt("Indique la categoria del operario, a partir de la misma se considerara el sueldo UOCRA");

    if(category=="A" || category=="a"){
        salaryLevel=40;
        validacion=true;
    } else if(category=="B" || category=="b"){
        salaryLevel=30;
        validacion=true;
    } else if(category=="C" || category=="c"){
        salaryLevel=20;
        validacion=true;
    } else if(category=="D" || category=="d"){
        salaryLevel=10;
        validacion=true;
    } else {
        alert("ha ingresado un valor no valido, por favor intentelo de nuevo")
        validacion=false;
    }

} while(validacion==false)


//funcion horas normales totales de la quincena
function obtainWorkingHours(sikDays,workingHours,saturdays){
    const normalHours = (10-sikDays)*workingHours;
    let weekendhours = 0;

    if(saturdays=="SI"){
         weekendhours = 2*4;
    } else {
         weekendhours = 0;
    }

    return (normalHours+ weekendhours);
}

workedHours = obtainWorkingHours(sikDays,workingHours,saturdays);

//validacion horas extra
do {
    extraHours = parseInt(prompt("Ingrese las horas extra que realizo el operario en la quincena"));
   } while(isNaN(extraHours))

//Funcion salario Bruto
function obtainWage(workedHours,salaryLevel,extraHours){
    return (workedHours)*salaryLevel+extraHours*salaryLevel*2;
}

//validacion presentismo
if(sikDays==0){
    presenteeism = 1;
} else {
    presenteeism = 0;
}


const bruto = obtainWage(workedHours,salaryLevel,extraHours)*(1+ presenteeism * 0.2);
const retirement = bruto*0.11;
const socialSecure = bruto*0.03;
const guild = bruto*0.03;
const neto = bruto - guild - socialSecure - retirement;

console.log(bruto);
console.log(retirement);
console.log(socialSecure);
console.log(guild);
console.log(neto);
