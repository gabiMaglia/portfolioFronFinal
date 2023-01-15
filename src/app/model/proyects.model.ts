export default class Proyects {
   id: number;

     title_pro: string;

   technologies_pro: string;

     description_pro: string;

  deployLink_pro: string;

    githubLink_pro: string;

    img1_pro: string;

    img2_pro: string;

     img3_pro: string;


  

  constructor(
    id: number, 
    title_pro: string, 
    technologies_pro: string, 
    description_pro: string, 
    deployLink_pro: string, 
    githubLink_pro: string, 
    img1_pro: string, 
    img2_pro: string, 
    img3_pro: string
) {
    this.id = id
    this.title_pro = title_pro
    this.technologies_pro = technologies_pro
    this.description_pro = description_pro
    this.deployLink_pro = deployLink_pro
    this.githubLink_pro = githubLink_pro
    this.img1_pro = img1_pro
    this.img2_pro = img2_pro
    this.img3_pro = img3_pro
  }    

 
}