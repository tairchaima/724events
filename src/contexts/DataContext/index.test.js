import { render, screen } from "@testing-library/react";
import { DataProvider, api, useData } from "./index";

describe("When a data context is created", () => {
  afterEach(() => {
    jest.restoreAllMocks(); // Restaurer les mocks après chaque test
  });

  it("executes a call on the events.json file", async () => {
    api.loadData = jest.fn().mockResolvedValue({ result: "ok" });

    const Component = () => {
      const { data } = useData();
      return <div>{data?.result}</div>;
    };

    render(
      <DataProvider>
        <Component />
      </DataProvider>
    );

    const dataDisplayed = await screen.findByText("ok");
    expect(dataDisplayed).toBeInTheDocument();
  });
  describe("and the events call failed", () => {
    it("the error is dispatched", async () => {
      window.console.error = jest.fn();
      api.loadData = jest.fn().mockRejectedValue("error on calling events");

      const Component = () => {
        const { error } = useData();
        return <div>{error}</div>;
      };

      render(
        <DataProvider>
          <Component />
        </DataProvider>
      );

      const errorDisplayed = await screen.findByText("error on calling events");
      expect(errorDisplayed).toBeInTheDocument();
    });
  });

  it("api.loadData", async () => {
    window.console.error = jest.fn();
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve({ rates: { CAD: 1.42 } }),
    });

    const Component = () => {
      const { error } = useData();
      return <div>{error}</div>;
    };

    render(
      <DataProvider>
        <Component />
      </DataProvider>
    );

  });
});

