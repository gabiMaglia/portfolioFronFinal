export default class Skills {
  id: String;

  type: String;

  img_skill: String;

  name: String;

  amount: Number;

  persona_id: number;

  persona_DNI_persona: number;
  
  constructor(
    id: String,
    type: String,
    img_skill: String,
    name: String,
    amount: Number,

    persona_id: number,
    persona_DNI_persona: number
  ) {
    this.id = id;
    this.type = type;
    this.img_skill = img_skill;
    this.name = name;
    this.amount = amount;
    this.persona_id = persona_id;
    this.persona_DNI_persona = persona_DNI_persona
  }
}
