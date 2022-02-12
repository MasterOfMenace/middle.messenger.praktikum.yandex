import { Templator } from "../../utils";
import signUpPageTmpl from "./signUpPage.templ";

const template = new Templator(signUpPageTmpl);

const compiled = template.compile();

document.getElementById("root").innerHTML = compiled;
