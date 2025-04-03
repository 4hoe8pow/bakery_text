# Bakery Text

A CUI-based bakery management game focused on inventory control, maintenance, security, hygiene, and cost optimisation.

## General Commands

- `help` : Display available commands for the current section.
- `ls`   : Observe the current state.
- `log`  : Check event logs for intrusions, breakdowns, or hygiene issues.
- `rest` : Allow employees to rest and recover from fatigue.

## NIGIWAI

- A 5-star rating system that affects demand and pricing:
  - ⭐️ 5.0: High demand, high prices, but expensive ingredients.
  - ⭐️ 0.0: Low demand, low prices, but cheap ingredients.
- NIGIWAI is influenced by:
  - ✅ Proper inventory & waste management
  - ✅ Effective intruder control & cleanliness
  - ✅ Stable production & high sales
  - ❌ Overcrowding, high waste rates
  - ❌ Persistent intruder presence (rats, thieves)
  - ❌ Customer complaints or refunds

## Sections & Commands

| ID  | Mode        | Abbr | Role                             | Management Commands (Admin Actions)                        | Title         |
| --- | ----------- | ---- | -------------------------------- | ---------------------------------------------------------- | ------------- |
| 00  | Purchasing  | PS   | Order and manage materials       | `order` (bulk purchase), `quote` (check price trends)        | Procurement   |
| 01  | Pantry      | PN   | Storage & shelf life tracking    | `rotate` (FIFO check), `audit` (spoilage check)              | Storage       |
| 02  | Mixing      | MX   | Monitor ingredient balance       | `adjust` (balance supply chain), `halt` (stop overproduction)  | Mixing        |
| 03  | Cooling     | CL   | Manage storage capacity          | `temp` (set cooling power), `expand` (upgrade storage)       | Cooling       |
| 04  | Shaping     | SH   | Manage efficiency & layout       | `layout` (optimise space), `inspect` (workflow check)        | Shaping       |
| 05  | Baking      | BK   | Maintain oven performance        | `repair` (fix issues), `fuel` (adjust power usage)           | Baking        |
| 06  | Packaging   | PK   | Ensure quality control           | `qc` (inspect batches), `speed` (adjust packaging rate)      | Packaging     |
| 07  | Sales Front | SF   | Optimise pricing & sales         | `price` (adjust rates), `promo` (trigger discounts)          | Sales         |
| 08  | Waste Station | WS | Handle waste & recycling         | `dispose` (clear expired goods), `recycle` (reduce costs)    | Disposal      |
| 09  | Utilities   | UT   | Manage water, electricity, gas   | `fix` (repair leaks), `budget` (set cost limits)             | Facilities    |

## Fatigue Management

- Employees do not show numerical fatigue levels. Instead, their status is displayed in logs:
  - 😊 “Looking energetic.”
  - 😐 “Seems a bit tired.”
  - 😫 “Moving slower than usual.”
  - 💀 “Eyes look lifeless…”
- Use `rest` to prevent overwork. However, excessive resting will reduce efficiency and impact the score.

## Intruders & Security

Intruders cause economic losses and hygiene risks. Monitor their presence via the **Event Log (EV)** and respond promptly.

| Type                          | Behaviour                                            | Counteraction                                              |
| ----------------------------- | ---------------------------------------------------- | ---------------------------------------------------------- |
| **Nezumi (Rats)** 🐭         | Consume stock, increase hygiene risk.              | `trap` (set traps), `sanitize` (clean infected areas)       |
| **Dorobō (Thieves)** 🏴‍☠️    | Steal money from the register.                     | `guard` (increase security), `alarm` (set up anti-theft system) |
| **Kureimā (Complainers)** 😡  | Demand refunds, lowering NIGIWAI.                  | `compensate` (settle issue), `policy` (set refund rules)     |

## Game Over Conditions

1. **Overwork**
   Employees collapsing due to excessive fatigue → **Game Over**.

2. **Health Department Violation**
   Failing to maintain hygiene (e.g., rats present too long) triggers an inspection → **Game Over**.

---

## Bread Recipes (Ingredients per Piece and Country of Origin)

| Type of Bread   | Country of Origin | Flour (g) | Yeast (g) | Salt (g) | Butter (g) | Sugar (g) | Milk (g) | Red Bean Paste (g) | Malt (g) |
| --------------- | ----------------- | --------: | --------: | -------: | ---------: | --------: | -------: | -----------------: | -------: |
| Croissant       | Austria           | 41.7      | 0.8       | 0.8      | 25.0       | 4.2       | 8.3      | 0.0                | 0.0      |
| Anpan           | Japan             | 50.0      | 0.9       | 1.0      | 3.8        | 6.3       | 12.5     | 25.0               | 0.0      |
| Baguette        | France            | 500.0     | 5.0       | 10.0     | 0.0        | 0.0       | 0.0      | 0.0                | 10.0     |
| Bagel           | Poland            | 62.5      | 0.9       | 1.3      | 0.0        | 1.3       | 0.0      | 0.0                | 1.9      |
| Ciabatta        | Italy             | 400.0     | 4.0       | 8.0      | 0.0        | 0.0       | 0.0      | 0.0                | 0.0      |
| Naan            | India             | 60.0      | 1.0       | 0.5      | 2.0        | 3.0       | 10.0     | 0.0                | 0.0      |
