// formulario Jorge
const formulario = document.getElementById("formulario");
const nombre = document.getElementById("name");
const apellido = document.getElementById("apellido");
const email = document.getElementById("email");
const telefono = document.getElementById("telefono");
const mensaje = document.getElementById("mensaje");

formulario.addEventListener("submit", (e) => {
        e.preventDefault();
        console.log("funciona");
        checkInputs();

});
// Valida en ingreso de datos
function checkInputs() {
        const nameValor = nombre.value.trim();
        const apellidoValor = apellido.value.trim();
        const emailValor = email.value.trim();
        const telefonoValor = telefono.value.trim();
        const mensajeValor = mensaje.value.trim();
        if (nameValor === ""){
            setErrorFor(nombre, "No se puede dejar el nombre en blanco");
        }else{
            setSuccessFor(nombre);
        }
        if (apellidoValor === ""){
            setErrorFor(apellido, "No se puede dejar el apellido en blanco");
        }else{
            setSuccessFor(apellido);
        }
        if(emailValor === "") {
            setErrorFor(email, 'No puede dejar el email en blanco');
        } else if (!isEmail(emailValor)) {
            setErrorFor(email, 'No ingreso un email válido');
        } else {
            setSuccessFor(email);
        }
        if (telefonoValor === ""){
            setErrorFor(telefono, "No se puede dejar el teléfono en blanco");
        }else{
            setSuccessFor(telefono);
        } 
        if (mensajeValor === ""){
            setErrorFor(mensaje, "No se puede dejar el comentario en blanco");
        }else{
            setSuccessFor(mensaje);
        }
     
}
// valida el error
function setErrorFor(input, message){
    const formControl =input.parentElement;
    const small =formControl.querySelector("small");
    formControl.className ="form-control error";
    small.innerText = message;
}
// Si está todo correcto
function setSuccessFor(input){
    const formControl = input.parentElement;
    formControl.ClassName = "form-control success";
}
function isEmail(email){
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);

}
