export default class Studies {
  id: number;

  title_st: string;

  institution_st: string;

  startDate_st: string;

  endDate_st: string;

  description_st: string;

  img_st: string;

  persona_id: number;

  persona_DNI_persona: number;

  
  constructor(
    id: number,
    title_st: string,
    institution_st: string,
    startDate_st: string,
    endDate_st: string,
    description_st: string,
    img_st: string,
    persona_id: number,
    persona_DNI_persona: number
  ) {
    this.id = id;
    this.title_st = title_st;
    this.institution_st = institution_st;
    this.startDate_st = startDate_st;
    this.endDate_st = endDate_st;
    this.description_st = description_st;
    this.img_st = img_st;
    this.persona_id = persona_id;
    this.persona_DNI_persona = persona_DNI_persona;
  }
}
