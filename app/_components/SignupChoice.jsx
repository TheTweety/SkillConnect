// components/SignupChoice.jsx
import { Button } from "@/components/ui/button";

const SignupChoice = ({ onBusinessSignup, onCustomerSignup, onClose }) => {
    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-lg font-medium">Choose Account Type</h2>
            <Button onClick={onBusinessSignup}>Sign Up as a Business</Button>
            <Button onClick={onCustomerSignup}>Sign Up as a Customer</Button>
            <Button variant="outline" onClick={onClose}>Cancel</Button>
        </div>
    );
};

export default SignupChoice;