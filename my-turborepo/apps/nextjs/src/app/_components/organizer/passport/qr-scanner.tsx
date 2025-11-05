"use client";

import type {
  IDetectedBarcode,
  IScannerStyles,
} from "@yudiel/react-qr-scanner";
import { useState } from "react";
import { IScannerClassNames, Scanner } from "@yudiel/react-qr-scanner";

import { Button } from "~/components/ui/button";

export default function QRScanner(props: {
  onScan: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [pauseScan, setPauseScan] = useState(true);
  const scannerStyles: IScannerStyles = {
    container: {
      width: "400px",
      height: "400px",
      maxWidth: "100vw",
    },
    video: {
      maxWidth: "400px",
      maxHeight: "400px",
      width: "auto",
      height: "auto",
    },
  };

  const handleQRScan = (data: IDetectedBarcode[] | null) => {
    if (data?.[0]?.rawValue) {
      try {
        const decodedData = atob(data[0].rawValue);
        setPauseScan(true);
        props.onScan(decodedData);
      } catch (error) {
        console.error("Failed to decode QR code:", error);
      }
    }
  };

  const handleQRError = (err: unknown) => {
    console.log(err);
  };

  return (
    <div className={"max-w-4/5 flex h-full w-full flex-col items-center gap-2"}>
      <Button
        variant="secondary"
        className={"text-white " + (pauseScan ? "bg-green-600" : "bg-red-600")}
        onClick={() => setPauseScan(!pauseScan)}
      >
        {pauseScan ? "Activate Scanner" : "Pause Scanner"}
      </Button>
      <Scanner
        onError={handleQRError}
        onScan={handleQRScan}
        paused={pauseScan}
        styles={scannerStyles}
      />
    </div>
  );
}
