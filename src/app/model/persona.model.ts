export default class Persona {
    id: number;

    name_persona: String;

    surname_persona: String;

  dni_persona: String;

    telephone_persona: String;

 photo_url: String;

 main_phrase:String;

 phrase1:String;

 phrase2:String;

  phrase3:String;



    
    
    constructor(id: number, nombre: String, apellido:String, dni:String, telephone:String, img: String, main_phrase:String, phrase1:String, phrase2:String, phrase3:String ) {
        this.id =id
        this.name_persona = nombre;
        this.surname_persona = apellido;
        this.dni_persona = dni;
        this.telephone_persona = telephone;
        this.photo_url = img;
        this.main_phrase = main_phrase
        this.phrase1 = phrase1
        this.phrase2 = phrase2
        this.phrase3 = phrase3
    }
    


    
}