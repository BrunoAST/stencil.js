import { r as registerInstance, h } from './index-b9d6ae30.js';

const sideDrawerComponentCss = "aside{position:fixed;top:0;left:-100%;width:30rem;max-width:80%;height:100vh;background:#f3f3f3;box-shadow:0 2px 8px rgba(0, 0, 0, 0.26);transition:left 0.3s ease-out;z-index:100}:host([opened]) aside{left:0}header{padding:1rem;background:black;position:relative}header h1{font-size:1.5rem;color:white;margin:0}header button{position:absolute;top:0;right:0;padding:1rem;color:white;background:transparent;font-size:1.5rem;border:none}header button:focus{outline:none}#tabs{display:flex;justify-content:center;width:100%;margin:1rem 0}#tabs button{width:30%;background-color:white;color:black;text-align:center;border:1px solid black;font:inherit;padding:.15rem 0}#tabs button.active,#tabs button:hover,#tabs button:active{background-color:black;color:white}#tabs button:focus{outline:none}#contact-information{padding:0 1rem}.backdrop{position:fixed;top:0;left:0;width:100%;height:100vh;background-color:rgba(0, 0, 0, .75);z-index:10;opacity:0;pointer-events:none;transition:opacity 300ms ease-out}:host([opened]) .backdrop{opacity:1;pointer-events:all}";

const SideDrawerComponent = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.showContactInfo = false;
  }
  onCloseDrawer() {
    this.opened = false;
  }
  onContentChange(content) {
    this.showContactInfo = content === "contact";
  }
  // Public method that can be used by the consumer
  open() {
    this.opened = true;
  }
  mainContent() {
    return !this.showContactInfo ?
      h("slot", null) :
      (h("div", { id: "contact-information" }, h("h2", null, "Contact information"), h("p", null, "You can reach us via phone or email."), h("ul", null, h("li", null, "Phone: 3333333"), h("li", null, "Email: ", h("a", { href: "mailto:email@email.com" }, "email@email.com")))));
  }
  render() {
    return [
      h("div", { class: "backdrop", onClick: this.onCloseDrawer.bind(this) }),
      h("aside", null, h("header", { id: "title" }, h("h1", null, this.title), h("button", { onClick: this.onCloseDrawer.bind(this) }, "X")), h("section", { id: "tabs" }, h("button", { class: !this.showContactInfo ? "active" : "", onClick: this.onContentChange.bind(this, "nav") }, "Navigation"), h("button", { class: this.showContactInfo ? "active" : "", onClick: this.onContentChange.bind(this, "contact") }, "Contact")), h("main", null, this.mainContent.bind(this))),
    ];
  }
};
SideDrawerComponent.style = sideDrawerComponentCss;

export { SideDrawerComponent as side_drawer };
