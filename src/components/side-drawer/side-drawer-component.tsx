import { Component, h, Method, Prop, State } from "@stencil/core";

@Component({
  tag: "side-drawer",
  styleUrl: "./side-drawer-component.css",
  shadow: true,
})
export class SideDrawerComponent {
  @State() showContactInfo = false;
  @Prop({ reflect: true }) drawerTitle: string;
  @Prop({ reflect: true, mutable: true }) opened: boolean;

  onCloseDrawer(): void {
    this.opened = false;
  }

  onContentChange(content: string): void {
    this.showContactInfo = content === "contact";
  }

  // Public method that can be used by the consumer
  @Method()
  async open(): Promise<void> {
    this.opened = true;
  }

  mainContent() {
    return !this.showContactInfo ?
      <slot /> :
      (
        <div id="contact-information">
          <h2>Contact information</h2>
          <p>You can reach us via phone or email.</p>
          <ul>
            <li>Phone: 3333333</li>
            <li>Email: <a href="mailto:email@email.com">email@email.com</a></li>
          </ul>
        </div>
      );
  }

  render() {
    return [
      <div class="backdrop" onClick={this.onCloseDrawer.bind(this)} />,
      <aside>
        <header id="title">
          <h1>{this.drawerTitle}</h1>
          <button onClick={this.onCloseDrawer.bind(this)}>X</button>
        </header>
        <section id="tabs">
          <button
            class={!this.showContactInfo ? "active" : ""}
            onClick={this.onContentChange.bind(this, "nav")}
          >
            Navigation
          </button>
          <button
            class={this.showContactInfo ? "active" : ""}
            onClick={this.onContentChange.bind(this, "contact")}
          >
            Contact
          </button>
        </section>
        <main>
          {this.mainContent.bind(this)}
        </main>
      </aside>,
    ];
  }
}
