import { Templator } from "../../utils";
import errorTemplate from "../../components/error/error.tmpl";

const context = {
  mainClassName: "error-page",
  sectionClassName: "error-page__content",
  error: {
    code: "500",
    description: "Мы уже фиксим",
  },
};

const template = new Templator(errorTemplate);

const compiled = template.compile(context);

document.getElementById("root").innerHTML = compiled;
