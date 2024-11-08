//TODO: This is where all information of a single challenge should be displayed
// import Prize from "~/app/challenges/helpers/Prize";
import Title from "~/app/challenges/helpers/Title";

export default function Challenge() {
  //TODO: Get XML data, and based on that data, automatically generate which components are going to be used

  return (
    <div className="w-11/12 h-screen flex flex-col justify-center items-center">
      <Title>Pop Tac Toe</Title>
      {/* <Prize></Prize>; */}
    </div>
  );
}
