use bevy::prelude::*;

use crate::bt_components::bakery_terminal::Repository;

#[derive(Event)]
pub struct Transportation {
    pub from_term_id: u8,
    pub to_term_id: u8,
    pub pack: Repository,
}
