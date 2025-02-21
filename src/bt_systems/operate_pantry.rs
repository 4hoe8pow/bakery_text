use bevy::prelude::*;

use super::operate_general_term::GeneralCommand;
use crate::{
    bt_components::{
        bakery_terminal::{BakeryTerminal, OperatorMode, Repository},
        sections::Pantry,
    },
    bt_events::emitation::Emitation,
};

pub fn operate_pantry(
    mut query: Query<(&mut BakeryTerminal, &OperatorMode, &Repository), With<Pantry>>,
    mut events: EventReader<Emitation>,
) {
    if let Ok((mut terminal, mode, repository)) = query.get_single_mut() {
        if let OperatorMode::Commander = mode {
            for ev in events.read() {
                let (command, opt1, opt2) = ev.split_command();
                handle_general_in_pn(command, &mut terminal, repository);
            }
        }
        // ...existing code...
    }
}

fn handle_general_in_pn(input: &str, terminal: &mut BakeryTerminal, repository: &Repository) {
    if let Ok(cmd) = input.parse::<GeneralCommand>() {
        match cmd {
            GeneralCommand::Help => exec_help_pn(terminal),
            GeneralCommand::Ls => exec_ls_pn(terminal, repository),
            GeneralCommand::Mv => exec_mv_pn(terminal),
            GeneralCommand::Shoo => exec_shoo_pn(terminal),
        }
        let _ = terminal.submit_input();
    }
}

fn exec_help_pn(terminal: &mut BakeryTerminal) {
    terminal.add_input("Help command executed in Pantry");
}

fn exec_ls_pn(terminal: &mut BakeryTerminal, repository: &Repository) {
    terminal.add_input(&format!("Repository contents:\n{}", repository));
}

fn exec_mv_pn(terminal: &mut BakeryTerminal) {
    terminal.add_input("Mv command executed in Pantry");
}

fn exec_shoo_pn(terminal: &mut BakeryTerminal) {
    terminal.add_input("Shoo command executed in Pantry");
}
