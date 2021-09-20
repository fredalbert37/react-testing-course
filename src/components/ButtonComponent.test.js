import { render, fireEvent } from '@testing-library/react';
import ButtonComponent from './ButtonComponent.js';


describe("Button component test", () => {
    describe("Layout", () => {
        test('Tiene el boton', () => {
            const { container } = render(<ButtonComponent></ButtonComponent>);
            const button = container.querySelector("button")
            
            expect(button).toBeInTheDocument();
        })
        test('Tiene el spinner', () => {
            const { container } = render(<ButtonComponent loading={true}></ButtonComponent>);
            
            const spinner = container.querySelector(".spinner-border")
            
            expect(spinner).toBeInTheDocument();
        })
    })
    
    describe("Functionality", () => {
        test('recibe el id por parametro', () => {
            const { container } = render(<ButtonComponent id="btn"></ButtonComponent>);
            const button = container.querySelector("button")
            
            expect(button.id).toBe("btn");
        })
        test('recibe el texto del boton por parametro', () => {
            const { container } = render(<ButtonComponent text="Enviar"></ButtonComponent>);
            const button = container.querySelector("button")
            
            expect(button.textContent).toBe("Enviar");
        })
        test('recibe el color del boton por parametro', () => {
            const { container } = render(<ButtonComponent color="danger"></ButtonComponent>);
            const button = container.querySelector("button")
            
            expect(button.classList.toString()).toContain("danger");
        })
        test('recibe el estado loading por parametro', () => {
            const { container } = render(<ButtonComponent loading={true}></ButtonComponent>);
            const spinner = container.querySelector(".spinner-border")
            
            expect(spinner).toBeInTheDocument();
        })
        test('recibe el tipo de boton por parametro', () => {
            const { container } = render(<ButtonComponent type="submit"></ButtonComponent>);
            const button = container.querySelector("button")
            
            expect(button.type).toBe("submit");
        })
        test('recibe callback onClick por parametro', () => {
            const onClickFunction = jest.fn();
            
            const { container } = render(<ButtonComponent onClick={onClickFunction}></ButtonComponent>);
            
            const button = container.querySelector("button")
            
            fireEvent.click(button);


            expect(onClickFunction).toHaveBeenCalledTimes(1);
        })

        test('el tipo de boton es button por defecto', () => {
            const { container } = render(<ButtonComponent></ButtonComponent>);
            const button = container.querySelector("button")
            
            expect(button.type).toBe("button");
        })
        test('el color de boton es primary por defecto', () => {
            const { container } = render(<ButtonComponent></ButtonComponent>);
            const button = container.querySelector("button")
            
            expect(button.classList.toString()).toContain("primary");
        })


    })
})