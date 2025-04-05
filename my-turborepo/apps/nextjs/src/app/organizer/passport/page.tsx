"use client";

import React, { useRef, useState } from "react";
import { Cat, Dog, Fish, Turtle } from "lucide-react";

import { MultiSelect } from "~/app/_components/multiselect";
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
  userId: "404",
  firstName: "Participant",
  lastName: "Not Found",
  email: "404@tamudatathon.com",
  dietaryRestrictions: "None",
  status: "Pending",
  extraInfo: "None",
  checkedIn: false,
};

export default function PassportPage() {
  const [participantData, setParticipantData] = useState<participantDataSchema>(
    defaultParticipantData,
  );
  const [scannerData, setScannerData] = useState<string>("");
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([
    "accepted",
    "waitlisted",
  ]);

  const inputRef = useRef<HTMLInputElement>(null);

  const statusList = [
    {
      label: "Pending",
      value: "pending",
      icon: Turtle,
    },
    {
      label: "Accepted",
      value: "accepted",
      icon: Dog,
    },
    {
      label: "Rejected",
      value: "rejected",
      icon: Cat,
    },
    {
      label: "Waitlisted",
      value: "waitlisted",
      icon: Fish,
    },
  ];
  React.useEffect(() => {
    if (scannerData) {
      queryData.refetch();
    }
  }, [scannerData]);

  const queryData = api.application.getCheckInStatus.useQuery(
    {
      eventName: "Datathon2025Spring",
      email: scannerData,
    },
    {
      enabled: !!scannerData, // Only enable the query if scannerData exists
    },
  );

  React.useEffect(() => {
    if (queryData.isSuccess && queryData.data) {
      setParticipantData(queryData.data as unknown as participantDataSchema);
    } else if (queryData.isError) {
      setParticipantData(defaultParticipantData);
    }
  }, [queryData.isSuccess, queryData.isError, queryData.data]);

  const statusMutation = api.application.updateCheckInStatus.useMutation();
  const updateCheckIn = async (newStatus: boolean) => {
    let inputEmail = "";
    if (inputRef.current && inputRef.current.value) {
      inputEmail = inputRef.current.value;
    } else {
      inputEmail = scannerData;
    }

    if (inputEmail === "") {
      toast({
        variant: "destructive",
        title: "Check-in Failed",
        description: "Missing input data",
      });
      return;
    }

    const mutateData = await statusMutation.mutateAsync(
      {
        eventName: "Datathon2025Spring",
        // eventName: process.env.NEXT_PUBLIC_EVENT_NAME ?? "",
        email: inputEmail,
        newStatus: newStatus,
        allowedStatuses: selectedStatuses,
      },
      {
        onSuccess: () => {
          toast({
            variant: "success",
            title: (newStatus ? "ADDED" : "REMOVED") + " Check-in Successful",
            description:
              "The participant has been successfully " +
              (newStatus ? "added" : "removed") +
              " from the check-in list",
          });
        },
        onError: (e: any) => {
          toast({
            variant: "destructive",
            title: "Check-in Failed",
            description: e.message,
          });
        },
      },
    );

    if (mutateData) {
      setParticipantData(mutateData as unknown as participantDataSchema);
    } else {
      setParticipantData(defaultParticipantData);
    }
  };

  const handleCheckIn = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    updateCheckIn(true);
  };

  const handleCheckOut = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    updateCheckIn(false);
  };

  return (
    <div className="relative flex flex-col items-center justify-center gap-2 p-4 text-black dark:text-white">
      <h1 className="text-3xl font-bold">Check-in System</h1>
      <div className="flex flex-col items-center gap-2">
        Currently Scanning: {scannerData}
        <QRScanner onScan={setScannerData} />
        <div className="w-full sm:w-1/2 text-center p-4">
          <label>Manual Override Input:</label>
          <Input
            className="border border-black bg-orange-100"
            ref={inputRef}
            placeholder="enter email here"
          ></Input>
        </div>
        <Button
          className="bg-cyan-700 hover:bg-opacity-50"
          onClick={handleCheckIn}
        >
          {statusMutation.isPending ? "Loading..." : "Check-in Participant"}
        </Button>
      </div>

      <div className="flex flex-col items-center rounded-md bg-orange-100 dark:bg-orange-400 p-4">
        <h2 className="mb-1 text-2xl font-bold">Participant's Data</h2>
        <p>
          Name: {participantData.firstName} {participantData.lastName}
        </p>
        <p className="text-cyan-600">Status: {participantData.status}</p>
        <p className="text-indigo-500">
          Checked In:{" "}
          <span
            className={
              participantData.checkedIn ? "text-green-500" : "text-red-500"
            }
          >
            {participantData.checkedIn ? "True" : "False"}
          </span>
        </p>
        <p>
          Dietary Restrictions:{" "}
          {participantData.dietaryRestrictions
            ? participantData.dietaryRestrictions
            : "None"}
        </p>
        <p>Email: {participantData.email}</p>
        <p>
          Extra Info:{" "}
          {participantData.extraInfo ? participantData.extraInfo : "None"}
        </p>
      </div>
      {/* Divider */}
      <div className="my-2 w-1/2 border-2 border-black"></div>

      {/* Multiselect */}
      <div className="mx-4 w-full text-center sm:w-1/2">
        <h2>Select Allowed Statuses:</h2>
        <MultiSelect
          options={statusList}
          onValueChange={setSelectedStatuses}
          defaultValue={selectedStatuses}
          placeholder="Select Allowed Statuses"
          variant="inverted"
          animation={2}
          maxCount={4}
        />
        <Button onClick={handleCheckOut}>Remove Participant</Button>
      </div>
    </div>
  );
}
