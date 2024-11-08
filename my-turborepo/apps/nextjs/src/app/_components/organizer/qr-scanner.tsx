"use client"

import { IDetectedBarcode, IScannerClassNames, IScannerStyles, Scanner } from '@yudiel/react-qr-scanner';
import { useState } from 'react';
import { Button } from '~/components/ui/button';

export default function QRScanner(
    props: { onScan: React.Dispatch<React.SetStateAction<string>> }
) {
    const [pauseScan, setPauseScan] = useState(true);
    const scannerStyles: IScannerStyles = {
        container: {
            width: "50%",
            height: "50%",
        }
    }

    const handleQRScan = (data: IDetectedBarcode[] | null) => {
        if (data && data[0] && data[0].rawValue) {
            try {
                const decodedData = atob(data[0].rawValue) as string;
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
        <div className='flex flex-col items-center gap-2 mb-40 max-w-4/5'>
            <Button className={"text-white hover:bg-opacity-50" + (pauseScan ? "bg-green-600" : "bg-red-600")}
                onClick={() => setPauseScan(!pauseScan)}>
                {pauseScan ? "Activate Scanner" : "Pause Scanner"}
            </Button>
            <Scanner onError={handleQRError} onScan={handleQRScan} paused={pauseScan} />
        </div>
    )
}
