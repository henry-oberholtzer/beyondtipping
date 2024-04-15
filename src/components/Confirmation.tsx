import Button from "./Button.tsx";

export const Confirmation = () => {
    return (
        <>
            <p id="confirmation">Thank you for your submission! It will be reviewed by an administrator.</p>
            <Button id="backToHomeButton" to="/" buttonText="return to home" className="mb-8 md:mb-10" />
        </>
    )
}  