import { SignUpValidation } from "./validation";

describe('validation test', () => {
    describe('SignUpValidation Function', () => {
        
        test('Valida un correo electronico invalido', () => {
            const validation = SignUpValidation("test@gmail");
            expect(Object.keys(validation.errors)).toContain("email");
        });
        
        test('Valida un correo electronico valido', () => {
            const validation = SignUpValidation("test@gmail.com");
            expect(Object.keys(validation.errors)).not.toContain("email");
        });
        
        test('Valida una contraseña invalido', () => {
            const validation = SignUpValidation("", "12345");
            expect(Object.keys(validation.errors)).toContain("password");
        });

        test('Valida una contraseña valido', () => {
            const validation = SignUpValidation("", "12345678");
            expect(Object.keys(validation.errors)).not.toContain("password");
        });

        test('La validacion retorna un objeto con los errores', () => {
            const validation = SignUpValidation();
            expect(Object.keys(validation.errors).length).toBe(2);
        });

        test('La validacion falla cuando el correo electronico es incorrecto', () => {
            const validation = SignUpValidation("test@gmail", "12345678");
            expect(validation.isValid).toBe(false);
        });

        test('La validacion falla cuando el password es incorrecto', () => {
            const validation = SignUpValidation("test@gmail.com", "12345");
            expect(validation.isValid).toBe(false);
        });

        test('La validacion pasa cuando el password y el correo electronico son correctos', () => {
            const validation = SignUpValidation("test@gmail.com", "12345678");
            expect(validation.isValid).toBe(true);
        });
    });
});