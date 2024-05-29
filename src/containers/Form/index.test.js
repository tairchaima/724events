import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Form from "./index"; 

describe("When Form is created", () => {
  it("a list of form fields is displayed", async () => {
    render(<Form />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success action is called", async () => {
      const onSuccess = jest.fn();
      render(<Form onSuccess={onSuccess} />);

      fireEvent(
        await screen.findByTestId("button-test-id"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await waitFor(() => screen.findByText("Envoyer"), {timeout: 1250}); // adaptation au mockContactApi de Form.js

      expect(onSuccess).toHaveBeenCalled();
    });
  });
  
  describe("and the page is refreshed", () => {
    it("the form state is preserved", async () => {
      // Simulate setting sending state to true in local storage
      localStorage.setItem("sending", "true");
      
      // Re-render the form
      render(<Form />);
      
      // Ensure that the sending state is set to true
      expect(screen.getByText("En cours")).toBeInTheDocument();
    });
  });
});