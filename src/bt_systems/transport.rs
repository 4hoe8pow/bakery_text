use bevy::prelude::*;

use crate::{
    bt_components::bakery_terminal::{BakeryTerminal, Repository},
    bt_events::transportation::Transportation,
};

pub fn transport(
    mut query: Query<(&mut BakeryTerminal, Option<&mut Repository>)>,
    mut events: EventReader<Transportation>,
) {
    events.read().for_each(|ev| {
        query.iter_mut().for_each(|(terminal, repo)| {
            if ev.to_term_id == terminal.id {
                if let Some(mut repo) = repo {
                    // RepositoryがNoneでない場合の処理
                    *repo += ev.pack.clone();
                }
            }
        });
    });
}
