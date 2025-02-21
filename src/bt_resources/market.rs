use std::{fmt, str::FromStr};

use bevy::prelude::*;
use rand::seq::IndexedRandom;

#[derive(Debug)]
pub enum Ingredient {
    Flour,
    Salt,
    Sugar,
    Butter,
    Yeast,
}

impl FromStr for Ingredient {
    type Err = ();

    fn from_str(input: &str) -> Result<Ingredient, Self::Err> {
        match input.to_lowercase().as_str() {
            "flour" => Ok(Ingredient::Flour),
            "salt" => Ok(Ingredient::Salt),
            "sugar" => Ok(Ingredient::Sugar),
            "butter" => Ok(Ingredient::Butter),
            "yeast" => Ok(Ingredient::Yeast),
            _ => Err(()),
        }
    }
}

#[derive(Resource)]
pub struct Market {
    pub nigiwai: f32,
    pub flour_quantity: f32,
    pub flour_price: f32,
    pub salt_quantity: f32,
    pub salt_price: f32,
    pub sugar_quantity: f32,
    pub sugar_price: f32,
    pub butter_quantity: f32,
    pub butter_price: f32,
    pub yeast_quantity: f32,
    pub yeast_price: f32,
}

impl Default for Market {
    fn default() -> Self {
        Self {
            nigiwai: 1.,
            flour_quantity: 1000000.,
            flour_price: 100.,
            salt_quantity: 1000000.,
            salt_price: 100.,
            sugar_quantity: 1000000.,
            sugar_price: 100.,
            butter_quantity: 1000000.,
            butter_price: 100.,
            yeast_quantity: 1000000.,
            yeast_price: 100.,
        }
    }
}

impl Market {
    pub fn restock(&mut self, ingredient: Ingredient, quantity: f32) {
        match ingredient {
            Ingredient::Flour => self.flour_quantity += quantity,
            Ingredient::Salt => self.salt_quantity += quantity,
            Ingredient::Sugar => self.sugar_quantity += quantity,
            Ingredient::Butter => self.butter_quantity += quantity,
            Ingredient::Yeast => self.yeast_quantity += quantity,
        }
    }

    pub fn purchase(&mut self, ingredient: &Ingredient, quantity: f32) -> Result<(), &'static str> {
        match ingredient {
            Ingredient::Flour => {
                if self.flour_quantity < quantity {
                    Err("Not enough flour in stock.")
                } else {
                    self.flour_quantity -= quantity;
                    Ok(())
                }
            }
            Ingredient::Salt => {
                if self.salt_quantity < quantity {
                    Err("Not enough salt in stock.")
                } else {
                    self.salt_quantity -= quantity;
                    Ok(())
                }
            }
            Ingredient::Sugar => {
                if self.sugar_quantity < quantity {
                    Err("Not enough sugar in stock.")
                } else {
                    self.sugar_quantity -= quantity;
                    Ok(())
                }
            }
            Ingredient::Butter => {
                if self.butter_quantity < quantity {
                    Err("Not enough butter in stock.")
                } else {
                    self.butter_quantity -= quantity;
                    Ok(())
                }
            }
            Ingredient::Yeast => {
                if self.yeast_quantity < quantity {
                    Err("Not enough yeast in stock.")
                } else {
                    self.yeast_quantity -= quantity;
                    Ok(())
                }
            }
        }
    }

    pub fn update_price(&mut self, ingredient: Ingredient, price: f32) {
        match ingredient {
            Ingredient::Flour => self.flour_price = price,
            Ingredient::Salt => self.salt_price = price,
            Ingredient::Sugar => self.sugar_price = price,
            Ingredient::Butter => self.butter_price = price,
            Ingredient::Yeast => self.yeast_price = price,
        }
    }

    pub fn calculate_cost(&self, ingredient: &Ingredient, quantity: f32) -> f32 {
        match ingredient {
            Ingredient::Flour => self.flour_price * quantity,
            Ingredient::Salt => self.salt_price * quantity,
            Ingredient::Sugar => self.sugar_price * quantity,
            Ingredient::Butter => self.butter_price * quantity,
            Ingredient::Yeast => self.yeast_price * quantity,
        }
    }
}

impl fmt::Display for Market {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        writeln!(f, "Good morning! Here is today's market update.")?;

        let mut rng = rand::rng();

        let tension_message = match self.nigiwai {
            0.0..=1.0 => LOW_TENSION.choose(&mut rng).unwrap(),
            1.0..=2.0 => MEDIUM_LOW_TENSION.choose(&mut rng).unwrap(),
            2.0..=3.0 => MEDIUM_TENSION.choose(&mut rng).unwrap(),
            3.0..=4.0 => MEDIUM_HIGH_TENSION.choose(&mut rng).unwrap(),
            _ => HIGH_TENSION.choose(&mut rng).unwrap(),
        };
        writeln!(f, "{}", tension_message)?;
        writeln!(f, "Here are the prices and stock levels of each product.\n")?;
        writeln!(f, "Product\t\tPrice\t\tQuantity")?;
        writeln!(f, "---------------------------------")?;
        writeln!(
            f,
            "Flour\t\t{:.2}\t\t{:.2}",
            self.flour_price, self.flour_quantity
        )?;
        writeln!(
            f,
            "Salt\t\t\t{:.2}\t\t{:.2}",
            self.salt_price, self.salt_quantity
        )?;
        writeln!(
            f,
            "Sugar\t\t{:.2}\t\t{:.2}",
            self.sugar_price, self.sugar_quantity
        )?;
        writeln!(
            f,
            "Butter\t\t{:.2}\t\t{:.2}",
            self.butter_price, self.butter_quantity
        )?;
        writeln!(
            f,
            "Yeast\t\t{:.2}\t\t{:.2}",
            self.yeast_price, self.yeast_quantity
        )?;
        writeln!(f, "---------------------------------")?;
        Ok(())
    }
}

// Tension-based messages

const LOW_TENSION: &[&str] = &[
    "A cat is napping by the window.",
    "Nothing unusual is happening.",
    "It's raining heavily.", // ...other sentences...
];

const MEDIUM_LOW_TENSION: &[&str] = &[
    "It's peaceful.",
    "A gentle breeze is blowing.",
    "It's drizzling.",
    // ...other sentences...
];

const MEDIUM_TENSION: &[&str] = &[
    "Let's have a great day!",
    "The town is filled with smiles.",
    "It's bustling with energy.",
    // ...other sentences...
];

const MEDIUM_HIGH_TENSION: &[&str] = &[
    "You can feel the heat.",
    "It's a bright sunny day.",
    // ...other sentences...
];

const HIGH_TENSION: &[&str] = &[
    "Yay!!!",
    "There's no greater happiness!",
    "Woohoo!!!",
    // ...other sentences...
];
