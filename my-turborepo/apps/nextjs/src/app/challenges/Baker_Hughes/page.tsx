//TODO: This is where all information of a single challenge should be displayed
// import Prize from "~/app/challenges/helpers/Prize";
import { Button } from "@vanni/ui/button";

import Title from "~/app/challenges/helpers/Title";
import Bold from "../helpers/Bold";
import Bullet from "../helpers/Bullet";
import Heading from "../helpers/Heading";
import Paragraph from "../helpers/Paragraph";

import "../../_components/customCss.scss";

import Image from "next/image";
import Link from "next/link";

export default function Challenge() {
  return (
    <div className="h-full w-full items-center justify-center bg-blue-200 p-4">
      <div className="rounded-lg border-4 bg-white/90 p-4">
        <a className="border-2 px-4 py-3" href="/challenges">
          Back
        </a>

        <Title>Baker Hughes Challenge</Title>
        <Heading>Background:</Heading>
        <Bullet
          items={[
            "A condition monitoring system that can track the health of an electric motor and its driven load (asset)",
            "Necessary sensors are installed on the asset to get 3 measurements at a time (assume the motor is powered by variable frequency drive): X1 (Frequency), X2 (Power), and Y (Vibration Level).",
            "After the asset and the monitoring system are in operation, the monitoring system will keep collecting the above measurements. The data collected in the first few weeks will be used as the baseline (training data), and the data collected after the baseline (prediction data) will be used to compare to the baseline data, the difference between them can reflect the health degradation.",
            "Technical approach: the training data is used to train the model:\n" +
              "f(X1_t, X2_t) = Y_t\n" +
              "where “f(*,*)” is the model function. “t” is “training”.\n",
            "Once the model is trained, for each prediction data (X1_p, X2_p and Y_p), X1_p and X2_p can be plugged into the model to get predicted Y_p_hat, then the difference between the predicted Y_p_hat and measured Y_p can be used to track health change.\n" +
              "“p” is “prediction”.\n",
            "During the first few weeks when the baseline is being established. A lot of data (3-measurements set) is collected (500,000 sets), but the global machine learning algorithm (which uses X1_t, X2_t and Y_t to find “f(*,*)”) is not very capable at handling large amount of data.",
          ]}
        />
        <Heading>Challenge:</Heading>
        <Bullet
          items={[
            "The challenge is to select 2,500 data sets from the original 500,000 sets to feed into the machine learning algorithm so that it can finish the training with limited resources within reasonable time.",
            "The goal is to design a data selecting algorithm only based on the input space (X1 and X2) measurements. The assumption is when multiple data sets are close enough for the input measurements, they should also have similar output measurement, meaning that they can be considered to have redundant info so only one of them is needed to be selected for the training.",
            "The X1 and X2 provided in the challenge are originally measured in “Hz” and “Watts” as the units. Then they are converted to per unit by normalization so that they become comparable.",
            "Selection #1: the selected data should cover the area where original data is covered. And the selected data should be distributed uniformly so that the covered regions can be trained equally.",
            "Selection #2: the selected data should still maintain a good level of coverage, while more data from the region where original data has high density should be selected. These high-density regions are the regions where the asset is mostly operated, so selecting more training data there can provide better training quality for these regions.",
          ]}
        />
        <Image
          src={"/challenges_assets/baker_hughes_table.png"}
          alt={"Baker Hughes Challenge Table"}
        />
        <Link
          href={
            "https://cdn.discordapp.com/attachments/1304883198450204754/1304883510657421432/Challenge_Info-20241109T185800Z-001.zip?ex=673102f8&is=672fb178&hm=24f1cfc382636bd3820c55fbdb527f17cb1f668ead032cb7505b220e43390896&"
          }
        />
      </div>
    </div>
  );
}
