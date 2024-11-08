"use client"

import { useRef, useState } from "react";
import QRScanner from "~/app/_components/organizer/qr-scanner";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { toast } from "~/hooks/use-toast";
import { api } from "~/trpc/react";

interface participantDataSchema {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    dietaryRestrictions: string;
    status: string;
    extraInfo: string;
    checkedIn: boolean;
}

const defaultParticipantData: participantDataSchema = {
    userId: '404',
    firstName: 'Participant',
    lastName: 'Not Found',
    email: '404@tamudatathon.com',
    dietaryRestrictions: "None",
    status: "Pending",
    extraInfo: "None",
    checkedIn: false,
};

export default function PassportPage() {
    const [participantData, setParticipantData] = useState<participantDataSchema>(defaultParticipantData);
    const [scannerData, setScannerData] = useState<string>("");
    const inputRef = useRef<HTMLInputElement>(null);

    const statusMutation = api.application.updateCheckInStatus.useMutation();
    const handleCheckIn = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        let inputEmail = "";
        if (inputRef.current && inputRef.current.value) {
            inputEmail = inputRef.current.value;
        } else {
            inputEmail = scannerData;
        }

        console.log(inputEmail);

        const queryData = await statusMutation.mutateAsync({
            eventName: process.env.NEXT_PUBLIC_EVENT_NAME ?? "",
            email: inputEmail,
            newStatus: true,
            allowedStatuses: ["accepted", "waitlisted", "rejected"],
        }, {
            onSuccess: () => {
                toast({
                    variant: "success",
                    title: "Check-in Successful",
                    description: "The participant has been successfully checked in."
                })
            },
            onError: (e) => {
                toast({
                    variant: "destructive",
                    title: "Check-in Failed",
                    description: e.message,
                })
            }
        });

        if (queryData) {
            setParticipantData(queryData as unknown as participantDataSchema);
        } else {
            setParticipantData(defaultParticipantData);
        }
    }

    return (
        <div className="flex flex-col w-full h-full items-center justify-center relative">
            <h1 className="text-3xl font-bold">Check-in System</h1>
            <div className="flex flex-col items-center gap-2">
                Currently Scanning: {scannerData}
                <QRScanner onScan={setScannerData} />
                <label htmlFor="">Manual Input:</label>
                <Input ref={inputRef} placeholder="enter email here"></Input>
                <Button onClick={handleCheckIn}>Check-in Participant</Button>
            </div>

            <div className="flex flex-col items-center p-4 gap-2">
                <h2 className="text-2xl font-bold mb-2">Participant's Data</h2>
                <p className="text-cyan-600">Status: {participantData.status}</p>
                <p className="text-indigo-500">Checked In: {participantData.checkedIn ? "True" : "False"}</p>
                <p>Name: {participantData.firstName} {participantData.lastName}</p>
                <p>Dietary Restrictions: {participantData.dietaryRestrictions}</p>
                <p>Email: {participantData.email}</p>
                <p>Extra Info: {participantData.extraInfo}</p>
            </div>
        </div>
    );
}