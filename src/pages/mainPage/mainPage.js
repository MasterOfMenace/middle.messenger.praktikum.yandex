import { Templator } from "../../utils";
import mainPageTemplate from "./mainPage.tmpl";

const template = new Templator(mainPageTemplate);

const compiled = template.compile();

document.getElementById("root").innerHTML = compiled;
