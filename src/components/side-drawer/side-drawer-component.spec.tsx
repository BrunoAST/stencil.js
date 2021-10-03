import { h } from "@stencil/core";
import { newSpecPage } from "@stencil/core/testing";
import { AnyHTMLElement } from "@stencil/core/internal";
import { SideDrawerComponent } from "./side-drawer-component";

type SutParams = {
  title: string;
}

type SutTypes = {
  root: AnyHTMLElement;
  shadowRoot: ShadowRoot;
}

const makeSut = async (params?: SutParams): Promise<SutTypes> => {
  const { root } = await newSpecPage({
    components: [SideDrawerComponent],
    template: () => (
      <side-drawer title={params?.title}>
        <h1 id="slot">I'm a super slot!</h1>
      </side-drawer>
    ),
  });
  return {
    root,
    shadowRoot: root.shadowRoot,
  };
};

describe("SideDrawer Component", () => {
  it("Should be wrapped by <aside> tag", async () => {
    const { shadowRoot } = await makeSut();
    expect(shadowRoot.querySelector("aside")).toBeTruthy();
  });

  it("Should contain a given title", async () => {
    const title = "Awesome drawer!";
    const { shadowRoot } = await makeSut({ title });
    const titleElement = shadowRoot.querySelector("#title").textContent;
    expect(titleElement).toBe(title);
  });

  it("Should contain a given slot element", async () => {
    const { root } = await makeSut();
    const slotElement = root.querySelector("#slot");
    expect(slotElement).toBeTruthy();
    expect(slotElement.textContent).toBe("I'm a super slot!");
  });
});
