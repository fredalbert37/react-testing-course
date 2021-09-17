import { render, fireEvent } from "@testing-library/react"
import InputComponent from "./InputComponent"

describe('Input component tests', () => {

    describe('Layout', () => {
        test('tiene el label', () => {
            const { container } = render(<InputComponent/>);
            const label = container.querySelector('label');
            expect(label).toBeInTheDocument();
        });

        test('tiene el input', () => {
            const { container } = render(<InputComponent/>);
            const input = container.querySelector('input');
            expect(input).toBeInTheDocument();
        });
    })
    
    describe('Functionality', () => {
        test('acepta la propiedad type', () => {
            const { container } = render(<InputComponent type="email"/>);
            const input = container.querySelector('input');
            expect(input.type).toBe("email");
        });

        test('acepta la propiedad labelText', () => {
            const { container } = render(<InputComponent labelText="Prueba"/>);
            const label = container.querySelector('label');
            expect(label.textContent).toBe("Prueba");
        })

        test('acepta la propiedad id', () => {
            const { container } = render(<InputComponent id="id-de-prueba"/>);
            const input = container.querySelector('input');
            expect(input.id).toBe("id-de-prueba");
        })

        test('acepta la propiedad value', () => {
            const { container } = render(<InputComponent onChange={jest.fn()} value="prueba"/>);
            const input = container.querySelector('input');
            expect(input.value).toBe("prueba");
        })

        test('acepta la propiedad onChange', () => {
            const onChangeCallback = jest.fn()
            const { container } = render(<InputComponent onChange={onChangeCallback} value="prueba"/>);
            const input = container.querySelector('input');
            fireEvent.change(input, {
                target: {
                    value: '1234'
                }
            });
            expect(onChangeCallback).toHaveBeenCalledTimes(1);
        })

        test('la propiedad type es tipo text por defecto', () => {
            const { container } = render(<InputComponent />);
            const input = container.querySelector('input');
            expect(input.type).toBe("text");
        });
         
        test('la propiedad error', () => {
            const { container } = render(<InputComponent error="Email incorrecto" />);
            const errorMessage = container.querySelector('.invalid-feedback');
            expect(errorMessage.textContent).toBe("Email incorrecto");
        });

    })

    


})