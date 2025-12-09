import { render, screen } from "@testing-library/react";
import ModuloItem from "../components/Course/Modulo";
import { expect, test } from "vitest";

const mockModulo = {
  titulo: "Módulo 1",
  lecciones: [
    { idLeccion: 1, tituloLeccion: "Lección A", completado: false },
    { idLeccion: 2, tituloLeccion: "Lección B", completado: true },
  ],
};

test("renderiza el título del módulo y las lecciones", () => {
  render(
    <ModuloItem
      modulo={mockModulo}
      index={0}
      AccordionId="Accordion"
      manejarClick={() => {}}
      claseClicked={{ idLeccion: 1 }}
    />
  );

  expect(screen.getByText("Módulo 1")).toBeInTheDocument();
  expect(screen.getByText("Lección A")).toBeInTheDocument();
  expect(screen.getByText("Lección B")).toBeInTheDocument();
});
