import React, { useState } from "react";
import ButtonComponent from "../components/ButtonComponent";
import InputComponent from "../components/InputComponent";
import { signUpFirebase } from "../firebase/auth/functions";
import { SignUpValidation } from "../validation/validation";
import { useHistory } from "react-router-dom";

const SignUp = ({ signUp = signUpFirebase }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [SendingRequest, setSendingRequest] = useState(false);

  const history = useHistory();

  const createAccount = async(e) => {
    e.preventDefault();
    setApiError("");
    setErrors({});
    try {
      const validation = SignUpValidation(email, password);
      if (!validation.isValid) {
        setErrors(validation.errors);
        return;
      }
      
      setSendingRequest(true);
      
      await signUp(email, password);

      history.push('/user');

      //enviar la peticion para registro
    } catch (error) {
      setApiError(error.message);
      setSendingRequest(false);
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
                  <ButtonComponent id="btn-register"
                  loading={SendingRequest}
                  text="Crear cuenta"
                  type="submit"
                  />
                </div>
              </form>
              {
                apiError && 
                <div className="alert alert-danger mt-4" role="alert">
                  { apiError }
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
