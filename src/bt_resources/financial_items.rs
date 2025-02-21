use bevy::prelude::*;

#[derive(Resource)]
pub struct Wallet {
    pub cash: f64,
}

impl Default for Wallet {
    fn default() -> Self {
        Self { cash: 10000.0 }
    }
}

impl Wallet {
    pub fn update_cash(&mut self, amount: f64) {
        self.cash += amount;
    }

    pub fn deduct_cash(&mut self, amount: f64) -> Result<(), &'static str> {
        if self.cash < amount {
            Err("Not enough cash in wallet.")
        } else {
            self.cash -= amount;
            Ok(())
        }
    }
}
