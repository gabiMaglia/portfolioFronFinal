export default class SocialM {
  id: number;

  instagram: String;

  facebook: String;

  linkedin: String;

  github: String;

  gmail: String;

  constructor(
    id: number,
    instagram: String,
    facebook: String,
    linkedin: String,
    github: String,
    gmail: String
  ) {
    this.id = id;
    this.instagram = instagram;
    this.facebook = facebook;
    this.linkedin = linkedin;
    this.github = github;
    this.gmail = gmail;
  }
}
