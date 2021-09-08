import { render } from "@testing-library/react";
import SignUp from "./SignUp";

describe('Sign up page tests', () => {
    
    //testear la interfaz
    describe('Layout', () => {
        test ('La pagina de registro tiene un input para el correo electronico', () => {
            const rendered = render(<SignUp></SignUp>);
            const { container } = rendered;
            const emailInput = container.querySelector('#email');
            expect(emailInput).toBeInTheDocument();
        });
        test ('La pagina de registro tiene un input para la contraseña', () => {
            const rendered = render(<SignUp></SignUp>);
            const { container } = rendered;
            const passwordInput = container.querySelector('#password');
            expect(passwordInput).toBeInTheDocument();
        });
        test ('La pagina de registro tiene un botón para enviar el formulario', () => {
            const rendered = render(<SignUp></SignUp>);
            const { container } = rendered;
            const button = container.querySelector('#btn-register');
            expect(button).toBeInTheDocument();
        });
        test ('La pagina de registro tiene un label para el correo electronico', () => {
            const rendered = render(<SignUp></SignUp>);
            const { queryByText } = rendered;
            const labelEmail = queryByText('Correo electronico');
            expect(labelEmail).toBeInTheDocument();
        });
        test ('La pagina de registro tiene un label para la contraseña', () => {
            const rendered = render(<SignUp></SignUp>);
            const { queryByText } = rendered;
            const labelPassword = queryByText('Contraseña');
            expect(labelPassword).toBeInTheDocument();
        });
        test ('La pagina de registro tiene un titulo de crear cuenta', () => {
            const rendered = render(<SignUp></SignUp>);
            const { container } = rendered;
            const title = container.querySelector("h4");
            expect(title.textContent).toBe("Crear cuenta");
        });
    })
    
    //testear la funcionalidad
    describe('Functionality', () => {
        
    })

})