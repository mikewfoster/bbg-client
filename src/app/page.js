"use client"

import InputText from "@/components/form/InputText";
import InputPassword from "@/components/form/InputPassword";
import Button from "@/components/form/Button";

import { login } from "@/hooks/useAuth";
import { useState } from 'react';

export default function Home() { 
    const [data, setData] = useState({
        username: "",
        password: "",
    });

    const [formError, setFormError] = useState('');
    const [touched, setTouched] = useState({});

    const checkData = async (obj) => {
        const { username, password } = data;

        const API_ROOT = `${process.env.API_URL}`;        
        const LOGIN_URL = `${API_ROOT}/auth/`;

        const body = {
            username: username,
            password: password,
        };

        fetch(LOGIN_URL, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(body),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((result) => {
                if (result.success) {
                    loginHandler(result);
                } else {
                    setFormError(result);
                }
            })
            .catch((error) => {
                setTimeout(() => {
                }, 1000);
            });
    };

    const changeHandler = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const focusHandler = (event) => {
        setTouched({ ...touched, [event.target.name]: true });
    };

    const submitHandler = (event) => {
        event.preventDefault();
        checkData(data);
    };

    const loginHandler = async (data) => {
        login(data);
    };

  return (
    <>
      <br />
      <br />
      <div className={"form-signin w-100 m-auto visually-hidden"}>
          <div
              className="alert alert-danger border-primary-light border-2"
              role="alert"
          >
              Now logging in...
          </div>
      </div>

      {(formError.errors || formError.message) && (
        <div>
          <div className="form-signin w-100 m-auto alert alert-danger border-primary-light border-2" role="alert">
              <span aria-live="assertive">{formError.message}</span>
          </div>
          <br />
        </div>
      )}

      <div className="p-4 rounded-3 bg-light shadow form-signin w-100 m-auto">
          
        <h1 className="h2 font-fancy mt-2 mb-4 fw-normal text-center text-primary-darker">
            Sign in
        </h1>          
        <form className="" onSubmit={submitHandler}>
            <InputText
                name="username"
                placeholder="Username"
                value={data.username}
                onChange={changeHandler}
                onFocus={focusHandler}
                error={(formError.errors && formError.errors.username) ? formError.errors.username : ''}
            />

            <InputPassword
                name="password"
                placeholder="Password"
                value={data.password}
                onChange={changeHandler}
                onFocus={focusHandler}
                error={(formError.errors && formError.errors.password) ? formError.errors.password : ''}
            />

            <Button
                type="submit"
                text="Sign in"
                theme="primary"
                classList="w-100"
            />
        </form>
      </div>
    </>
  );
}
