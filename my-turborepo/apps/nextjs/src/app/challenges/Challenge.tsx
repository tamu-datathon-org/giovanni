//TODO: This is where all information of a single challenge should be displayed
import Prize from "~/app/challenges/helpers/Prize";
import Title from "~/app/challenges/helpers/Title";

export default function Challenge(xmlName: string) {
  //TODO: Get XML data, and based on that data, automatically generate which components are going to be used

  return (
    <>
      <Title title={"Ligma"} />
      <Prize prizeName={"$19 Fortnite Card"} />;
    </>
  );
}
