import { Templator } from "../../utils";
import signUpPageTmpl from "./signUpPage.tmpl";

const template = new Templator(signUpPageTmpl);

const compiled = template.compile();

document.getElementById("root").innerHTML = compiled;
