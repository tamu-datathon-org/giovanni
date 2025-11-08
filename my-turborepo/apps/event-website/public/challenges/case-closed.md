# 🕵️ Case Closed: The AI Programming Challenge

**The grid is your crime scene. Every move leaves evidence. Every turn could be your last.**

Welcome to **Case Closed**, a high-stakes AI programming challenge where you’ll train intelligent Python agents to outthink, outmaneuver, and outlast their opponents in a fast-paced grid arena.

Every tick is a clue. Every direction, a decision. Move too fast, and you’ll collide with your own mistakes; move too slow, and your opponent will box you in.

Inspired by the classic **Tron Lightbike** game, your agents must navigate a 2D grid where every move leaves behind a permanent barrier. One wrong turn — and it’s *case closed.*

Will your code be the perfect detective — reading patterns, predicting danger, and solving the puzzle before it’s too late?
Or will it become just another unsolved mystery in the grid?

---

## 🎯 Objective

Design and train an **autonomous agent** that can survive longer than its opponent in a series of head-to-head matches.

Each tick, both agents simultaneously choose a direction (**up**, **down**, **left**, or **right**). Every cell they move through becomes a **wall** that cannot be crossed again—by either player.
The round ends when one or both agents collide with a wall or each other.

---

## ⚙️ Gameplay Details

- The arena is a **2x2 grid** (scalable to larger sizes in advanced rounds).
- Each agent’s move leaves a **trail** that acts as a barrier.
- Agents receive **state information** each tick (positions, remaining open spaces, opponent’s direction).
- **Colliding** with any trail means **instant elimination**.
- If both agents crash simultaneously, it’s a **draw**.

Each tick, your agent receives a **JSON payload** containing key details such as:
- Current position (your coordinates and your opponent’s)
- Board layout (walls, trails, open spaces)
- Available boosts and remaining turns
- Opponent’s last direction

---

## 🧠 Challenge Goals

- Develop a **Python-based AI agent** capable of strategic movement and survival.
- Experiment with **reinforcement learning**, **search algorithms**, or **heuristic logic** to maximize win rates.
- Optimize your agent for **adaptability**, **prediction**, and **efficient pathfinding** in confined environments.

---

## 💡 Helpful Tips

- Keep your `agent.py` logic **modular** — separate decision logic, state parsing, and move evaluation into helper functions.
- **Test performance locally** — timeouts or heavy computations can cause missed moves.
- If using ML or search algorithms, **cache repeated evaluations** to save computation time.
- Don’t forget to list **every dependency** in `requirements.txt` — missing one will break your submission.
- Always **test your container** before submitting.

---

## 📦 Submission Guidelines


- **agent.py** | Your agent’s main file. This is where your logic lives. **Do not rename or move this file.**
- **requirements.txt**  A list of every Python dependency your agent uses. The judge system installs these automatically.
- **Dockerfile (optional)** Only required if you modify dependencies beyond what’s supported or if you need a custom setup.
-  **(Optional) helper modules**  Any helper modules you wrote that are imported by `agent.py`. Keep them in the same folder.

---

**Good luck, detective.**
May your code uncover every clue — before time runs out.
