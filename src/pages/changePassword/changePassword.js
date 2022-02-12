import { Templator } from "../../utils";
import changePasswordTemplate from "./changePassword.tmpl";
import avatarSrc from "../../../static/images/avatar.jpg";

const context = {
  avatarSrc,
};

const template = new Templator(changePasswordTemplate);

const compiled = template.compile(context);

document.getElementById("root").innerHTML = compiled;
