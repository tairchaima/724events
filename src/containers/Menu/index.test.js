import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Menu from "./index";

describe("When Menu is created", () => {
  it("a list of mandatories links and the logo are displayed", async () => {
    render(<Menu />);
    await screen.findByText("Nos services");
    await screen.findByText("Nos réalisations");
    await screen.findByText("Notre équipe");
    await screen.findByText("Contact");
  });

  describe("and a click is triggered on contact button", () => {
    it("document location  href change", async () => {
      render(<Menu />);
      fireEvent(
        await screen.findByText("Contact"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      expect(window.document.location.hash).toEqual("#contact");
    });

    it('changes document location hash when Nos services link is clicked', async () => {
      render(<Menu />);
      const nosServicesLink = screen.getByText('Nos services');
      fireEvent.click(nosServicesLink);
      await waitFor(() => {
        expect(window.location.hash).toEqual('#nos-services');
      });
    });
    
    it('changes document location hash when Nos services link is clicked', async () => {
      render(<Menu />);
      const nosServicesLink = screen.getByText('Nos réalisations');
      fireEvent.click(nosServicesLink);
      await waitFor(() => {
        expect(window.location.hash).toEqual('#nos-realisations');
      });
    });

    it('changes document location hash when Nos services link is clicked', async () => {
      render(<Menu />);
      const nosServicesLink = screen.getByText('Notre équipe');
      fireEvent.click(nosServicesLink);
      await waitFor(() => {
        expect(window.location.hash).toEqual('#notre-equipe');
      });
    });
  });
});