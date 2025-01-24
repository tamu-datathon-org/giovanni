import { Application } from "@vanni/db/schema";

import type { TableData } from "./schema";
import { Card, CardContent } from "~/components/ui/card";
import PDFReader from "./pdf-reader";

interface CardInformationProps {
  children: React.ReactNode;
}

const CardInformation: React.FC<CardInformationProps> = ({ children }) => {
  return (
    <Card>
      <CardContent className="flex flex-col gap-1 text-wrap px-2 py-2">
        {children}
      </CardContent>
    </Card>
  );
};

interface InformationProps {
  application: TableData;
}

export const StatusInformation: React.FC<InformationProps> = ({
  application,
}) => {
  return (
    <CardInformation>
      <CardContent className="flex flex-col gap-1 px-2 py-2">
        <p>
          <span className="font-bold">Status:</span> {application.status}
        </p>
        <p>
          <span className="font-bold">Created At:</span>{" "}
          {application.createdAt.toLocaleDateString()}
        </p>
        <p>
          <span className="font-bold">Updated At:</span>{" "}
          {application.updatedAt.toLocaleDateString()}
        </p>
        <p>
          <span className="font-bold">MLH Consent:</span>{" "}
          {application.mlhEmailConsent ? "Yes" : "No"}
        </p>
      </CardContent>
    </CardInformation>
  );
};

// Personal Info: First, Last, Age, Country, Race, Phone #, shirt size, event source
export const PersonalInformation: React.FC<InformationProps> = ({
  application,
}) => {
  return (
    <CardInformation>
      <p>
        <span className="font-bold">First Name:</span> {application.firstName}
      </p>
      <p>
        <span className="font-bold">Last Name:</span> {application.lastName}
      </p>
      <p>
        <span className="font-bold">Email:</span> {application.email}
      </p>
      <p>
        <span className="font-bold">Age:</span> {application.age}
      </p>
      <p>
        <span className="font-bold">Country:</span> {application.country}
      </p>
      <p>
        <span className="font-bold">Race:</span> {application.race}
      </p>
      <p>
        <span className="font-bold">Phone Number:</span>{" "}
        {application.phoneNumber}
      </p>
      <p>
        <span className="font-bold">Shirt Size:</span> {application.shirtSize}
      </p>
      <p>
        <span className="font-bold">Event Source:</span>{" "}
        {application.eventSource}
      </p>
      <p>
        <span className="font-bold">Dietary Restrictions:</span>{" "}
        {application.dietaryRestriction}
      </p>
    </CardInformation>
  );
};

export const ReponseInformation: React.FC<InformationProps> = ({
  application,
}) => {
  return (
    <>
      <CardInformation>
        <p>
          <span className="font-bold">References:</span>{" "}
          {application.references}
        </p>
        <p>
          <span className="font-bold">Interests One:</span>{" "}
          {application.interestOne}
        </p>
        <p>
          <span className="font-bold">Interests Two:</span>{" "}
          {application.interestTwo}
        </p>
        <p>
          <span className="font-bold">Interests Three:</span>{" "}
          {application.interestThree}
        </p>
        <p>
          <span className="font-bold">Extra Info:</span> {application.extraInfo}
        </p>
      </CardInformation>
      {application.resumeName && application.resumeUrl && (
        <PDFReader
          pdfTitle="Resume"
          pdfButtonTitle={application.resumeName}
          pdfUrl={application.resumeUrl}
        />
      )}
    </>
  );
};

// School related: school, major, grad year
export const SchoolInformation: React.FC<InformationProps> = ({
  application,
}) => {
  return (
    <CardInformation>
      <p>
        <span className="font-bold">School:</span> {application.school}
      </p>
      <p>
        <span className="font-bold">Major:</span> {application.major}
      </p>
      <p>
        <span className="font-bold">Classification:</span>{" "}
        {application.classification}
      </p>
      <p>
        <span className="font-bold">Graduation Year:</span>{" "}
        {application.gradYear}
      </p>
    </CardInformation>
  );
};
