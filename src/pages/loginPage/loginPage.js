import { Templator } from "../../utils";
import loginPageTemplate from "./loginPage.tmpl";

const template = new Templator(loginPageTemplate);

const compiled = template.compile();

document.getElementById("root").innerHTML = compiled;
