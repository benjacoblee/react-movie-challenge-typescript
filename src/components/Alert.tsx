import React from "react";
import { CgSpinner } from "react-icons/cg";
import { VscError } from "react-icons/vsc";

interface AlertProps {
    iconBackgroundColor: string;
    backgroundColor: string;
    color: string;
    text: string;
}

const Alert: React.FC<AlertProps> = ({
    iconBackgroundColor,
    backgroundColor,
    color,
    text
}) => {
    return (
        <div className={`flex ${backgroundColor} p-4 w-full`}>
            <div className="mr-4">
                <div
                    className={`h-10 w-10 text-white ${iconBackgroundColor} rounded-full flex justify-center items-center ${
                        text.includes("Error") ? "" : "animate-spin"
                    }`}
                >
                    {text.includes("Error") ? <VscError /> : <CgSpinner />}
                </div>
            </div>
            <div className="flex justify-between items-center w-full">
                <div>
                    <p className={`font-bold ${color}`}>{text}</p>
                </div>
            </div>
        </div>
    );
};

export default Alert;
