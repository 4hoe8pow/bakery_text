use bevy::prelude::*;
use rand::Rng;

use crate::bt_resources::{
    market::{Ingredient, Market},
    timers::WorldTimer,
};

pub fn update_market_prices(
    time: Res<Time>,
    mut timer: ResMut<WorldTimer>,
    mut market: ResMut<Market>,
) {
    if timer.0.tick(time.delta()).just_finished() {
        let mut rng = rand::rng();
        let tolerance_rate = market.nigiwai / 100.;

        for ingredient in [
            Ingredient::Flour,
            Ingredient::Salt,
            Ingredient::Sugar,
            Ingredient::Butter,
            Ingredient::Yeast,
        ] {
            let current_price = match ingredient {
                Ingredient::Flour => market.flour_price,
                Ingredient::Salt => market.salt_price,
                Ingredient::Sugar => market.sugar_price,
                Ingredient::Butter => market.butter_price,
                Ingredient::Yeast => market.yeast_price,
            };
            let fluctuation = if tolerance_rate == 0. {
                0.
            } else {
                rng.random_range(-tolerance_rate..tolerance_rate)
            };

            market.update_price(ingredient, current_price * (1. + fluctuation));
        }
    }
}
