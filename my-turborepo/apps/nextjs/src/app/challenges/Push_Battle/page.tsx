//TODO: This is where all information of a single challenge should be displayed
// import Prize from "~/app/challenges/helpers/Prize";
import Title from "~/app/challenges/helpers/Title";
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
          As a participant, you are tasked with the challenge of creating an AI that plays the game
          <a className="underline text-blue-600" href="https://visualizer.challenges.tamudatathon.com/" target="_blank"> Push Battle</a>.  We will provide you with the API for the game and some starter code. We encourage you to be creative and explore new ways of “solving” the game as you will be playing against the other participants in the competition.
        </Paragraph>

        <Heading>
          Important Links
        </Heading>

        <div className="flex flex-col gap-2 items-center justify-center pt-6">
          <a className="compStyling border border-black bg-[#f5f5f5] text-black hover:bg-[#e4e3e4] hover:text-black w-1/4 text-center"
            href="https://visualizer.challenges.tamudatathon.com/"
            target="_blank">Push Battle Visualizer</a>
          <a className="compStyling border border-black bg-[#f5f5f5] text-black hover:bg-[#e4e3e4] hover:text-black w-1/4 text-center"
            href="https://cdn.discordapp.com/attachments/1020473812422250606/1304874384825126963/Push_Battle_public-20241109T182246Z-001.zip?ex=6730fa78&is=672fa8f8&hm=c71b4a5f3479782d5a03e8bc8bfd08f6eba955c5371d94a8f2b832b4e5c85ee5&"
            target="_blank">Challenge Starter Code</a>
          <a className="compStyling border border-black bg-[#f5f5f5] text-black hover:bg-[#e4e3e4] hover:text-black w-1/4 text-center"
            href="https://www.youtube.com/watch?v=3trBRh9PEmM"
            target="_blank">Running Push Battle Locally Video</a>
          <a className="compStyling border border-black bg-[#f5f5f5] text-black hover:bg-[#e4e3e4] hover:text-black w-1/4 text-center"
            href="https://www.youtube.com/watch?v=x5Obcmm9IN4"
            target="_blank">Push Battle Rules Video</a>
        </div>

        <Heading>
          Rules of the Game
        </Heading>

        <Bullet items={[
          "Push Battle is a two player game played on an 8x8 grid",
          "Each player will have eight pieces where players take turn placing pieces on the board",
          "When a piece is placed on the board, all pieces adjacent to the placed piece are pushed away, unless there is another piece behind it preventing it from being pushed",
          "If a piece gets pushed off the side of the board it will appear directly on the other side of the board",
          "If all eight pieces are on the board, the player must pick up one of the pieces and move it to any other spot on the board",
          "Players win when three of their pieces are in a row"
        ]}
        />
        <Paragraph>
          A further explanation of the rules of the game can be found <a href='https://www.youtube.com/watch?v=x5Obcmm9IN4'>here</a>.
        </Paragraph>
        <Heading>
          Board
        </Heading>
        <Paragraph>
          The board will be represented by an 8x8 2D array. In the placement stage of the game, the player places a piece on the board at [r, c].
          Once all checkers have been placed, the player will make a move [r0, c0, r1, c1] which moves one of their existing pieces at (r0, c0) to (r1, c1).
          <br></br>

          For readability purposes,the moves will be displayed on the visualizer in <a href="https://en.wikipedia.org/wiki/Algebraic_notation_(chess)">algebraic notation</a>.
        </Paragraph>

        <Heading>
          Restrictions
        </Heading>

        <Bullet items={[
          "Agents will be given 5 seconds to make a move. If the time limit is exceeded, agents will be given another 5 seconds to make a fallback move. If the time limit is exceeded again, a random move will be made for the agent. If this occurs 5 times, the agent will forfeit. ",
          "If your agent makes an invalid move (i.e. placing a piece out of bounds or on an existing piece, attempting to move an opponent's piece, etc.), it will immediately forfeit (lose) the game",
          "No network access",
          "1 CPU Core",
          "1 GB RAM",
          "1 GB VRAM"
        ]}
        />
        <br></br>

        <Heading>
          Webhooks
        </Heading>
        <Paragraph>

          All webhooks are included in the starter code. Please consult that if you plan to make your own API or if you are unsure of how they work.
        </Paragraph>

        <Heading>
          Submission
        </Heading>

        Download <a className="underline text-blue-600" href='https://drive.google.com/drive/folders/1i73nDhObfPq6-oI3DphWMRaYwgbGUUAz?usp=drive_link'>the starter code here</a>.
        You will be exposing an API endpoint that makes a move given a game state. You must modify `start_game()` and `make_move()` to fit your implementation.
        <Bullet items={[
          "start_game() will instantiate your model",
          "make_move() will be called when it is your model's turn to make a move. It will accept a game state and return a move"
        ]}
        />
        <br></br>
        <Heading>
          How it works:
        </Heading>
        <Paragraph>
          When the game begins, the judge will send a POST request to your agent with the initial game state. You will receive information about the game, the board, if you have the first turn, and the maximum amount of latency you can expect before a timeout.
        </Paragraph>

        <Paragraph>
          After submitting, your agent will be placed in a pool where it will continuously play agents from other team where its performance will be scored using an ELO system.
        </Paragraph>


        <Heading>
          Testing
        </Heading>

        <Paragraph>
          You will be given the game and the judge so that you can test locally. We strongly advise that you test locally before submitting to Richter. Please view
          <a className="underline text-blue-600" href="https://youtu.be/3trBRh9PEmM"> this</a> video for guidance on how to run locally.
        </Paragraph>

        <Heading>
          Reading the Game String
        </Heading>
        <Paragraph>
          The game string is a list of all the events that took place during the game. Each is preceded with a dash followed by the alphanumeric value of where the piece was placed or moved.
          If the move ends with an r (ex. -c4r or -c4b3r), that means the agent timed out and a random move was placed. If the move is a q (ex. -q) that means that the player forfeited.
          Players forfeit either due to using too many random moves or making an invalid move as described earlier.
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
            "Can learn complex positional concepts but require significant training data/compute"
          ]} />

        <Heading>
          Resources
        </Heading>

        <Bullet items={[
          "https://sites.google.com/view/lazyy/home",
          "https://www.neverstopbuilding.com/blog/minimax",
          "https://www.lancaster.ac.uk/stor-i-student-sites/jordan-j-hood/2021/04/18/reinforcement-learning-the-end-game/"
        ]}
        />
        <Heading>Prizes!!!</Heading>
        <Prizes
          prizes={[
            { name: "iPad", img_url: "/prizes/ipad.png" },
            { name: "Wacom Tablet", img_url: "/prizes/drawing_tablet.jpg" },
            { name: "Fujifilm Instax Mini", img_url: "/prizes/polaroid.webp" },
          ]}
        />
      </div>
    </div>
  );
}
