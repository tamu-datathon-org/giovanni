"use client"
import { Button } from "~/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "~/components/ui/dialog"
import React from 'react';

type PDFReaderProps = {
    pdfButtonTitle: string,
    pdfTitle: string,
    pdfUrl: string,
}

export default function PDFReader(props: PDFReaderProps) {
    return (
        <Dialog>
            < DialogTrigger asChild >
                <Button variant="secondary" className="bg-white text-black">Resume: {props.pdfButtonTitle}</Button>
            </DialogTrigger >
            <DialogContent className="max-w-[60vw] max-h-[90vh]">
                <DialogHeader>
                    <DialogTitle>{props.pdfTitle}</DialogTitle>
                </DialogHeader>
                {/* Body */}
                <div className="h-[80vh]">
                    <iframe src={props.pdfUrl} width='100%' height='100%' title={props.pdfTitle} />
                </div>
            </DialogContent>
        </Dialog >
    )
}