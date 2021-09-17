import { render, fireEvent } from "@testing-library/react";
import SignUp from "./SignUp";

describe('Sign up page tests', () => {
    
    //testear la interfaz
    describe('Layout', () => {
        test ('La pagina de registro tiene un input para el correo electronico', () => {
            const { container } = render(<SignUp></SignUp>);
            const emailInput = container.querySelector('#email');
            expect(emailInput).toBeInTheDocument();
        });
        test ('La pagina de registro tiene un input para la contraseña', () => {
            const { container } = render(<SignUp></SignUp>);
            const passwordInput = container.querySelector('#password');
            expect(passwordInput).toBeInTheDocument();
        });
        test ('La pagina de registro tiene un botón para enviar el formulario', () => {
            const { container } = render(<SignUp></SignUp>);
            const button = container.querySelector('#btn-register');
            expect(button).toBeInTheDocument();
        });
        test ('La pagina de registro tiene un label para el correo electronico', () => {
            const { queryByText } = render(<SignUp></SignUp>);
            const labelEmail = queryByText('Correo electronico');
            expect(labelEmail).toBeInTheDocument();
        });
        test ('La pagina de registro tiene un label para la contraseña', () => {
            const { queryByText } = render(<SignUp></SignUp>);
            const labelPassword = queryByText('Contraseña');
            expect(labelPassword).toBeInTheDocument();
        });
        test ('La pagina de registro tiene un titulo de crear cuenta', () => {
            const { container } = render(<SignUp></SignUp>);
            const title = container.querySelector("h4");
            expect(title.textContent).toBe("Crear cuenta");
        });
    })
    
    //testear la funcionalidad
    describe('Functionality', () => {
        const changeEvent = (value) => {
            return {
                target: {
                    value
                }
            }
        };

        let emailInput, passwordInput, signUpButton;
        const setupForSubmit = (emailVal = "test@gmail.com", passwordVal = "p4assw0rd", signUpFunction) => {
            const rendered = render(<SignUp signUp={signUpFunction}></SignUp>);
            const { container } = rendered;
            
            emailInput = container.querySelector('#email');
            fireEvent.change(emailInput, changeEvent(emailVal));

            passwordInput = container.querySelector('#password');
            fireEvent.change(passwordInput, changeEvent(passwordVal));

            signUpButton = container.querySelector("#btn-register");

            return rendered;

        }
        
        test('el input del email tiene el valor del state', () => {
            const { container } = render(<SignUp></SignUp>);
            const emailInput = container.querySelector('#email');
            fireEvent.change(emailInput, changeEvent('prueba'));
            expect(emailInput).toHaveValue('prueba');
        })

        test('el input del password tiene el valor del state', () => {
            const { container } = render(<SignUp></SignUp>);
            const passwordInput = container.querySelector('#email');
            fireEvent.change(passwordInput, changeEvent('passw0rd'));
            expect(passwordInput).toHaveValue('passw0rd');
        })

        test("cuando se da click en el boton de signUp y el correo electronico es invalido debe mostrar el error de validacion", () => {
            const { queryByText } = setupForSubmit("");

            fireEvent.click(signUpButton);

            const error = queryByText("El correo no es valido");

            expect(error).toBeInTheDocument();

        })

        test("cuando se da click en el boton de signUp y el password es invalido debe mostrar el error de validacion", () => {
            const { queryByText } = setupForSubmit("", "pass");

            fireEvent.click(signUpButton);

            const error = queryByText("La contraseña debe ser entre 6 y 30 caracteres");

            expect(error).toBeInTheDocument();

        })
        
        test("cuando se da click en el boton de signUp se limpian de validacion", () => {
            const { queryByText } = setupForSubmit("test@gmail.com", "");

            fireEvent.click(signUpButton);

            fireEvent.change(passwordInput, changeEvent("P4ssw0rd"));

            fireEvent.click(signUpButton);

            const error = queryByText('La contraseña debe ser entre 6 y 30 caracteres');

            expect(error).not.toBeInTheDocument();

        })
        
        test("cuando se da click en el boton de signUp y el email y password son validos debe llamar la funcion signup", () => {
            const signUpFunction = jest.fn().mockResolvedValue({});
            
            setupForSubmit("test@gmail.com", "p4assw0rd", signUpFunction);

            fireEvent.click(signUpButton);

            expect(signUpFunction).toHaveBeenCalledTimes(1);

        })

    })

})