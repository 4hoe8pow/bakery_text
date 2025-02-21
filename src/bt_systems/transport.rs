use bevy::prelude::*;

use crate::{
    bt_components::bakery_terminal::{BakeryTerminal, Repository},
    bt_events::transportation::Transportation,
};

pub fn transport(
    mut query: Query<(&mut BakeryTerminal, &mut Repository)>,
    mut events: EventReader<Transportation>,
) {
    events.read().for_each(|ev| {
        eprintln!("Transportation event: {:?}", ev.pack);
        query.iter_mut().for_each(|(terminal, mut repo)| {
            if ev.to_term_id == terminal.id {
                *repo += ev.pack.clone();
            } else if ev.from_term_id == terminal.id {
                *repo -= ev.pack.clone();
            }
        });
    });
}
