use bevy::prelude::*;

use crate::{
    bt_components::bakery_terminal::{BakeryTerminal, Gauge},
    PausedState,
};

pub fn progress_gauge(
    time: Res<Time>,
    mut q: Query<(&mut Gauge, &mut BakeryTerminal)>,
    mut next_state: ResMut<NextState<PausedState>>,
) {
    for (mut gauge, mut terminal) in q.iter_mut() {
        gauge.timer.tick(time.delta());

        if gauge.timer.just_finished() && gauge.progress > 0 {
            gauge.progress -= 1;

            next_state.set(PausedState::Freeze);
            terminal.add_input("||| ");
            if gauge.progress <= 0 {
                terminal.add_input("\nCompleted.");
                let _ = terminal.submit_input();
                next_state.set(PausedState::Running);
            }
        }
    }
}
