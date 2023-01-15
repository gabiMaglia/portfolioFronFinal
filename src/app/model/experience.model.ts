export default class Experience {
  
  id: number;

  title_exp: string;

  institution_exp: string;
  
  startDate_exp: string;

  endDate_exp: string;

  description_exp: string;

  img_exp: string;
  persona_id: number;

  persona_DNI_persona: number;

  constructor(
    id: number,
    title_exp: string,
    institution_exp: string,

    startDate_exp: string,
    endDate_exp: string,
    description_exp: string,
    img_exp: string,
    persona_id: number,
    persona_DNI_persona: number
  ) {
    this.id = id;
    this.title_exp = title_exp;
    this.institution_exp = institution_exp;
  
    this.startDate_exp = startDate_exp;
    this.endDate_exp = endDate_exp;
    this.description_exp = description_exp;
    this.img_exp = img_exp;
    this.persona_id = persona_id;
    this.persona_DNI_persona = persona_DNI_persona;
  }
}
