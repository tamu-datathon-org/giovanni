//TODO: This is where all information of a single challenge should be displayed
// import Prize from "~/app/challenges/helpers/Prize";
import Title from "~/app/challenges/helpers/Title";
import Bold from "../helpers/Bold";
import Bullet from "../helpers/Bullet";
import Heading from "../helpers/Heading";
import Paragraph from "../helpers/Paragraph";

import "../../_components/customCss.scss";

import Prizes from "~/app/challenges/helpers/Prizes";

export default function Challenge() {
  return (
    <div className="h-full w-full justify-center bg-blue-200 p-4">
      <div className="rounded-lg border-4 bg-white/90 p-4">
        <a
          className="compStyling border border-black bg-[#f5f5f5] px-4 py-3 text-black hover:bg-[#e4e3e4] hover:text-black"
          href="/challenges"
        >
          Back
        </a>
        <Title className="mt-6">Push Battle</Title>
        <Heading>Background</Heading>
        <Paragraph>
          The challenge of creating agents that can play games at an expert
          level is a central problem in the field of Artificial Intelligence
          (AI). In recent years, breakthroughs in this area have resulted in AI
          agents mastering complex games like Chess, Go, and StarCraft,
          achieving superhuman levels of play as well as the ability to learn
          and adapt over time.
        </Paragraph>
        <Heading>Task</Heading>
        <Paragraph>
          As a participant we would like you to “solve” this game
          <a
            className="text-blue-600 underline"
            href="https://mymathapps.com/mymacalc-sample/MathCircleApps/2PGames/PopTacToe/PopTacToe.html"
            target="_blank"
          >
            {" "}
            Push Battle
          </a>{" "}
          to the best of your abilities. You will be given the board state, and
          you will have to make the best move possible in order to ensure your
          success. We will provide you with the API for the game and some
          starter code. We encourage you to be creative and explore new ways of
          “solving” the game as you will be playing against the other
          participants in the competition.
        </Paragraph>
        <Heading>Rules of the Game</Heading>
        <Bullet
          items={[
            "Pop Tac Toe is a two player game played on an 8x8 grid",
            "Each player will have eight pieces where players take turn placing pieces on the board",
            "When a piece is placed on the board, all pieces adjacent to the placed piece are pushed away, unless there is another piece behind it preventing it from being pushed",
            "If a piece gets pushed off the side of the board it will appear directly on the other side of the board",
            "If all eight pieces are on the board, the player must pick up one of the pieces and move it to any other spot on the board",
            "Players win when three of their pieces are in a row",
          ]}
        />
        <Heading>Board</Heading>
        <Paragraph>
          The board will be represented by an 8x8 2D array. Spaces on the board
          will be labeled in a similar fashion to chess. This means that each
          column is represented with A-H and each row is represented with 0-7.
        </Paragraph>
        <Heading>Implementation Algorithms</Heading>
        Common ways to use algorithms to solve games are as follows:
        <br />
        <br />
        <b>Heuristic Algorithms</b> - finding sets of rules that work generally
        well. Entirely heuristic approaches are weaker than the methods below,
        but perform far better than picking random moves. As some form of
        heuristics will be used in most of the below approaches, they are still
        important to understand.
        <br />
        <br />
        <b>Minimax </b> - One player's gain is another player's loss. Utilizes a
        search tree in order to find the moves with the most loss for the
        opponent and the most gain for yourself.
        <Bullet
          items={[
            "Alpha-Beta Pruning - An optimization to minimax. It limits the number of nodes that are evaluated in the search tree",
          ]}
        />
        <br />
        <br />
        <b>Monte Carlo Tree Search (MCTS) </b> - Builds a search tree using
        random sampling. Random simulation of games and expands search paths for
        most promising moves based on previous results. Works very well for
        grid-based games with turns (e.g. AlphaGo).
        <br />
        <br />
        <b>Reinforcement Learning </b> - Simulates many games and uses neural
        networks in order to predict which moves are the best.
        <Bullet items={["Q-learning", "DQNs", "Policy Gradient methods"]} />
        <br />
        <br />
        <b>Evolutionary Algorithms </b> - evolve agents over many generations,
        simulating natural selection to improve strategies. A population of
        agents (with different strategies) plays against each other. The highest
        performing ones create the next generation, often by combining
        strategies and introducing random mutations.
        <br />
        <br />
        <b>Neural Networks </b> - Learn to evaluate board positions and predict
        optimal moves through pattern recognition. Key approaches include:.
        <Bullet
          items={[
            "Supervised Learning: Train on databases of expert games to mimic strong players",
            "Deep Convolutional Networks: Process the board as a grid to detect spatial patterns",
            "Policy Networks: Output probability distributions over possible moves",
            "Value Networks: Evaluate how good a position is",
            "Often combined with other methods like MCTS (as in AlphaZero) or reinforcement learning",
            "Can learn complex positional concepts but require significant training data/compute",
          ]}
        />
        <Heading>Restrictions</Heading>
        <Bullet
          items={[
            "Agents must make a move within 5 seconds or else a fallback move will be attempted",
            "Any invalid moves will result in a forfeit",
            "No network access",
            "1 CPU Core",
            "1 GB RAM",
            "1 GB VRAM",
          ]}
        />
        <Heading>Resources</Heading>
        <Bullet
          items={[
            "https://sites.google.com/view/lazyy/home",
            "https://www.neverstopbuilding.com/blog/minimax",
            "https://www.lancaster.ac.uk/stor-i-student-sites/jordan-j-hood/2021/04/18/reinforcement-learning-the-end-game/",
          ]}
        />
        <Heading>Submission</Heading>
        Users will submit their model and all code in a zip file called
        agent.zip. We will provide starter code for how to run your agent. Your
        agent will use a Flask application to send and receive moves from the
        server. It will receive moves from a function called receive_move, and
        it will send moves from a function called send_move. The receiving
        function will have the agent receive a board state in the form of a 2D
        array. The sending function will have the agent send their move.
        <br />
        <br />
        <b>Webhooks</b>
        <pre>
          "GET /"
          <br />
          &#123;
          <br />
          "Team": "&lt;TEAM_NAME&gt;",
          <br />
          "Agent": "&lt;AGENT_NAME&gt;"
          <br />
          &#125;
        </pre>
        <pre>
          <br />
          <br />
          "POST /start"
          <br />
          &#123;
          <br />
          "game": "&lt;GAME_ID&gt;",
          <br />
          "turn": "&lt;TURN_NO&gt;"
          <br />
          "board": "[[]]"
          <br />
          &#125;
        </pre>
        <br />
        <br />
        <pre>
          "POST /move"
          <br />
          &#123;
          <br />
          "move_row": "x",
          <br />
          "move_col": "y"
          <br />
          &#125;
        </pre>
        <br />
        <br />
        <pre>
          "POST /end"
          <br />
          &#123;
          <br />
          "game": "&lt;GAME_ID&gt;",
          <br />
          "turn": "&lt;TURN_NO&gt;"
          <br />
          "board": "[[]]"
          <br />
          &#125;
        </pre>
        <Heading>Testing</Heading>
        <Paragraph>
          There will be a testing api provided at this endpoint: /test. By
          sending a POST /start request to the endpoint, it will create a game
          with your agent. This is a test game, and the opponent will play
          random valid moves. This environment will allow you to see if your
          model makes any incorrect moves or goes over the time constraint.
          <br />
          <br />
          Example: Initialize a test game with POST /test/start The game will
          then proceed with your agent sending moves via send_move() and
          receiving moves via receive_move()
        </Paragraph>
        <Heading>Grading</Heading>
        <Paragraph>
          After submitting, your agent(s) will be placed in a pool where a round
          robin tournament will take place. Each agent will play every other
          agent twice, once as player one and once as player two. Wins and
          losses will be tallied for each agent throughout the course of the
          round robin.
          <br />
          <br />
          After the round robin tournament has concluded, the top n agents in
          terms of wins will compete in a double elimination tournament. The
          agents will be paired by seed (ex. Seed 1 plays seed n). They will
          play twice, once as player one and once as player two. If a tiebreaker
          is needed, it will go to the higher seed. This final tournament will
          determine the first, second, and third place winners.
        </Paragraph>
        <div className="flex flex-col items-center justify-center gap-2 pt-6">
          <a
            className="compStyling w-1/4 border border-black bg-[#f5f5f5] text-center text-black hover:bg-[#e4e3e4] hover:text-black"
            href="https://cdn.discordapp.com/attachments/1020473812422250606/1304874384825126963/Push_Battle_public-20241109T182246Z-001.zip?ex=6730fa78&is=672fa8f8&hm=c71b4a5f3479782d5a03e8bc8bfd08f6eba955c5371d94a8f2b832b4e5c85ee5&"
            target="_blank"
          >
            Challenge Data
          </a>
          <a
            className="compStyling w-1/4 border border-black bg-[#f5f5f5] text-center text-black hover:bg-[#e4e3e4] hover:text-black"
            href="https://www.youtube.com/watch?v=3trBRh9PEmM"
            target="_blank"
          >
            Running Push Battle Locally
          </a>
          <a
            className="compStyling w-1/4 border border-black bg-[#f5f5f5] text-center text-black hover:bg-[#e4e3e4] hover:text-black"
            href="https://www.youtube.com/watch?v=x5Obcmm9IN4"
            target="_blank"
          >
            Push Battle Rules Video
          </a>
        </div>
        <Prizes
          prizes={[
            { name: "iPad" },
            { name: "Wacom Tablet" },
            { name: "Polaroid" },
          ]}
        />
      </div>
    </div>
  );
}
