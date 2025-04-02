# Bakery Text

A CUI-based bakery game. Use commands to bake bread while managing economic factors and fending off intruders.

## Gameplay

Manage multiple terminals, balance supply and demand, and protect your bakery from unwanted guests.
Aim for a high score by maintaining steady sales and efficient operations.

### Key Features:
- **Economic Simulation**: Prices and demand fluctuate based on the **"NIGIWAI" (Economic Tempo) ⭐️0.0~5.0**.
- **Inventory Management**: Maintain an optimal stock of bread while preventing shortages.
- **Tower Defense Mechanics**: Chase away intruders (`shoo` command) to prevent economic losses.

## NIGIWAI

- A 5-star rating system that affects demand and pricing:
  - ⭐️ 5.0: High demand, high prices, but expensive ingredients.
  - ⭐️ 0.0: Low demand, low prices, but cheap ingredients.
  - Demand drops if customers repeatedly find empty shelves.

## General Commands

- `help`: Display available commands for the current section.
- `ls`: Observe the current state.
- `mv`: Move ingredients or artifacts to another terminal.
- `shoo`: Chase away intruders.

## Sections

| ID  | Mode            | Abbr | Role                           | Commands             |
| --- | --------------- | ---- | ------------------------------ | -------------------- |
| 00  | Purchasing      | PS   | Order and manage materials     | `buy`                |
| 01  | Pantry          | PN   | Store ingredients              |                      |
| 02  | Mixing          | MX   | Mix ingredients to make dough  | `add`, `mix`         |
| 03  | Cooling         | CL   | Ferment and cool dough         | `pf`, `cl`           |
| 04  | Shaping         | SH   | Shape dough                    | `div`, `roll`        |
| 05  | Baking          | BK   | Bake dough                     | `bk`                 |
| 06  | Packaging       | PK   | Package bread                  | `pack`, `label`      |
| 07  | Quality Control | QC   | Check bread quality            | `inspect`, `report`  |
| 08  | Storage         | ST   | Store packaged bread           | `store`, `inv`       |
| 09  | Sales Front     | SF   | Sell bread                     | (Observer mode only) |
| 10  | Waste           | WS   | Handle waste                   | `dispose`            |
| 11  | Utilities       | UT   | Manage water, electricity, gas | (Observer mode only) |

## Intruders (Unwanted Guests)

Intruders frequently enter different sections and disrupt operations.
If left unchecked, they cause financial loss and product waste, reducing stock and leading to **missed sales opportunities**.

| Type      | Behavior |
|----------|----------|
| **Nezumi (Rats)** 🐭 | Nibble on bread, reducing available stock. |
| **Dorobō (Thieves)** 🏴‍☠️ | Steal money directly from the register. |
| **Kureimā (Complainers)** 😡 | Continuously demand refunds, reducing demand tempo. |

### How to Handle Intruders
- Use the `shoo` command in **Commander mode** to chase them away.
- Ignoring intruders results in **economic losses and product spoilage**.
- **Bonus:** Successfully shooing intruders can **increase customer trust**, boosting demand.

---

Stay vigilant, manage your inventory wisely, and fend off intruders to run a successful bakery! 🍞✨
