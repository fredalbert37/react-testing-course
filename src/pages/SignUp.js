import React, { useState } from "react";
import InputComponent from "../components/InputComponent";
import { signUpFirebase } from "../firebase/auth/functions";
import { SignUpValidation } from "../validation/validation";

const SignUp = ({ signUp = signUpFirebase }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const createAccount = (e) => {
    e.preventDefault();
    setErrors({});
    try {
      const validation = SignUpValidation(email, password);
      if (!validation.isValid) {
        setErrors(validation.errors);
        return;
      }

      signUp(email, password);

      //enviar la peticion para registro
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container pt-5">
      <div className="row">
        <div className="col-md-6 col-sm-10 mx-auto">
          <div className="card">
            <div className="card-body">
              <h4>Crear cuenta</h4>
              <hr />
              <form onSubmit={createAccount}>
                <InputComponent
                  id="email"
                  labelText="Correo electronico"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={errors.email}
                />
                <InputComponent
                  id="password"
                  labelText="Contraseña"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={errors.password}
                />
                <div className="mb-3">
                  <button
                    id="btn-register"
                    className="btn btn-primary"
                    type="submit"
                  >
                    Crear Cuenta
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
