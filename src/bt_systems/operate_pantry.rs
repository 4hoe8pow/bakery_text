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
    if let Ok((mut terminal, OperatorMode::Commander, repository)) = query.get_single_mut() {
        for ev in events.read() {
            let (command, opt1, opt2) = ev.split_command();
            handle_general_in_pn(command, &mut terminal, repository, opt1, opt2);
        }
    }
}

fn handle_general_in_pn(
    input: &str,
    terminal: &mut BakeryTerminal,
    repository: &Repository,
    opt1: Option<&str>,
    opt2: Option<&str>,
) {
    if let Ok(cmd) = input.parse::<GeneralCommand>() {
        match cmd {
            GeneralCommand::Help => exec_help_pn(terminal),
            GeneralCommand::Ls => exec_ls_pn(terminal, repository),
            GeneralCommand::Mv => exec_mv_pn(terminal, opt1, opt2),
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

fn exec_mv_pn(terminal: &mut BakeryTerminal, opt1: Option<&str>, opt2: Option<&str>) {
    if opt1.is_none() || opt2.is_none() {
        terminal.add_input("Usage: mv <source> <destination>");
        return;
    }
    terminal.add_input(&format!(
        "Mv command executed in Pantry with {} and {}",
        opt1.unwrap(),
        opt2.unwrap()
    ));
}

fn exec_shoo_pn(terminal: &mut BakeryTerminal) {
    terminal.add_input("Shoo command executed in Pantry");
}
