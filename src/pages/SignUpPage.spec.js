import SignUpPage from "./SignUpPage";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
const axios = require('axios').default; 
import { setupServer} from "msw/node";
import { rest } from "msw";

describe('Sign Up Page ', () => {
    describe('Layout', () => {
        it("has header", () => {
            render(<SignUpPage/>)
            const header = screen.queryByRole("heading", {name: "Sign Up"});
            expect(header).toBeInTheDocument();
        });

        it("has username input", () => {
            render(<SignUpPage/>);
            //const input = screen.getByPlaceholderText('username');
            const input = screen.getByLabelText('Username');
            expect(input).toBeInTheDocument();
        });

        it("has email input", () => {
             render(<SignUpPage/>);
            const input = screen.getByLabelText('E-mail');
            expect(input).toBeInTheDocument();
        });

        it("has password type input", () => {
            render(<SignUpPage/>);
           const input = screen.getByLabelText('Password');
           expect(input).toBeInTheDocument();
           expect(input.type).toBe("password");
       });

       it("has password repeat input", () => {
            render(<SignUpPage/>);
            const input = screen.getByLabelText('Confirm Password');
            expect(input).toBeInTheDocument();
            expect(input.type).toBe("password");
        });

        it("has Signup button", () => {
            render(<SignUpPage/>)
            const button = screen.queryByRole("button", {name: "Sign Up"});
            expect(button).toBeInTheDocument();
        });

        it("disables the button initially", () => {
            render(<SignUpPage/>)
            const button = screen.queryByRole("button", {name: "Sign Up"});
            expect(button).toBeDisabled();
        });

    });
});

describe("Interactions", () => {
    it("enables the button when the password and password repeat fields have same value", () => {
        render(<SignUpPage/>);
        const password = screen.getByLabelText('Password');
        const confirmPassword = screen.getByLabelText('Confirm Password');
        userEvent.type(password, 'P4ssw0rd');
        userEvent.type(confirmPassword, 'P4ssw0rd');
        const button = screen.queryByRole('button', {name: 'Sign Up'});
        expect(button).toBeEnabled();
    });

    it("sends username, email and password to backend after clicking the button", async () => {
        let reqBody;
        const server = setupServer(
            rest.post("/api/1.0/users", (req, res, ctx) => {
                console.log("the message is");
                reqBody = req.body;
                return res(ctx.status(200));
            })
        );

        server.listen();
        render(<SignUpPage/>);
        const usernameInput = screen.getByLabelText('Username');
        const emailInput = screen.getByLabelText('E-mail');
        const passwordInput = screen.getByLabelText('Password');
        const confirmPassword = screen.getByLabelText('Confirm Password');

        userEvent.type(usernameInput, 'user1');
        userEvent.type(emailInput, 'user1@mail.com');
        userEvent.type(passwordInput, 'P4ssw0rd');
        userEvent.type(confirmPassword, 'P4ssw0rd');
        const button = screen.queryByRole('button', {name: 'Sign Up'});
        expect(button).toBeEnabled();
        userEvent.click(button);

        // const mockFn = jest.fn();
        // axios.post = mockFn;
        
        // userEvent.click(button);

        // const firstCallofMockFunction = mockFn.mock.calls[0];
        // const body = firstCallofMockFunction[1];

        //const mockFn = jest.fn();
        //window.fetch = mockFn;

        userEvent.click(button);

        await new Promise(resolve => setTimeout(resolve, 1500));

       // const firstCallofMockFunction = mockFn.mock.calls[0];
        //const body = JSON.parse(firstCallofMockFunction[1].body);


        expect(reqBody).toEqual({
            username: 'user1',
            email: 'user1@mail.com',
            password: 'P4ssw0rd'
        });

    });

    
});

