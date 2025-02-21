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
        query.iter_mut().for_each(|(mut terminal, mut repo)| {
            if ev.to_term_id == terminal.id {
                *repo += ev.pack.clone();
                terminal.add_input("It seems the package will arrive soon");
                let _ = terminal.submit_input();
            } else if ev.from_term_id == terminal.id {
                *repo -= ev.pack.clone();
            }
        });
    });
}
