

class Usuario {

    constructor() {
        this.personas = [];
    }

    addPersona(id, nombre, sala) {

        let persona = {
            id, nombre, sala
        }

        this.personas.push(persona);

        return this.getPersonasSala(sala);

    }

    getPersona(idP) {

        let persona = this.personas.find(({id}) => id === idP);

        return persona;
    }

    getPersonas() {
        return this.personas;
    }

    getPersonasSala(salaP) {
        return this.personas.filter(({sala}) => sala === salaP);
    }

    deletePersona(idP) {

        let personaEliminada = this.getPersona(idP);
        this.personas = this.personas.filter(({id}) => id !== idP);

        return personaEliminada;
    }






}

module.exports = {
    Usuario
}