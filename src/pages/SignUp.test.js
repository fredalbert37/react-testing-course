import { render, fireEvent } from "@testing-library/react";
import SignUp from "./SignUp";
import {waitFor} from '@testing-library/react';

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

        test("cuando se da click en el boton de signUp y el correo electronico es invalido debe mostrar el error de validacion", async () => {
            const { queryByText } = setupForSubmit("");

            await waitFor(() => {
                
                fireEvent.click(signUpButton);
            })

            const error = queryByText("El correo no es valido");

            expect(error).toBeInTheDocument();

        })

        test("cuando se da click en el boton de signUp y el password es invalido debe mostrar el error de validacion", async () => {
            const { queryByText } = setupForSubmit("", "pass");

            await waitFor(() => {
                
                fireEvent.click(signUpButton);
            })

            const error = queryByText("La contraseña debe ser entre 6 y 30 caracteres");

            expect(error).toBeInTheDocument();

        })
        
        test("cuando se da click en el boton de signUp se limpian de validacion", async () => {
            const { queryByText } = setupForSubmit("test@gmail.com", "");

            await waitFor(() => {
                
                fireEvent.click(signUpButton);
            })

            fireEvent.change(passwordInput, changeEvent("P4ssw0rd"));

            await waitFor(() => {
                
                fireEvent.click(signUpButton);
            })

            const error = queryByText('La contraseña debe ser entre 6 y 30 caracteres');

            expect(error).not.toBeInTheDocument();

        })
        
        test("cuando se da click en el boton de signUp y el email y password son validos debe llamar la funcion signup", async () => {
            const signUpFunction = jest.fn().mockResolvedValue({});
            
            setupForSubmit("test@gmail.com", "p4assw0rd", signUpFunction);

            await waitFor(() => {
                
                fireEvent.click(signUpButton);
            })

            expect(signUpFunction).toHaveBeenCalledTimes(1);

        })
        
        test("cuando se da click en el boton de signUp y el email y password son validos debe llamar la funcion signup con el email y el password", async () => {
            const signUpFunction = jest.fn().mockResolvedValue({});
            
            setupForSubmit("test@gmail.com", "p4assw0rd", signUpFunction);

            await waitFor(() => {
                
                fireEvent.click(signUpButton);
            })

            expect(signUpFunction).toHaveBeenCalledWith("test@gmail.com", "p4assw0rd");

        })

        test("cuando se da click en el boton de signUp y el password es incorrecto no debe llamar a la funcion signup", async () => {
            const signUpFunction = jest.fn().mockResolvedValue({});
            
            setupForSubmit("test@gmail.com", "", signUpFunction);

            await waitFor(() => {
                
                fireEvent.click(signUpButton);
            })

            expect(signUpFunction).toHaveBeenCalledTimes(0);

        })

        test("cuando el backend retorna un error, se debe mostrar en pantalla", async () => {
            const signUpFunction = jest.fn().mockRejectedValue({
                message: "Validation error"
            });
            
            const { container } = setupForSubmit("emailrepetido@gmail.com", "p$assword", signUpFunction);

            await waitFor(() => {
                
                fireEvent.click(signUpButton);
            })
            
            const error = container.querySelector(".alert");

            expect(error.textContent).toBe("Validation error");
        })

        test("cuando existe un mensaje de error del backend y se envia la peticion de nuevo, se debo borrar el mensaje de error", async () => {
            const signUpFunction = jest.fn().mockImplementation(() => {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        reject ({})
                    }, 300);
                });
            });
            
            const { container } = setupForSubmit("emailrepetido@gmail.com", "p$assword", signUpFunction);

            await waitFor(() => {
                
                fireEvent.click(signUpButton);
            })

            await waitFor(() => {
                
                fireEvent.click(signUpButton);
            })
            
            const error = container.querySelector(".alert");

            expect(error).not.toBeInTheDocument();
        })

        test("muestra el spinner cuando se esta enviando una peticion al backend", async () => {
            const signUpFunction = jest.fn().mockImplementation(() => {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve ({})
                    }, 300);
                });
            });
            
            const { container } = setupForSubmit("emailrepetido@gmail.com", "p$assword", signUpFunction);

            await waitFor(() => {
                fireEvent.click(signUpButton);
            })
            
            const spinner = container.querySelector(".spinner-border")
            
            expect(spinner).toBeInTheDocument();
        })

        test("no muestra el spinner cuando se esta enviando una peticion al backend y devuelve un error", async () => {
            const signUpFunction = jest.fn().mockRejectedValueOnce({
                message: "Validation error"
            });
            
            const { container } = setupForSubmit("emailrepetido@gmail.com", "p$assword", signUpFunction);

            await waitFor(() => {
                fireEvent.click(signUpButton);
            })
            
            const spinner = container.querySelector(".spinner-border")
            
            expect(spinner).not.toBeInTheDocument();
        })


    })

})