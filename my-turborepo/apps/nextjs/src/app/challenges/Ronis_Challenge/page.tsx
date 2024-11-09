//TODO: This is where all information of a single challenge should be displayed
// import Prize from "~/app/challenges/helpers/Prize";
import Title from "~/app/challenges/helpers/Title";
import Heading from "../helpers/Heading";
import Paragraph from "../helpers/Paragraph";
import Bullet from "../helpers/Bullet";
import Link from "next/link";
import "../../_components/customCss.scss";
import Prizes from "../helpers/Prizes";

export default function Challenge() {


  return (
    <div className="w-full h-full justify-center p-4 bg-blue-200">

      <div className="bg-white/90 rounded-lg border-4 p-4">

        <a className="px-4 py-3 border-2" href="/challenges">Back</a>

        <Title className="mt-8">
          Roni's Challenge: Dashboard Building for Business Insights
        </Title>

        <Heading>
          Roni's Challenge Data
        </Heading>
        <Paragraph>
          <Link href={'https://drive.google.com/drive/folders/1sNmQDZFnoqqso5eC14SnxVodiu8cB_gq'}>Link to data here</Link>
        </Paragraph>

        <Heading className="mt-6">
          Challenge Overview
        </Heading>

        <Paragraph>
          In this challenge, participants will design and develop a data-driven dashboard to help <b>Roni's Mac Bar</b>, a local Texas business with a location in College Station, gain valuable insights into their operations. The goal is to create a user-friendly, business-facing dashboard that provides actionable insights into customer preferences, order efficiency, and overall business performance.
        </Paragraph>

        <Heading>
          Data Description
        </Heading>

        <Paragraph>
          You have been provided with the following dataset:
          <Bullet items={[
            "A detailed log of every order made at the College Station location during the months of May to October"
          ]} />

        </Paragraph>

        <Heading>
          Challenge Objectives
        </Heading>

        <Paragraph>
          Participants will:
          <ol className="list-decimal pl-4">
            <li>
              <b>Analyze the Data:</b> Explore the provided datasets to extract meaningful patterns, trends, and correlations.</li>
            <li>
              <b>Develop a Dashboard:</b> Build an intuitive and interactive dashboard that displays key insights. The dashboard should aim to improve Roni's understanding of their business operations.</li>
            <li>
              <b>Provide Insights:</b> Use the dashboard to potentially answer questions such as:
              <ul className="list-disc list-outside [&_ul]:list-[revert] pl-5">
                <li>What are the most popular menu items?
                  <ul className="pl-5">
                    <li>Signature “Aggie” Bowl based on popularity</li>
                  </ul>
                </li>
                <li>Are there any seasonal (days of week, month) trends or peaks in demand?</li>
                <li>How can Roni's optimize meal preparation based on efficiency logs?</li>
                <li>Are there any bottlenecks or delays in the meal preparation process?</li>
              </ul>
            </li>
            <li>
              <b>Optional Enhancements:</b> Enhance the dashboard by integrating forecasting models, trend analyses, or other advanced analytics to support decision-making.
            </li>
          </ol>

        </Paragraph>

        <Heading>
          Requirements
        </Heading>

        <Paragraph>
          <ul className="list-disc list-outside [&_ul]:list-[revert] pl-5">
            <li>
              <b>Programming Language: </b>Participants are free to use any programming language or tool of their choice (e.g., Python, JavaScript, Power BI, Tableau). No-code and low-code solutions are also welcome for beginners.
            </li>
            <li>
              <b>Data Visualization: </b>Use appropriate charts, graphs, and tables to present insights clearly and effectively.
            </li>
            <li>
              <b>Dashboard Features:</b>
              <ul className="pl-5">
                <li>An overview of key metrics such as total sales, popular items, and efficiency scores.</li>
                <li>A section for deep-diving into customer preferences and order trends.</li>
                <li>A section analyzing meal preparation times, highlighting areas for improvement.</li>
              </ul>
            </li>
          </ul>
        </Paragraph>

        <Heading>
          Inputs and Outputs
        </Heading>

        <Paragraph>
          <ul className="list-disc list-outside [&_ul]:list-[revert] pl-5">
            <li>
              <b>Inputs: </b>Three datasets (Sheet A, Sheet B, and Sheet C).
            </li>
            <li>
              <b>Outputs: </b>An interactive, business-facing dashboard that helps Roni's Mac Bar gain insights into customer behavior and operational efficiency.
            </li>
          </ul>
        </Paragraph>

        <Heading>
          Evaluation Criteria
        </Heading>

        <Paragraph>
          The dashboards will be evaluated by a judging panel based on the following criteria:
          <ul className="list-disc list-outside [&_ul]:list-[revert] pl-5">
            <li>
              <b>Data Insights: </b>The depth and accuracy of the insights presented from the data.
            </li>
            <li>
              <b>Usability: </b>How intuitive and user-friendly the dashboard is for business users.
            </li>
            <li>
              <b>Design and Visual Appeal</b>Aesthetics and the clarity of data presentation.
            </li>
            <li>
              <b>Innovation: </b>Creativity in the approach, such as incorporating predictive analytics or optimization suggestions.
            </li>
            <li>
              <b>Technical Execution: </b>Was the data correctly cleaned and processed?
            </li>
          </ul>
        </Paragraph>

        <Heading>
          Resources
        </Heading>

        <Paragraph>
          Participants can use the following resources:
          <ul className="list-disc list-outside [&_ul]:list-[revert] pl-5">
            <li>
              <b>Data Visualization Libraries: </b>Tools such as Matplotlib, Seaborn, Plotly, or D3.js for coding solutions.
            </li>
            <li>
              <b>Dashboarding Tools: </b>Power BI, Tableau, or Google Data Studio for low-code and no-code dashboards.
            </li>
            <li>
              <b>Machine Learning/Analytics:</b>Optional use of tools like scikit-learn, statsmodels, or Prophet for forecasting and trend analysis.
            </li>
          </ul>
        </Paragraph>

        <Heading>
          Submission Guidelines
        </Heading>

        <Paragraph>
          Participants should submit:
          <ul className="list-disc list-outside [&_ul]:list-[revert] pl-5">
            <li>
              <b>Source code </b>(if applicable) in a zipped folder or a GitHub repository.
            </li>
            <li>
              <b>Dashboard files</b> if created in a tool like Power BI or Tableau.
            </li>
            <li>
              <b>A README</b> explaining the dashboard functionality and setup instructions (if any).
            </li>
            <li>
              <b>A brief report</b> (1-2 minute) video explaining functionality.
            </li>
          </ul>
        </Paragraph>
        <Heading>Prizes!!!</Heading>
        <Prizes
          prizes={[
            { name: "Logitech Mouse", img_url: "/prizes/mouse.jpg" },
            { name: "Anker Speaker", img_url: "/prizes/anker_speaker.jpg" },
          ]}
        />
        <div className="flex items-center justify-center pt-6">
          <a className="compStyling border border-black bg-[#f5f5f5] text-black hover:bg-[#e4e3e4] hover:text-black w-1/4 text-center" href="https://cdn.discordapp.com/attachments/1020473812422250606/1304874385257271327/Ronis_Challenge_public-20241109T181440Z-001.zip?ex=6730fa78&is=672fa8f8&hm=103589c2c58dcfa0b6620d54e76f2a5575f7e6d8a6673a4af7512cde35541a4b&" target="_blank">Get Data</a>
        </div>

      </div>

    </div>
  );
}
